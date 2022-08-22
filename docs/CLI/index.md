# Installation

This guide demonstrates the installation steps of ORAS CLI on different platforms.

## Homebrew

Install `oras` using [Homebrew](https://brew.sh/):

```bash
brew install oras
```

## Release artifacts

Install from the latest [release artifacts](https://github.com/oras-project/oras/releases):

### Linux

```bash
curl -LO https://github.com/oras-project/oras/releases/download/v0.13.0/oras_0.13.0_linux_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.13.0_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.13.0_*.tar.gz oras-install/
```

### macOS

```bash
curl -LO https://github.com/oras-project/oras/releases/download/v0.13.0/oras_0.13.0_darwin_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.13.0_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.13.0_*.tar.gz oras-install/
```

### Windows

Add `%USERPROFILE%\bin\` to your `PATH` environment variable so that `oras.exe` can be found.

```shell
<<<<<<< HEAD
curl.exe -sLO  https://github.com/oras-project/oras/releases/download/v0.13.0/oras_0.13.0_windows_amd64.tar.gz
tar.exe -xvzf oras_0.13.0_windows_amd64.tar.gz
=======
curl.exe -sLO  https://github.com/oras-project/oras/releases/download/v0.13.0/oras_0.13.0_windows_amd64.zip
tar.exe -xvzf oras_0.13.0_windows_amd64.zip
>>>>>>> 08874952115f66cd92cc7368f401b621bec58fbd
mkdir -p %USERPROFILE%\bin\
copy oras.exe %USERPROFILE%\bin\
set PATH=%USERPROFILE%\bin\;%PATH%
```

## Docker Image

A public Docker image containing the CLI is available on [GitHub Container Registry](https://github.com/orgs/oras-project/packages/container/package/oras):

<<<<<<< HEAD
```bash
=======
```
>>>>>>> 08874952115f66cd92cc7368f401b621bec58fbd
docker run -it --rm -v $(pwd):/workspace ghcr.io/oras-project/oras:v0.13.0 help
```

> Note: the default WORKDIR  in the image is `/workspace`.

## Verify

```shell
$ oras version
Version:        0.13.0
Go version:     go1.18.1
Git commit:     bb75f50fb5c21a59beb09ce1b632291182046632
Git tree state: clean
```