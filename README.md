[![Netlify Status](https://api.netlify.com/api/v1/badges/db61db6e-a953-4b02-b5fb-7f04f018b9d8/deploy-status)](https://app.netlify.com/sites/oras-project/deploys)

# ORAS Documentation

Source for ORAS website and documentation

<p align="left">
<a href="https://oras.land/"><img src="https://oras.land/img/oras.svg" alt="banner" width="100px"></a>
</p>

[This website](https://oras.land/) is built using [Docusaurus 2](https://v2.docusaurus.io/). Pages and components are built in JavaScript, and styles are written in vanilla CSS.

<div align="center">
  <a href="https://oras.land/">
    <img src=".github/preview.png" width="400" />
  </a>
</div>
<div align="center">
  <a href="https://oras.land/">
    oras.land
  </a>
</div>

## System Requirements

* [Node.js v16.x](https://nodejs.org/en/download/) and above

## Installation

```script
npm install
```

## Downloading Content

```script
$ blob_ref=ghcr.io/oras-project/oras@sha256:74529e03eae02d1fff5c05e9a6ec2089e1f5ae96421169c29a7c165346e042e4
$ size=$(oras blob fetch --descriptor $blob_ref | jq -r .size)
$ oras blob fetch $blob_ref --output - | pv -s $size > layer.bin
```

By using jq and pv, one can show the content downloading progress when using ORAS. This demonstrates how to fetch a blob with a specific reference, determine its size using jq, and use pv to display the progress while redirecting the output to a file named layer.bin.

## Local development

```script
npm run start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.
The site will be available at http://localhost:3000/

## Build for production

```script
npm run build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service. For that purpose, you can also
use:

```script
npm run serve
```

## Code of Conduct

This project has adopted the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md). See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for further details.

