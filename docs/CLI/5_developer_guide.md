# Developer Guide

## Building binary

Use `make build` to build all platform binaries to the `bin/` directory.

Mac:

```bash
# builds to bin/darwin/amd64/oras
make build-mac
```
Mac ARM64:

```bash
# builds to bin/darwin/arm64/oras
make build-mac-arm64
```

Linux:

```bash
# builds to bin/linux/amd64/oras
make build-linux
```

Linux ARM64:

```bash
# builds to bin/linux/arm64/oras
make build-linux-arm64
```

Windows:

```bash
# builds to bin/windows/amd64/oras.exe
make build-windows
```

## Cleaning workspace

To remove all files not manged by git, run `make clean` (be careful!)

## Managing dependencies

[Using Go Modules](https://blog.golang.org/using-go-modules) to manage dependencies.

To update or add new dependencies, run `go get <package name>`.

## Release checklist

*Note: this section needs a lot of love and automation* 🙂

1. Make sure your GPG is available on GitHub at `https://github.com/<username>.gpg`. This can be added at https://github.com/settings/keys
2. If you haven't already, open PR to add your GPG key to the [`KEYS`](https://github.com/oras-project/oras/blob/main/KEYS) file (see file for instructions)
3. Look for any references to the current stable version, and replace with upcoming version. Open a PR with these changes, such as "prepare for <version>". Examples:
    * https://github.com/oras-project/oras/blob/main/internal/version/version.go#L5
    * https://github.com/oras-project/oras/blob/main/README.md
4. In the repository settings, add values for the following secrets:
    * `RELEASE_GITHUB_USER_TOKEN` - Your GitHub personal access token which will be used to add artifacts to the release page (note: you can/should delete this token after the release)
    * `RELEASE_GHCR_USER_NAME` - Your GitHub username, used to release container image to GHCR
    * `RELEASE_GHCR_USER_TOKEN` - Your GitHub personal access token, used to release container image to GHCR (note: you can/should delete this token after the release)
5. Make fresh clone the repo after all above steps are completed and merged. Create a new tag for the version prefixed with "v", for example: `git tag v0.10.1`. Push the tag directly to the repo, for example `git push origin v0.10.1`.
6. Wait for GitHub Actions to complete successfully for both the `release-ghcr` and `release-github` pipelines
7. Download all of the artifacts uploaded to the new GitHub release locally (`*checksums.txt`, `*darwin_amd64.tar.gz`, `*linux_amd64.tar.gz`, `*windows_amd64.tar.gz`). Create armored GPG signatures (`.asc`) using the key in the `KEYS` file.
    - TODO: `make fetch-dist sign`
8. Click "Edit release" button on the release, and add the `.asc` files created in the previous step. Also add a note to the release description indicating your GPG key was used to sign the artifacts. Example (replace with your fingerprint etc.):
    ```
    ## Notes

    This release was signed with `E97F 9DA5 AE2E 39CF 48A1 42B7 852A 7470 A39F B81D` (@jdolitsky's GPG key) which can be found [here](https://github.com/jdolitsky.gpg).
    ```
9. Click "Update release" button to save. Double-check that the release contains a corresponding `.asc` file for each release artifact.
10. Download the release artifact and signature for your platform, as well as the checksum file and its signature.
11. Verify the checksum of the file manually. It should match what is in `checksums.txt`. For example:
    ```
    $ shasum -a 256 oras_0.10.1_darwin_amd64.tar.gz
    ```
12. Validate the signatures. Not that the `KEYS` file should be imported with `gpg --import KEYS`. Run some form of the following (adapted from Linux project):
    ```
    $ function verify_signature {
        local filename="${1}"
        local num_goodlines=$(gpg --verify --status-fd=1 "${filename}" | grep -c -E '^\[GNUPG:\] (GOODSIG|VALIDSIG)')
        if [[ ${num_goodlines} -lt 2 ]]; then
          echo "Unable to verify the signature of ${filename}"
          return 1
        fi
        echo "Verified the signature of ${filename}"
      }
    
    $ verify_signature oras_0.10.1_darwin_amd64.tar.gz.asc
    $ verify_signature oras_0.10.1_checksums.txt.asc
    ```
13. Install this version of ORAS, and make sure that the version and git commit is what you expect it to be (same as the commit used to create the tag). Example:
    ```
    $ mkdir -p oras-install/
    $ tar -zxf oras_0.10.1_*.tar.gz -C oras-install/
    $ mv oras-install/oras /usr/local/bin/
    $ rm -rf oras_0.10.0_*.tar.gz oras-install/

    $ /usr/local/bin/oras version
    Version:        0.10.0
    Go version:     go1.15.7
    Git commit:     173c010570c48e4aa18ce186cae8cc812f8e8b6e
    Git tree state: clean
    ```
14. Create a PR on [fishworks/fish-food](https://github.com/fishworks/fish-food) with the new ORAS version and checksums. This can be done by navigating to [this file](https://github.com/fishworks/fish-food/blob/main/Food/oras.lua) in your browser, and clicking the "Edit" button, making the changes and clicking "Propose changes", which will allow you to open a PR. You can also do this in your terminal/editor, of course.
15. Consume beverage of choice.. you're done! Thanks for moving the project forward.
16. Oh yea, tell people about it in `#oras`
17. goreleaser makes bad release notes... run the following to generate a better changelog: `git log --no-merges --pretty=format:'- %s %H (%aN)' ${PREVIOUS_RELEASE}..${RELEASE}`
    
### Some Comments

There is a large number of steps here, mostly manual. Here are some comments and/or thoughts on it.

* Step 3: Editing files for stable version. I can see that in one place, say, `README.md`. But do we really have to edit the code? Could we not use build-time flags as in `go build -ldflags="-X main.Version=foo"` or similar?
* Step 4: use of personal tokens. We really should have a production token used to push releases out. We can discuss signing separately, but entering yours or my token in, to be used by Actions, and then removing it, is messy. It also means someone else could accidentally trigger with my token.
* Step 5: This is the heart of the release. Adding a tag triggers a github release and an image build pushed to GHCR.
* Step 5a: There are several steps in the GHCR push that probably could be simplfied down to a single one with the use of [docker/build-push-action@v2](https://github.com/marketplace/actions/build-and-push-docker-images)
* Steps 6-12: These are all signing and verifying. Of course, it is possible that GH Actions built and released something other than what we thought, but we cannot counter every single possible risk. It still would be nice if we could automate this somehow.
* Step 13: This is just verification, although it probably should be before steps 6-12 (verify before signing). Actually, is there any reason we cannot make this part of the GH release pipeline?
* Step 14: Got it. We should add homebrew, I suspect. Again, if we could automate this, it would be super.
* Step 15: :beer:

From a documentation perspective, I would break this down into sections:

1. Prepare the release
2. Cut the release
3. Verify the release (hopefully automated)
4. Sign the release
5. Make available elsewhere (hopefully automated)

Once ready, this should be a doc in the project itself.

### Library vs Utility

oras actually serves 2 purposes: library and utility. All of the above steps, except for the tag, are entirely about the utility.

For better or for worse, semver is tied up with both. As an example, the current issue with the go modules solely affects its inclusion as a library, but it is immediate. It can be fixed by cutting v0.10.1, and the downstream problems go away. yet cutting a release _also_ means all of the above, which are far more complicated.