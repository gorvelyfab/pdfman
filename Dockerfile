FROM ghcr.io/puppeteer/puppeteer:22.0.0
COPY --chown=pptruser:pptruser . /app
WORKDIR /app
RUN chown -R pptruser:pptruser /app
RUN npm install
RUN mkdir tmp
CMD node index.js
