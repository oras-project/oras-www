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
curl -LO https://github.com/oras-project/oras/releases/download/v0.14.1/oras_0.14.1_linux_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.14.1_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.14.1_*.tar.gz oras-install/
```

### macOS

```bash
curl -LO https://github.com/oras-project/oras/releases/download/v0.14.1/oras_0.14.1_darwin_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.14.1_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.14.1_*.tar.gz oras-install/
```

### Windows

Add `%USERPROFILE%\bin\` to your `PATH` environment variable so that `oras.exe` can be found.

```shell
curl.exe -sLO  https://github.com/oras-project/oras/releases/download/v0.14.1/oras_0.14.1_windows_amd64.zip
tar.exe -xvzf oras_0.14.1_windows_amd64.zip
mkdir -p %USERPROFILE%\bin\
copy oras.exe %USERPROFILE%\bin\
set PATH=%USERPROFILE%\bin\;%PATH%
```

## Docker Image

A public Docker image containing the CLI is available on [GitHub Container Registry](https://github.com/orgs/oras-project/packages/container/package/oras):

```
docker run -it --rm -v $(pwd):/workspace ghcr.io/oras-project/oras:v0.14.1 help
```

> Note: the default WORKDIR  in the image is `/workspace`.

## Verify

```shell
$ oras version
Version:        0.14.1
Go version:     go1.19
Git commit:     a27b2d2ba151a39e29a227256ce1e2432d1e60f5
Git tree state: clean
```