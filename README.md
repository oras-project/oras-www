# oras-www

Source for ORAS website

Link: [oras.land](https://oras.land/)

## Deployment

This site is deployed using [Netlify](https://www.netlify.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/db61db6e-a953-4b02-b5fb-7f04f018b9d8/deploy-status)](https://app.netlify.com/sites/oras-project/deploys)

## Development

System requirements:

- Python 3.9+
- [Poetry](https://python-poetry.org/)

The website is an [Mkdocs](https://www.mkdocs.org/)-based documentation site, using the [Material theme](https://squidfunk.github.io/mkdocs-material/).

First install dependencies:

```
poetry install
```

Then run the development server:

```
poetry run mkdocs serve
```

The site will be available at [http://localhost:8000/](http://localhost:8000/)

