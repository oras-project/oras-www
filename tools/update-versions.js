#!/usr/bin/env node

/**
 * Script to update the versions-map file with latest ORAS releases.
 * 
 * Logic:
 * - For entries ending with "-preview": update with latest prerelease
 * - For other entries: update with latest stable release for the same major.minor
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_API_BASE = 'https://api.github.com';
const ORAS_REPO = 'oras-project/oras';
const VERSIONS_MAP_FILE = 'versions-map';

/**
 * Fetch releases from GitHub API with pagination
 */
async function fetchAllReleases() {
    const releases = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const url = `${GITHUB_API_BASE}/repos/${ORAS_REPO}/releases?page=${page}&per_page=${perPage}`;
        console.log(`Fetching releases page ${page}...`);
        
        try {
            const pageReleases = await fetchUrl(url);
            if (pageReleases.length === 0) {
                break;
            }
            releases.push(...pageReleases);
            page++;
            
            // Add a small delay to be respectful to the API
            if (pageReleases.length === perPage) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        } catch (error) {
            console.error(`Error fetching releases page ${page}: ${error.message}`);
            throw error;
        }
    }

    console.log(`Found ${releases.length} total releases`);
    return releases;
}

/**
 * Fetch URL and return JSON
 */
function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, {
            headers: {
                'User-Agent': 'oras-www-update-script',
                'Accept': 'application/vnd.github.v3+json'
            }
        }, (response) => {
            let data = '';
            
            response.on('data', chunk => {
                data += chunk;
            });
            
            response.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        });
        
        request.on('error', (error) => {
            reject(error);
        });
        
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

/**
 * Parse semantic version string
 */
function parseVersion(versionStr) {
    // Remove 'v' prefix if present
    const cleanVersion = versionStr.startsWith('v') ? versionStr.slice(1) : versionStr;
    
    // Match semantic version pattern
    const match = cleanVersion.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
    if (!match) {
        return null;
    }
    
    return {
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
        patch: parseInt(match[3]),
        prerelease: match[4] || null,
        original: versionStr
    };
}

/**
 * Check if version is a prerelease
 */
function isPrerelease(version) {
    return version.prerelease !== null;
}

/**
 * Check if version1 is newer than version2
 */
function isNewerVersion(v1, v2) {
    if (v1.major !== v2.major) return v1.major > v2.major;
    if (v1.minor !== v2.minor) return v1.minor > v2.minor;
    if (v1.patch !== v2.patch) return v1.patch > v2.patch;
    
    // Handle prerelease comparison
    if (v1.prerelease && v2.prerelease) {
        return v1.prerelease > v2.prerelease;
    }
    if (v1.prerelease && !v2.prerelease) return false;
    if (!v1.prerelease && v2.prerelease) return true;
    
    return false;
}

/**
 * Find the latest version for a given major.minor combination
 */
function findLatestVersion(releases, targetMajor, targetMinor, includePrerelease = false) {
    let latest = null;
    
    for (const release of releases) {
        const version = parseVersion(release.tag_name);
        if (!version) continue;
        
        // Check if this version matches the target major.minor
        if (version.major === targetMajor && version.minor === targetMinor) {
            // Skip prereleases if not requested
            if (!includePrerelease && isPrerelease(version)) {
                continue;
            }
            
            if (!latest || isNewerVersion(version, latest)) {
                latest = version;
            }
        }
    }
    
    return latest;
}

/**
 * Find the latest prerelease version overall
 */
function findLatestPrerelease(releases) {
    let latest = null;
    
    for (const release of releases) {
        if (!release.prerelease) continue;
        
        const version = parseVersion(release.tag_name);
        if (!version || !isPrerelease(version)) continue;
        
        if (!latest || isNewerVersion(version, latest)) {
            latest = version;
        }
    }
    
    return latest;
}

/**
 * Read and parse the versions-map file
 */
function readVersionsMap() {
    try {
        const content = fs.readFileSync(VERSIONS_MAP_FILE, 'utf8');
        const lines = content.trim().split('\n').filter(line => line.trim());
        
        return lines.map(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length !== 2) {
                throw new Error(`Invalid line in versions-map: ${line}`);
            }
            return {
                displayName: parts[0],
                currentVersion: parts[1],
                line: line
            };
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`versions-map file not found: ${VERSIONS_MAP_FILE}`);
        }
        throw error;
    }
}

/**
 * Write the updated versions-map file
 */
function writeVersionsMap(entries) {
    const content = entries.map(entry => {
        const version = entry.currentVersion.startsWith('v') ? entry.currentVersion.slice(1) : entry.currentVersion;
        return `${entry.displayName} ${version}`;
    }).join('\n') + '\n';
    fs.writeFileSync(VERSIONS_MAP_FILE, content, 'utf8');
}

/**
 * Main update function
 */
async function updateVersions() {
    console.log('Starting version update process...');
    
    // Read current versions-map
    const versionEntries = readVersionsMap();
    console.log(`Found ${versionEntries.length} entries in versions-map`);
    
    // Fetch all releases
    const releases = await fetchAllReleases();
    
    let hasChanges = false;
    
    // Process each entry
    for (const entry of versionEntries) {
        console.log(`Processing ${entry.displayName} (current: ${entry.currentVersion})`);
        
        const currentVersion = parseVersion(entry.currentVersion);
        if (!currentVersion) {
            console.warn(`Skipping invalid version: ${entry.currentVersion}`);
            continue;
        }
        
        let newVersion = null;
        
        if (entry.displayName.endsWith('-preview')) {
            // For preview entries, use latest prerelease
            newVersion = findLatestPrerelease(releases);
            console.log(`  Looking for latest prerelease...`);
        } else {
            // For stable entries, use latest stable for same major.minor
            newVersion = findLatestVersion(releases, currentVersion.major, currentVersion.minor, false);
            console.log(`  Looking for latest stable ${currentVersion.major}.${currentVersion.minor}.x...`);
        }
        
        if (newVersion && newVersion.original !== entry.currentVersion) {
            console.log(`  ✓ Update available: ${entry.currentVersion} → ${newVersion.original}`);
            entry.currentVersion = newVersion.original;
            hasChanges = true;
        } else {
            console.log(`  ✓ Already up to date`);
        }
    }
    
    if (hasChanges) {
        console.log('\nUpdating versions-map file...');
        writeVersionsMap(versionEntries);
        console.log('✓ versions-map updated successfully');
        return true;
    } else {
        console.log('\n✓ No updates needed');
        return false;
    }
}

/**
 * Main execution
 */
async function main() {
    try {
        const changed = await updateVersions();
        process.exit(changed ? 0 : 1); // Exit code 0 if changes, 1 if no changes
    } catch (error) {
        console.error('Error:', error.message);
        if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
            console.error('Network error: Please check your internet connection');
        }
        process.exit(2); // Exit code 2 for errors
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { updateVersions, parseVersion, isNewerVersion };