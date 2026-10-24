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
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const installScript = path.resolve(__dirname, '..', 'install.sh');
const temporaryDirectories = [];

function writeExecutable(filename, contents) {
  writeFileSync(filename, contents);
  chmodSync(filename, 0o755);
}

function runInstaller({ operatingSystem = 'Linux', architecture, curlExit = 0 }) {
  const root = mkdtempSync(path.join(tmpdir(), 'oras-www-install-'));
  temporaryDirectories.push(root);

  const binDirectory = path.join(root, 'bin');
  const installDirectory = path.join(root, 'install');
  const curlLog = path.join(root, 'curl.log');
  const tarLog = path.join(root, 'tar.log');
  mkdirSync(binDirectory);
  mkdirSync(installDirectory);

  writeExecutable(
    path.join(binDirectory, 'uname'),
    `#!/usr/bin/env bash
if [[ "$1" == "-s" ]]; then
  printf '%s\\n' "$FAKE_UNAME_S"
elif [[ "$1" == "-m" ]]; then
  printf '%s\\n' "$FAKE_UNAME_M"
else
  exit 2
fi
`
  );
  writeExecutable(
    path.join(binDirectory, 'curl'),
    `#!/usr/bin/env bash
output=""
url=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --output)
      output="$2"
      shift 2
      ;;
    http*)
      url="$1"
      shift
      ;;
    *)
      shift
      ;;
  esac
done
printf '%s' "$url" > "$FAKE_CURL_LOG"
if [[ "$FAKE_CURL_EXIT" != "0" ]]; then
  printf 'download failed\\n' >&2
  exit "$FAKE_CURL_EXIT"
fi
printf 'archive' > "$output"
`
  );
  writeExecutable(
    path.join(binDirectory, 'tar'),
    `#!/usr/bin/env bash
printf 'called' > "$FAKE_TAR_LOG"
touch oras
`
  );

  const result = spawnSync('bash', [installScript, '1.3.4', installDirectory], {
    encoding: 'utf8',
    env: {
      ...process.env,
      FAKE_CURL_EXIT: String(curlExit),
      FAKE_CURL_LOG: curlLog,
      FAKE_TAR_LOG: tarLog,
      FAKE_UNAME_M: architecture,
      FAKE_UNAME_S: operatingSystem,
      PATH: `${binDirectory}:/usr/bin:/bin`,
    },
  });

  return { curlLog, installDirectory, result, tarLog };
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('tools/install.sh', () => {
  it.each([
    ['x86_64', 'amd64'],
    ['aarch64', 'arm64'],
    ['armv7l', 'armv7'],
  ])('maps Linux %s to the %s release asset', (machine, releaseArchitecture) => {
    const { curlLog, installDirectory, result, tarLog } = runInstaller({
      architecture: machine,
    });

    expect(result.status).toBe(0);
    expect(readFileSync(curlLog, 'utf8')).toBe(
      `https://github.com/oras-project/oras/releases/download/v1.3.4/oras_1.3.4_linux_${releaseArchitecture}.tar.gz`
    );
    expect(readFileSync(tarLog, 'utf8')).toBe('called');
    expect(existsSync(path.join(installDirectory, 'oras'))).toBe(true);
    expect(existsSync(path.join(installDirectory, 'oras.tgz'))).toBe(false);
  });

  it.each([
    ['Darwin', 'x86_64', 'darwin_amd64'],
    ['FreeBSD', 'amd64', 'freebsd_amd64'],
  ])('maps %s %s to the %s release asset', (operatingSystem, architecture, releaseTarget) => {
    const { curlLog, result } = runInstaller({ architecture, operatingSystem });

    expect(result.status).toBe(0);
    expect(readFileSync(curlLog, 'utf8')).toBe(
      `https://github.com/oras-project/oras/releases/download/v1.3.4/oras_1.3.4_${releaseTarget}.tar.gz`
    );
  });

  it('rejects an unknown operating system before downloading', () => {
    const { curlLog, result } = runInstaller({
      architecture: 'x86_64',
      operatingSystem: 'Solaris',
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Unsupported operating system: Solaris');
    expect(existsSync(curlLog)).toBe(false);
  });

  it('rejects an unknown architecture before downloading', () => {
    const { curlLog, result } = runInstaller({ architecture: 'i686' });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Unsupported architecture: i686');
    expect(existsSync(curlLog)).toBe(false);
  });

  it('stops before extraction and removes a partial download when curl fails', () => {
    const { installDirectory, result, tarLog } = runInstaller({
      architecture: 'aarch64',
      curlExit: 22,
    });

    expect(result.status).toBe(22);
    expect(result.stderr).toContain('download failed');
    expect(existsSync(tarLog)).toBe(false);
    expect(existsSync(path.join(installDirectory, 'oras.tgz'))).toBe(false);
  });
});
