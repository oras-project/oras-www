#!/usr/bin/env bash

set -euo pipefail

VERSION="${1?First argument is version to install}"
TEMPDIR="${2?Second argument is temporary directory}"

case "$(uname -s)" in
    Darwin) OS="darwin" ;;
    FreeBSD) OS="freebsd" ;;
    Linux) OS="linux" ;;
    *)
        echo "Unsupported operating system: $(uname -s)" >&2
        exit 1
        ;;
esac

MACHINE="$(uname -m)"
case "${MACHINE}" in
    amd64 | x86_64) ARCH="amd64" ;;
    aarch64 | arm64) ARCH="arm64" ;;
    armv7 | armv7l) ARCH="armv7" ;;
    loong64 | loongarch64) ARCH="loong64" ;;
    ppc64le | riscv64 | s390x) ARCH="${MACHINE}" ;;
    *)
        echo "Unsupported architecture: ${MACHINE}" >&2
        exit 1
        ;;
esac

cd "${TEMPDIR}"
OUTPUT_FILE="${TEMPDIR}/oras.tgz"
trap 'rm -f "${OUTPUT_FILE}"' EXIT
curl --fail --silent --show-error --location --output "${OUTPUT_FILE}" "https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_${OS}_${ARCH}.tar.gz" >&2
tar -zxf "${OUTPUT_FILE}" oras >&2
