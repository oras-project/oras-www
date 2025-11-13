#!/bin/bash
# Copyright The ORAS Authors.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

# Script to extract spelling errors from Vale and add them to accept.txt

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
VALE_CONFIG="${PROJECT_ROOT}/.vale.ini"
ACCEPT_FILE="${PROJECT_ROOT}/vale/config/vocabularies/oras/accept.txt"
TEMP_FILE="/tmp/vale-words-$$.txt"

# Default values
DRY_RUN=false
TARGETS="${PROJECT_ROOT}/versioned_docs ${PROJECT_ROOT}/community"

usage() {
    cat <<EOF
Usage: $(basename "$0") [OPTIONS] [TARGETS...]

Extract spelling errors from Vale output and add them to accept.txt.

OPTIONS:
    -d, --dry-run    Show what would be added without modifying accept.txt
    -h, --help       Show this help message
    -c, --config     Vale config file (default: .vale.ini)

TARGETS:
    Space-separated list of directories to check (default: versioned_docs community)

EXAMPLES:
    # Add all spelling errors to accept.txt
    $(basename "$0")

    # Preview what would be added (dry-run)
    $(basename "$0") --dry-run

    # Check specific directories
    $(basename "$0") docs blog

    # Dry-run with specific directories
    $(basename "$0") -d versioned_docs

WARNING:
    This script will add ALL spelling errors to accept.txt, including real typos.
    Always review the output and verify that the words should be accepted!
    You may want to run with --dry-run first.

EOF
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -c|--config)
            VALE_CONFIG="$2"
            shift 2
            ;;
        -*)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
        *)
            # First non-option argument starts the targets list
            TARGETS="$@"
            break
            ;;
    esac
done

# Cleanup on exit
cleanup() {
    rm -f "${TEMP_FILE}"
}
trap cleanup EXIT

echo "Extracting misspellings from Vale output..."
echo "Checking: ${TARGETS}"

# Run Vale and extract misspelled words
vale --config "${VALE_CONFIG}" ${TARGETS} 2>&1 | \
    grep "Did you really mean" | \
    sed "s/.*'\(.*\)'.*/\1/" | \
    sort -u > "${TEMP_FILE}"

# Check if any words were found
if [ ! -s "${TEMP_FILE}" ]; then
    echo "✓ No spelling errors found!"
    exit 0
fi

# Show what will be added
WORD_COUNT=$(wc -l < "${TEMP_FILE}" | tr -d ' ')
echo ""
echo "Found ${WORD_COUNT} unique word(s):"
echo "----------------------------------------"
cat "${TEMP_FILE}"
echo "----------------------------------------"

if [ "${DRY_RUN}" = true ]; then
    echo ""
    echo "DRY-RUN: The above words would be added to accept.txt"
    echo "Run without --dry-run to actually add them."
    exit 0
fi

# Add words to accept.txt
cat "${TEMP_FILE}" >> "${ACCEPT_FILE}"

# Sort and deduplicate accept.txt
sort -u "${ACCEPT_FILE}" -o "${ACCEPT_FILE}"

echo ""
echo "✓ Added ${WORD_COUNT} word(s) to accept.txt"
echo ""
echo "WARNING: Please review ${ACCEPT_FILE} to ensure no real typos were added!"
echo "Consider running 'git diff vale/config/vocabularies/oras/accept.txt' to review changes."
