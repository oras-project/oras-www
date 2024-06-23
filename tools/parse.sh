#!/usr/bin/env bash

TEMPDIR="${1?First argument is temporary directory}"
COMMAND="${2?Second argument is command to run}"
WEIGHT="${3?Third argument is weight}"
ORAS="${TEMPDIR}/oras"

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
${ORAS} help ${COMMAND} >${TEMPFILE}

IFS=''
STATE=Introduction
EXAMPLES=""
PREFIX="Example - "
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
        echo "${LINE#"$PREFIX"}" >>${EXAMPLES_FILE}
        echo >>${EXAMPLES_FILE}
        echo '```bash' >>${EXAMPLES_FILE}
        continue
    fi
    if [[ "${LINE}" == Usage* ]]
    then
        if [ "${STATE}" == "Examples" ]
        then
            echo '```' >>${EXAMPLES_FILE}
            echo >>${EXAMPLES_FILE}
        fi
        STATE=Usage
        continue
    fi
    if [[ "${LINE}" == Flags* ]]
    then
        if [ -s $EXAMPLES_FILE ]
        then
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
            if [[ "${LINE}" == Flags* ]]
            then
                echo '## Options'
                echo
                echo '```'
                STATE=Flags
                continue
            fi
            echo "${LINE}"
            ;;
        Alias)
            if [[ "${LINE}" == Flags* ]]
            then
                echo '## Options'
                echo
                echo '```'
                STATE=Flags
                continue
            fi
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
