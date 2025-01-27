#!/usr/bin/env bash

VERSION="${1?First argument is version to install}"
TEMPDIR="${2?Second argument is temporary directory}"

OS="$(uname -s | tr A-Z a-z)"
ARCH=$(test "$(uname -m)" = 'x86_64' && echo 'amd64' || echo 'arm64')

cd ${TEMPDIR}
OUTPUT_FILE="${TEMPDIR}/oras.tgz"
curl -s -o ${OUTPUT_FILE} -LO "https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_${OS}_${ARCH}.tar.gz" >&2
tar -zxf ${OUTPUT_FILE} oras >&2
rm -f ${OUTPUT_FILE}
