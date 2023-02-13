
<img src="https://github.com/oras-project/oras-www/raw/main/docs/assets/images/oras.png" alt="FLINT UI logo" height ="auto" width="200" />
<br />

<h1>ORAS Documentation</h1>
 
An ORAS UI is written in Hugo Framework, to provide an awesome user interface for configuring simulations.


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

You can install python following the download's [instructions](https://www.python.org/downloads/).


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

## Contributing

### Commit Convention
Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

<br>

### Branch-name Convention
<br>
We follow the convention `[type/scope]`. For example `fix/lint-error` or `docs/component-api`. `type` can be either `docs`, `fix`, `feat`, `build`, or any other conventional commit type. `scope` is just a short id that describes the scope of work.

Source for ORAS website and documentation

### Development notes

For the developer environment setup, project structure, best practices etc. you can go through the following link.
<br>
Link: [oras.land](https://oras.land/)
<br>
Documentation : [Link](/docs/index.md).

<br>

## Deployment

This site is deployed using [Netlify](https://www.netlify.com/)


## Contributors

Thanks go to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<img src="https://github.com/oras-project/oras-www/raw/main/docs/assets/images/oras.png" width="100px;" />

<br>

## Code of Conduct

This project has adopted the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md). See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for further details.

