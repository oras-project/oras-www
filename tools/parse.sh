#!/usr/bin/env bash

COMMAND="${1?First argument is command to run}"
WEIGHT="${2?Second argument is weight}"

TEMPDIR=$(mktemp -d)
trap 'rm -rf "$TEMPDIR"' EXIT

echo '---'
echo "title: oras ${COMMAND}"
echo "sidebar_position: ${WEIGHT}"
echo 'warning: Do NOT modify this generated file'
echo '---'
echo
echo "# oras ${COMMAND}"
echo

#
# Run help command to temp file to avoid IFS issue
#
TEMPFILE="${TEMPDIR}/help"
EXAMPLES_FILE="${TEMPDIR}/examples"
trap 'rm -f "$TEMPFILE" "$EXAMPLES_FILE"' EXIT
oras help ${COMMAND} >${TEMPFILE}

IFS=''
STATE=Introduction
>${EXAMPLES_FILE}
cat ${TEMPFILE} | while read -r LINE
do
    [[ "${LINE}" == "" ]] && continue
    if [[ "${LINE}" == Aliases* ]]
    then
        STATE=Alias
        continue
    fi
    if [[ "${LINE}" == Example* ]]
    then
        if [ "${STATE}" == "Examples" ]
        then
            echo '```' >>${EXAMPLES_FILE}
        fi
        STATE=Examples
        echo >>${EXAMPLES_FILE}
        echo "${LINE}" | sed -e 's/Example - //' >>${EXAMPLES_FILE}
        echo >>${EXAMPLES_FILE}
        echo '```bash' >>${EXAMPLES_FILE}
        continue
    fi
    if [[ "${LINE}" == Usage* ]]
    then
        STATE=Usage
        continue
    fi
    if [[ "${LINE}" == Flags* ]]
    then
        if [ -s $EXAMPLES_FILE ]
        then
            echo '```' >>${EXAMPLES_FILE}
            echo >>${EXAMPLES_FILE}
            echo '## Examples'
            cat $EXAMPLES_FILE
            >$EXAMPLES_FILE
        fi
        echo '## Options'
        echo
        echo '```'
        STATE=Flags
        continue
    fi
    case "${STATE}" in
        Introduction)
            echo "${LINE}"
            ;;
        Alias)
            ;;
        Examples)
            echo "${LINE}" | sed -e 's/^[[:space:]]*//' >>${EXAMPLES_FILE}
            ;;
        Usage)
            echo
            echo '```bash'
            echo "${LINE}" | sed -e 's/^[[:space:]]*//'
            echo '```'
            echo
            ;;
        Flags)
            echo "${LINE}"
            ;;
   esac
done
echo '```'
