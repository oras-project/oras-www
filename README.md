
<img src="https://github.com/oras-project/oras-www/raw/main/docs/assets/images/oras.png" alt="Oras logo" height ="auto" width="200" />

[![Netlify Status](https://api.netlify.com/api/v1/badges/db61db6e-a953-4b02-b5fb-7f04f018b9d8/deploy-status)](https://app.netlify.com/sites/oras-project/deploys)

<br />

<h1>ORAS Documentation</h1>
 
This repository acts as a source for the ORAS website and documentation.
<br>
Link: [oras.land](https://oras.land/)
<br>
Documentation : [Link](/docs/index.md).



<br>

<h1>Table of Content</h1>
<a href="#about-the-project">About The Project</a> 

<a href="#getting-started">Getting Started</a> 

<a href="#installation">Installation</a>

<a href="#deployment">Deployment</a> 

<a href="#contributors">Contributors</a>  

<a href="#license">Code Of Conduct</a>


  
<br >

## About The Project
Registries are evolving as generic artifact stores. To enable this goal, the ORAS project provides a way to push and pull OCI Artifacts to and from OCI Registries.

Users seeking a generic registry client can benefit from the ORAS CLI, while developers can build their own clients on top of one of the ORAS client libraries.

<br>

## Getting Started
The website is an [Mkdocs](https://www.mkdocs.org/)-based documentation site, using the [Material theme](https://squidfunk.github.io/mkdocs-material/).

In order to use and work on this project you need to install python to run the app locally.

You can install python version 3.8 by following the download's [instructions](https://www.python.org/downloads/).


In order to check whether python is installed or not, open a terminal and type the following command:

```shell
python --version
```

### Installation
To set up this project locally follow the below procedure:

1. Clone [ORAS-WWW](https://github.com/oras-project/oras-www) repository:


2. Download the dependencies using following commands:
```shell
pip3 install -r requirements.txt
```
3. Run the following command to view the development server.
```
mkdocs serve
```

4. To view the UI please navigate to [http://localhost:8000/](http://localhost:8000/)


<br>

## Deployment

This site is deployed using [Netlify](https://www.netlify.com/)

<br>


## Contributors

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<a href="https://github.com/oras-project/oras-www/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=oras-project/oras-www" />
  
</a>



<br>

## Code of Conduct

This project has adopted the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).
 
See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for further details.

