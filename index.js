import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import express from 'express'
import report from 'puppeteer-report'
import puppeteer from 'puppeteer'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const PORT = process.env.PORT || 3000
const pdfReportOptions = {
  format: "A4",
  margin: {
    bottom: "10mm",
    left: "10mm",
    right: "10mm",
    top: "10mm",
  }
}

app.get('/', (req, res) => {
  res.json({ message: 'pdfman. running...' })
})

app.post('/pdf', async (req, res, next) => {
  const form = formidable({})
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  })

  await form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err)
    }

    if (files.html !== undefined && files.html[0]) {
      const prefix = uuidv4()
      const htmlPersistentFile = files.html[0]
      const file = path.resolve(`tmp/${prefix}.html`)
      const output = path.resolve(`tmp/${prefix}.pdf`)

      fs.rename(htmlPersistentFile.filepath, file, () => {
        console.log(`File at path ${output} was successfully uploaded.`)
      })

      await report.pdf(browser, file, {...pdfReportOptions, path: output});

      res.download(output)

      fs.rm(file, () => {})
      fs.rm(output, () => {})

      await browser.close()
    } else {
      res.status(500).json({ error: "An error occurred when handling your request" })
    }
  })
})

app.listen(PORT, () => {
  console.log(`pdfman listening on port ${PORT}`)
})
