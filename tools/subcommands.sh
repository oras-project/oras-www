#!/usr/bin/env bash

COMMAND="${1?First argument is command}"
DESTINATION="${2?Second argument is destination directory}"

TEMPDIR=$(mktemp -d)
trap 'rm -rf "$TEMPDIR"' EXIT
WEIGHT_FILE="${3}"
if [ "${WEIGHT_FILE}" == "" ]
then
    WEIGHT_FILE="${3:-${TEMPDIR}/weight}"
    echo 10 >${WEIGHT_FILE}
fi

./tools/list_commands.sh  "${COMMAND}" "${DESTINATION}" >"${TEMPDIR}/subcommands"
if [ ! -s "${TEMPDIR}/subcommands" ]
then
    WEIGHT=$(cat $WEIGHT_FILE)
    FILE="${DESTINATION}/oras_$(echo ${COMMAND} | sed -e 's/ /_/g').mdx"
    ./tools/parse.sh "${COMMAND}" "$WEIGHT" >"${FILE}"
    if git diff "${FILE}" >/dev/null
    then
        echo '** Command generator made updates **'
    fi
    echo $(expr $WEIGHT + 10) >${WEIGHT_FILE}
    exit 0
fi
while read SUBCOMMAND
do
    ./tools/subcommands.sh "$(echo ${COMMAND} ${SUBCOMMAND})" "${DESTINATION}" "${WEIGHT_FILE}"
done <"${TEMPDIR}/subcommands"
