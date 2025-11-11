# ORAS Documentation Update System

This document describes the automated system for updating ORAS versions in the documentation.

## Overview

The system consists of:

1. **Update Script** (`tools/update-versions.js`) - Fetches latest releases and updates versions
2. **Makefile Target** (`update-docs`) - Runs the update script and rebuilds docs if needed
3. **GitHub Action** (`.github/workflows/update-docs.yml`) - Schedules daily updates and creates PRs

## How It Works

### Scheduling
- Runs daily at 2 AM Pacific Time (10 AM UTC)
- Can also be triggered manually via GitHub Actions UI

### Version Update Logic

The script reads the `versions-map` file and updates versions according to these rules:

- **Preview entries** (ending in `-preview`): Updated to the latest prerelease version
- **Stable entries**: Updated to the latest stable release within the same major.minor version

For example:
- `1.1 1.1.0` → `1.1 1.1.1` (if v1.1.1 is available)
- `1.3.0-preview 1.3.0-rc.2` → `1.3.0-preview 1.3.0-rc.3` (if v1.3.0-rc.3 is available)

### Process Flow

1. **Check for updates**: Script fetches all releases from GitHub API
2. **Process versions**: Each entry in `versions-map` is checked for newer versions
3. **Update file**: If newer versions are found, `versions-map` is updated
4. **Rebuild docs**: If changes were made, `npm run build` is executed
5. **Create PR**: If there are changes, an automated PR is created

## Manual Usage

You can run the update process manually:

```bash
# Check for updates and rebuild if needed
make update-docs

# Just check for updates (without rebuilding)
node tools/update-versions.js
```

## Files

- `tools/update-versions.js` - Main update script
- `versions-map` - Version mapping file (display_name current_version)
- `.github/workflows/update-docs.yml` - GitHub Action workflow
- `Makefile` - Contains `update-docs` target

## Exit Codes

The update script uses these exit codes:
- `0` - Updates were made
- `1` - No updates needed
- `2` - Error occurred

The Makefile uses these codes to determine whether to rebuild the documentation.