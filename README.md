# oras-www

Source for ORAS website

## Deployment

This site is deployed using [Netlify](https://www.netlify.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/db61db6e-a953-4b02-b5fb-7f04f018b9d8/deploy-status)](https://app.netlify.com/sites/goofy-nobel-185f40/deploys)

## Development

System requirements:

- Python 3
- [Poetry](https://python-poetry.org/).

The website is an [Mkdocs]-based documentation site, using the [Material theme](https://github.com/squidfunk/mkdocs-material).

First install dependencies:

```
poetry install
```

Then run the development server:

```
poetry run mkdocs serve
```

The site will be available at [http://localhost:8000/](http://localhost:8000/).

