#!/usr/bin/env bash

TEMPDIR=$(mktemp -d)
trap 'rm -rf "$TEMPDIR"' EXIT
ORAS_COMMAND=$(./tools/install.sh ${TEMPDIR})

list_commands() {
    STATE='Usage'
    IFS=''
    # WEIGHT=1
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

WEIGHT=10
list_commands | while read COMMAND
do
    RESULT=$(list_commands "${COMMAND}")
    if [ -z "${RESULT}" ]
    then
        ./tools/parse.sh ${TEMPDIR} "${COMMAND}" $WEIGHT >docs/commands/oras_$COMMAND.mdx
        WEIGHT=$(expr $WEIGHT + 10)
    else
        for SUBCOMMAND
        in ${RESULT}
        do
            ./tools/parse.sh ${TEMPDIR} "${COMMAND} ${SUBCOMMAND}" $WEIGHT >docs/commands/oras_${COMMAND}_${SUBCOMMAND}.mdx
            WEIGHT=$(expr $WEIGHT + 10)
        done
    fi
done
