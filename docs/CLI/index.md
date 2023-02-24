# Installation

This guide demonstrates the installation steps of ORAS CLI on different platforms.

## Homebrew

Install `oras` using [Homebrew](https://brew.sh/):

```bash
brew install oras
```

> Note: Homebrew only has ORAS v0.16.0 available to be used so far. It will be updated when ORAS v1.0.0 is released in Mar 2023.

## Release artifacts

Install ORAS from the latest [release artifacts](https://github.com/oras-project/oras/releases):

### Linux

```bash
curl -LO https://github.com/oras-project/oras/releases/download/v1.0.0-rc.1/oras_1.0.0-rc.1_linux_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_1.0.0-rc.1_*.tar.gz -C oras-install/
sudo mv oras-install/oras /usr/local/bin/
rm -rf oras_1.0.0-rc.1_*.tar.gz oras-install/
```

> Note: If you want to install ORAS on an ARM64-based Linux machine, you can download it from `https://github.com/oras-project/oras/releases/download/v1.0.0-rc.1/oras_1.0.0-rc.1_linux_arm64.tar.gz`.

### macOS

If you want to install ORAS on an ARM64-based machine, run the following command:

```bash
curl -LO https://github.com/oras-project/oras/releases/download/v1.0.0-rc.1/oras_1.0.0-rc.1_darwin_arm64.tar.gz
mkdir -p oras-install/
tar -zxf oras_1.0.0-rc.1_*.tar.gz -C oras-install/
sudo mv oras-install/oras /usr/local/bin/
rm -rf oras_1.0.0-rc.1_*.tar.gz oras-install/
```

> Note: If you want to install ORAS on an ARM64-based machine, you can download it from `https://github.com/oras-project/oras/releases/download/v1.0.0-rc.1/oras_1.0.0-rc.1_darwin_amd64.tar.gz`.

### Windows

Add `%USERPROFILE%\bin\` to your `PATH` environment variable so that `oras.exe` can be found.

```shell
curl.exe -sLO  https://github.com/oras-project/oras/releases/download/v1.0.0-rc.1/oras_1.0.0-rc.1_windows_amd64.zip
tar.exe -xvzf oras_1.0.0-rc.1_windows_amd64.zip
mkdir -p %USERPROFILE%\bin\
copy oras.exe %USERPROFILE%\bin\
set PATH=%USERPROFILE%\bin\;%PATH%
```

## Docker Image

A public Docker image containing the CLI is available on [GitHub Container Registry](https://github.com/orgs/oras-project/packages/container/package/oras):

```
docker run -it --rm -v $(pwd):/workspace ghcr.io/oras-project/oras:v1.0.0-rc.1 help
```

> Note: the default WORKDIR in the image is `/workspace`.

## Verify

```shell
$ oras version
Version:        1.0.0-rc.1
Go version:     go1.19.5
Git commit:     a98931bc68a0e7a5de6c51df8e5aa09aadad3057
Git tree state: clean
```