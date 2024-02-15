# PDFMAN

PDFMAN is a Puppeteer-based and wrapper providing a web API as an alternative to wkhtmltopdf. It exposes a web API for generating a PDF file from an HTML document. PDFMAN is built on top of the [Puppeteer Report](https://github.com/PejmanNik/puppeteer-report) and is available as a Docker image on [Docker Hub](https://hub.docker.com/r/gorvelyfab/pdfman).

## How to Use

###  1. Using Docker Run

1. Make sure you have Docker installed on your machine.
2. Run the following command to start PDFMAN using Docker:
   ```bash
   docker run --rm -p 3000:3000 -v /path/to/css/file/style.css:/app/tmp gorvelyfab/pdfman
   ```
3. Access the PDFMAN API at `http://localhost:3000` to generate PDFs from HTML documents.

### 2. Using Docker Compose

```yaml
services:
  pdfman:
    image: gorvelyfab/pdfman
    ports:
      - 3000:3000
    volumes:
      ./style.css:/app/tmp/style.css
    environment:
      PORT: 3000
```

Generate your first pdf document by making a post request at `http://localhost:3000/pdf`. Make sur to Setup the request header Content-Type as multipart/form-data and the html file field name must be `html`

```bash
curl --request POST \
  --url http://localhost:3000/pdf \
  --header 'Content-Type: multipart/form-data \
  --form html=@/home/gorvely/Downloads/demo/test.html
```

#### Codes samples

```css
/* style.css */
body {
    color: red;
}
```

```html
<!-- file.html -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document Example</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello world</h1>

    <p>This paragraph showing text colored in RED.</p>
</body>
</html>
```
## Author
Gorvely Tasinda <gorvelyfab@gmail.com>

## Contribution

Feel free to contribute to PDFMAN by submitting issues or pull requests. For major changes, please open an issue first to discuss potential modifications.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
