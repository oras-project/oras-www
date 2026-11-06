/**
 * @jest-environment node
 *
 * Copyright The ORAS Authors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { spawnSync } from 'node:child_process';
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const toolsDirectory = path.resolve(__dirname, '..');
const temporaryDirectories = [];
const originalPage = 'original page\n';

function writeExecutable(filename, contents) {
  writeFileSync(filename, contents);
  chmodSync(filename, 0o755);
}

function commandsDirectory(root, version) {
  return path.join(root, 'versioned_docs', `version-${version}`, 'commands');
}

function runRefresh({
  versions = ['1.3', '1.2'],
  versionsMap = '1.2 1.2.2\n1.3 1.3.5\n',
  failingInstalls = [],
  brokenReleases = [],
}) {
  const root = mkdtempSync(path.join(tmpdir(), 'oras-www-refresh-'));
  temporaryDirectories.push(root);

  const binDirectory = path.join(root, 'bin');
  mkdirSync(binDirectory);
  mkdirSync(path.join(root, 'tools'));
  for (const script of [
    'list_commands.sh',
    'parse.sh',
    'parse_main.sh',
    'refresh-commands.sh',
    'subcommands.sh',
  ]) {
    copyFileSync(path.join(toolsDirectory, script), path.join(root, 'tools', script));
    chmodSync(path.join(root, 'tools', script), 0o755);
  }

  writeFileSync(path.join(root, 'versions.json'), JSON.stringify(versions));
  writeFileSync(path.join(root, 'versions-map'), versionsMap);
  for (const version of versions) {
    mkdirSync(commandsDirectory(root, version), { recursive: true });
    writeFileSync(path.join(commandsDirectory(root, version), 'use_oras_cli.mdx'), originalPage);
  }

  // Stands in for tools/install.sh: fakes a release download of the given version.
  writeExecutable(
    path.join(root, 'tools', 'install.sh'),
    `#!/usr/bin/env bash
printf '%s\\n' "$1" >> "$FAKE_INSTALL_LOG"
for failing in $FAKE_FAILING_INSTALLS; do
  [[ "$1" == "$failing" ]] && exit 1
done
for broken in $FAKE_BROKEN_RELEASES; do
  if [[ "$1" == "$broken" ]]; then
    printf '#!/usr/bin/env bash\\nexit 126\\n' > "$2/oras"
    chmod +x "$2/oras"
    exit 0
  fi
done
cat > "$2/oras" <<SCRIPT
#!/usr/bin/env bash
if [[ "\\$#" -eq 1 ]]; then
  printf 'ORAS $1 help\\n\\nAvailable Commands:\\n  version     Show version\\n\\nFlags:\\n  -h, --help  help\\n'
else
  printf 'Show version\\n\\nUsage:\\n  oras version\\n\\nFlags:\\n  -h, --help  help\\n'
fi
SCRIPT
chmod +x "$2/oras"
`
  );
  writeExecutable(path.join(binDirectory, 'git'), '#!/usr/bin/env bash\nexit 0\n');

  const installLog = path.join(root, 'install.log');
  writeFileSync(installLog, '');
  const result = spawnSync('bash', ['./tools/refresh-commands.sh'], {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      FAKE_BROKEN_RELEASES: brokenReleases.join(' '),
      FAKE_FAILING_INSTALLS: failingInstalls.join(' '),
      FAKE_INSTALL_LOG: installLog,
      PATH: `${binDirectory}:/usr/bin:/bin`,
    },
  });

  return {
    installedVersions: readFileSync(installLog, 'utf8').split('\n').filter(Boolean),
    result,
    root,
  };
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('tools/refresh-commands.sh', () => {
  it('generates the docs of every version from its own release', () => {
    const { installedVersions, result, root } = runRefresh({});

    expect(result.status).toBe(0);
    expect(installedVersions).toEqual(['1.3.5', '1.2.2']);
    for (const [version, release] of [['1.3', '1.3.5'], ['1.2', '1.2.2']]) {
      const directory = commandsDirectory(root, version);
      expect(readFileSync(path.join(directory, 'use_oras_cli.mdx'), 'utf8')).toContain(`ORAS ${release} help`);
      expect(existsSync(path.join(directory, 'oras_version.mdx'))).toBe(true);
    }
  });

  it('stops without touching the docs when the first install fails', () => {
    const { installedVersions, result, root } = runRefresh({ failingInstalls: ['1.3.5'] });

    expect(result.status).not.toBe(0);
    expect(installedVersions).toEqual(['1.3.5']);
    const directory = commandsDirectory(root, '1.3');
    expect(readFileSync(path.join(directory, 'use_oras_cli.mdx'), 'utf8')).toBe(originalPage);
    expect(existsSync(path.join(directory, 'oras_.mdx'))).toBe(false);
  });

  it('does not generate docs from the previous binary when a later install fails', () => {
    const { result, root } = runRefresh({ failingInstalls: ['1.2.2'] });

    expect(result.status).not.toBe(0);
    expect(readFileSync(path.join(commandsDirectory(root, '1.2'), 'use_oras_cli.mdx'), 'utf8')).toBe(originalPage);
  });

  it('stops when the installed binary cannot run', () => {
    const { result, root } = runRefresh({ brokenReleases: ['1.3.5'] });

    expect(result.status).not.toBe(0);
    expect(existsSync(path.join(commandsDirectory(root, '1.3'), 'oras_.mdx'))).toBe(false);
  });

  it('stops when a version is missing from versions-map', () => {
    const { installedVersions, result, root } = runRefresh({ versionsMap: '1.2 1.2.2\n' });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Version 1.3 missing from versions-map file');
    expect(installedVersions).toEqual([]);
    expect(readFileSync(path.join(commandsDirectory(root, '1.3'), 'use_oras_cli.mdx'), 'utf8')).toBe(originalPage);
  });

  it('does not resolve a version through an entry it is only a prefix of', () => {
    const { installedVersions, result } = runRefresh({
      versions: ['1.1'],
      versionsMap: '1.10 1.10.0\n1.1-preview 1.1.0-beta.1\n',
    });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('Version 1.1 missing from versions-map file');
    expect(installedVersions).toEqual([]);
  });

  it('picks the exact entry when other versions share its prefix', () => {
    const { installedVersions, result } = runRefresh({
      versions: ['1.1'],
      versionsMap: '1.10 1.10.0\n1.1 1.1.0\n',
    });

    expect(result.status).toBe(0);
    expect(installedVersions).toEqual(['1.1.0']);
  });
});
