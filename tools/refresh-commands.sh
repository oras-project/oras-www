#!/usr/bin/env bash

TEMPDIR=$(mktemp -d)
trap 'rm -rf "$TEMPDIR"' EXIT

#
# This script generates command documentation by downloading the oras command
# and parsing the help text to generate documentation. It iterates over the
# `versions.json` file to determine the releases that are currently supported.
#
# If there is a fix to the help documentation in a patch version, use the
# `versions-latest` file to specify the patch release for document generation.
#
# For example, If you are generating documentation for `1.2` and you want to
# use `1.2.2` to generate the documentation, put a line in the `versions-latest`
# file `1.2.2`.  If there is no line in the `versions-latest` that matches
# the major and minor release `1.2`, then `1.2.0` will be used to generate
# the documentation.
#
map_version() {
    grep "^$1" versions-latest || echo "$1.0"
}

VERSIONS=$(tr '[]",' ' ' <versions.json)
for VERSION
in ${VERSIONS}
do
    LATEST_VERSION=$(map_version $VERSION)
    ./tools/install.sh ${LATEST_VERSION} ${TEMPDIR}
    export PATH=${TEMPDIR}:${PATH}
    VERSIONED_DOCS=versioned_docs/version-${VERSION}/commands
    which oras
    oras help | ./tools/parse_main.sh >"${VERSIONED_DOCS}/use_oras_cli.mdx"
    ./tools/subcommands.sh "" "${VERSIONED_DOCS}"
done
