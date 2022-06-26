# Installation

This guide demonstrates the installation steps of ORAS CLI on different platforms.

## Homebrew

Install `oras` using [Homebrew](https://brew.sh/):

```
brew install oras
```

## GoFish

Install `oras` using [GoFish](https://gofi.sh/):

```
gofish install oras
```

## Release artifacts

Install from the latest [release artifacts](https://github.com/oras-project/oras/releases):

### Linux

```
curl -LO https://github.com/oras-project/oras/releases/download/v0.12.0/oras_0.12.0_linux_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.12.0_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.12.0_*.tar.gz oras-install/
```

### MacOS

```
curl -LO https://github.com/oras-project/oras/releases/download/v0.12.0/oras_0.12.0_darwin_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.12.0_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.12.0_*.tar.gz oras-install/
```

### Windows

Add `%USERPROFILE%\bin\` to your `PATH` environment variable so that `oras.exe` can be found.

```
curl.exe -sLO  https://github.com/oras-project/oras/releases/download/v0.12.0/oras_0.12.0_windows_amd64.tar.gz
tar.exe -xvzf oras_0.12.0_windows_amd64.tar.gz
mkdir -p %USERPROFILE%\bin\
copy oras.exe %USERPROFILE%\bin\
set PATH=%USERPROFILE%\bin\;%PATH%
```

## Docker Image

A public Docker image containing the CLI is available on [GitHub Container Registry](https://github.com/orgs/oras-project/packages/container/package/oras):

```
docker run -it --rm -v $(pwd):/workspace ghcr.io/oras-project/oras:v0.12.0 help
```

> Note: the default WORKDIR  in the image is `/workspace`.

## Verify 

```
oras version
Version:        0.12.0
Go version:     go1.16.3
Git commit:     1e6a64e1789f5145bf669b75bebfe013100f6253
```