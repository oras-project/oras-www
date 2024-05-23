#!/usr/bin/env bash

TEMPDIR="${1?First argument is temporary directory}"

VERSION="1.1.0"
OS="$(uname -s | tr A-Z a-z)"
ARCH=$(test "$(uname -m)" = 'x86_64' && echo 'amd64' || echo 'arm64')

cd ${TEMPDIR}
ORAS_COMMAND="${TEMPDIR}/oras"
OUTPUT_FILE="${TEMPDIR}/oras.tgz"
curl -o ${OUTPUT_FILE} -LO "https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_${OS}_${ARCH}.tar.gz" >&2
tar -zxf ${OUTPUT_FILE} oras >&2
"${ORAS_COMMAND}" version >&2
rm -f ${OUTPUT_FILE}
echo "${ORAS_COMMAND}"
