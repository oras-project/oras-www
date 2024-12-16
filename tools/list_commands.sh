#!/usr/bin/env bash

COMMAND="${1?First argument is command}"

STATE='Usage'
oras help ${COMMAND} | grep -v '^  completion'| while read LINE
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
