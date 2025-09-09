#!/usr/bin/env bash

#
# refresh-commands.sh
#
# Purpose:
#   Generate versioned ORAS CLI command documentation by downloading a specific
#   oras binary for each supported version and converting its `oras help` output
#   (and subcommands) into MDX docs.
#
# Overview:
#   - Reads supported versions from `versions.json` (e.g., ["1.2", "1.1", ...]).
#   - Resolves each short version to an exact release using `versions-map`.
#     For example, mapping `1.2` -> `1.2.2` ensures docs are built from the
#     latest patch.
#   - Installs the resolved oras binary into a temporary directory.
#   - Generates docs under `versioned_docs/version-<version>/commands` using
#     helper scripts: `tools/parse_main.sh` and `tools/subcommands.sh`.
#
# Inputs:
#   - versions.json   : Ordered list of supported versions (short semver forms).
#   - versions-map    : Space-delimited mappings of short -> exact versions.
#                       Example lines:
#                         1.2 1.2.2
#                         1.4-preview 1.4.0-beta.1
#
# Outputs:
#   - versioned_docs/version-<version>/commands/use_oras_cli.mdx
#   - Additional subcommand MDX files under the same directory.
#
# How to add a preview release:
#   - Add entries to `versions.json` and `versions-map` using the
#     major.minor form with a `-preview` suffix. For example:
#       • versions.json:    append "1.4-preview" to the list
#       • versions-map:     add "1.4-preview 1.4.0-beta.1"
#   - Create the `versioned_docs/version-1.4-preview` directory
#   - Create a `versioned_sidebars/version-1.4-preview-sidebars.json` file.
#   - Run `make build` to generate the documentation.
#
# Promotion to GA (general availability):
#   - In `versions.json`, remove `-preview` and move the version to the top.
#   - In `versions-map`, remove the `-preview` suffix.
#   - Move directories/files accordingly, for example:
#       • versioned_docs/version-1.4-preview -> versioned_docs/version-1.4
#       • versioned_sidebars/version-1.4-preview-sidebars.json
#         -> versioned_sidebars/version-1.4-sidebars.json
#
# Requirements:
#   - tools/install.sh       Installs a specific oras version into a target dir.
#   - tools/parse_main.sh    Converts "oras help" to MDX.
#   - tools/subcommands.sh   Generates per-subcommand MDX files.
#   - Network access to download oras releases.
#
# Notes:
#   - A secure temp directory is created via `mktemp -d` and cleaned on exit.
#   - PATH is temporarily extended to prefer the freshly installed oras binary.

TEMPDIR=$(mktemp -d)
trap 'rm -rf "$TEMPDIR"' EXIT

# Map a short version (e.g., 1.2 or 1.4-preview) to an exact release (e.g., 1.2.2 or 1.4.0-beta.1).
map_version() {
    if ! grep "^$1" versions-map >/dev/null; then
        echo "Version $1 missing from versions-map file" >&2
        exit 1
    fi
    grep "^$1" versions-map | cut -d ' ' -f 2
}

# Extract versions from versions.json by stripping JSON punctuation.
VERSIONS=$(tr '[]",' ' ' <versions.json)

# Iterate over each declared version and (re)generate docs.
for VERSION in ${VERSIONS}; do
    LATEST_VERSION=$(map_version "$VERSION")
    ./tools/install.sh "${LATEST_VERSION}" "${TEMPDIR}"
    export PATH="${TEMPDIR}:${PATH}"

    VERSIONED_DOCS="versioned_docs/version-${VERSION}/commands"

    # Main CLI doc (root help)
    oras help | ./tools/parse_main.sh >"${VERSIONED_DOCS}/use_oras_cli.mdx"

    # Per-subcommand docs
    ./tools/subcommands.sh "" "${VERSIONED_DOCS}"
done
