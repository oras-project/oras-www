
<img src="https://github.com/oras-project/oras-www/raw/main/docs/assets/images/oras.png" alt="Oras logo" height ="auto" width="200" />
<br />

<h1>ORAS Documentation</h1>
 
An ORAS is the web site and documentation for the ORAS project.
<br>
Link: [oras.land](https://oras.land/)
<br>
Documentation : [Link](/docs/index.md).



<br>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#developer-notes">Developer notes</a>
    </li>
    <li><a href="#how-to-get-involved">How to Get Involved?</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">Code Of Conduct</a></li>
  </ol>
</details>
<br >

## About The Project
Registries are evolving as generic artifact stores. To enable this goal, the ORAS project provides a way to push and pull OCI Artifacts to and from OCI Registries.

Users seeking a generic registry client can benefit from the ORAS CLI, while developers can build their own clients on top of one of the ORAS client libraries.

<br>

## Getting started
In order to use and work on this project you need to install python to run the app locally.

You can install python version 3.8 by following the download's [instructions](https://www.python.org/downloads/).


In order to check whether python installed or not, open a terminal and types:

```shell
python --version
```

### Installation
To set up this project locally follow the below procedure:

1. Clone [ORAS-WWW](https://github.com/oras-project/oras-www) repository:


2. Download the dependencies using following commands
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


## Contributors

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<img src="https://github.com/oras-project/oras-www/raw/main/docs/assets/images/oras.png" width="100px;" />

<br>

## Code of Conduct

This project has adopted the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md). See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for further details.

