#!/usr/bin/env bash

TEMPDIR=$(mktemp -d)
trap 'rm -rf "$TEMPDIR"' EXIT

#
# This script generates command documentation by downloading the oras command
# and parsing the help text to generate documentation. It iterates over the
# `versions.json` file to determine the releases that are currently supported.
#
# There should always be an entry in the `versions-map` file to to map the
# version from the `versions.json` file with the actual latest release to use.
# For example, If you are generating documentation for `1.2` and you want to
# use `1.2.2` to generate the documentation, put a line in the `versions-map`
# file `1.2 1.2.2`.
#
map_version() {
    if ! grep "^$1" versions-map >/dev/null
    then
        echo "Version $1 missing from versions-map file" >&2
        exit 1
    fi
    grep "^$1" versions-map | cut -d ' ' -f 2
}

VERSIONS=$(tr '[]",' ' ' <versions.json)
for VERSION
in ${VERSIONS}
do
    LATEST_VERSION=$(map_version $VERSION)
    ./tools/install.sh ${LATEST_VERSION} ${TEMPDIR}
    export PATH=${TEMPDIR}:${PATH}
    VERSIONED_DOCS=versioned_docs/version-${VERSION}/commands
    oras help | ./tools/parse_main.sh >"${VERSIONED_DOCS}/use_oras_cli.mdx"
    ./tools/subcommands.sh "" "${VERSIONED_DOCS}"
done
