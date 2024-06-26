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

list_commands() {
    STATE='Usage'
    IFS=''
    ${ORAS_COMMAND} help ${1} | grep -v '^  completion'| while read LINE
    do
        [[ "${LINE}" == "" ]] && continue

        case "${STATE}" in
        Usage)
            if [[ "${LINE}" == Available* ]]
            then
                STATE='Commands'
                continue
            fi
            ;;
        Commands)
            if [[ "${LINE}" == Flags* ]]
            then
                STATE='Flags'
                continue
            fi
            COMMAND=$(echo "${LINE}" | sed -e 's/^[[:space:]]*//' | sed -e 's/[[:space:]].*//')
            echo ${COMMAND}
            ;;
        Flags)
            ;;
        esac
    done
}

DIFFS=false
VERSIONS=$(tr '[]",' ' ' <versions.json)
for VERSION
in ${VERSIONS}
do
    LATEST_VERSION=$(map_version $VERSION)
    ORAS_COMMAND=$(./tools/install.sh ${LATEST_VERSION} ${TEMPDIR})
    WEIGHT=10
    VERSIONED_DOCS=versioned_docs/version-${VERSION}/commands
    list_commands >"${TEMPDIR}/commands"
    while read COMMAND
    do
        list_commands "${COMMAND}" >"${TEMPDIR}/subcommands"
        if [ ! -s "${TEMPDIR}/subcommands" ]
        then
            FILE="${VERSIONED_DOCS}/oras_${COMMAND}.mdx"
            ./tools/parse.sh ${TEMPDIR} "${COMMAND}" $WEIGHT >"${FILE}"
            if git diff "${FILE}" >/dev/null
            then
                DIFFS=true
            fi
            WEIGHT=$(expr $WEIGHT + 10)
        else
            while read SUBCOMMAND
            do
                FILE="${VERSIONED_DOCS}/oras_${COMMAND}_${SUBCOMMAND}.mdx"
                ./tools/parse.sh ${TEMPDIR} "${COMMAND} ${SUBCOMMAND}" $WEIGHT >"${FILE}"
                if git diff "${FILE}" >/dev/null
                then
                    DIFFS=true
                fi
                WEIGHT=$(expr $WEIGHT + 10)
            done <"${TEMPDIR}/subcommands"
        fi
    done <"${TEMPDIR}/commands"
done
if $DIFFS
then
    echo
    echo '** Command generator made updates **'
    echo
fi
