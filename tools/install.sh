#!/usr/bin/env bash

VERSION="${1?First argument is version to install}"
TEMPDIR="${2?Second argument is temporary directory}"

OS="$(uname -s | tr A-Z a-z)"
ARCH=$(uname -m | sed -e 's/x86_64/amd64/g' -e 's/aarch64/arm64/g' -e 's/armv7l/armv7/g')

cd ${TEMPDIR}
OUTPUT_FILE="${TEMPDIR}/oras.tgz"
curl -s -o ${OUTPUT_FILE} -LO "https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_${OS}_${ARCH}.tar.gz" >&2
tar -zxf ${OUTPUT_FILE} oras >&2
rm -f ${OUTPUT_FILE}
