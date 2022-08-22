# Developer Guide

## Prerequisites

- Go 1.18+
- Git

## Clone the repository

You can clone the repo and get the main branch using the following command:

```bash
git clone https://github.com/oras-project/oras.git
```

Enter the `oras` directory:

```
cd oras
```

## Building binary

Use `make build` to build all platform binaries to the `bin/` directory.

Mac:

```bash
# builds to
# - bin/darwin/amd64/oras
# - bin/darwin/arm64/oras
make build-mac

# builds to bin/darwin/amd64/oras
make build-mac-amd64

# builds to bin/darwin/arm64/oras
make build-mac-arm64
```

Linux:

```bash
# builds to
# - bin/linux/arm64/oras
# - bin/linux/amd64/ora
# - bin/linux/arm/v7/orass
make build-linux

# builds to bin/linux/arm64/oras
make build-linux-arm64

# builds to bin/linux/amd64/oras
make build-linux-amd64

# builds to bin/linux/arm/v7/oras
make build-linux-arm-v7
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
4. Make fresh clone the repo after all above steps are completed and merged. Create a new tag for the version prefixed with "v", for example: `git tag v0.14.0`. Push the tag directly to the repo, for example `git push origin v0.14.0`.
5. Wait for GitHub Actions to complete successfully for both the `release-ghcr` and `release-github` pipelines
6. Download all of the artifacts uploaded to the new GitHub release locally (`*checksums.txt`, `*darwin_amd64.tar.gz`, `*linux_armv7.tar.gz`, `*linux_arm64.tar.gz`, `*linux_amd64.tar.gz`, `*windows_amd64.zip`).
7. Verify the checksum of the file, downloaded platform should pass the check:
    ```sh
    shasum -c oras_0.14.0_checksums.txt
    ```
8. Run version command and make sure that version number and git commit digest is what you expect it to be (same as the commit used to create the tag). Example:
    ```sh
    mkdir -p oras-bin/
    tar -zxf oras_0.14.0_linux_amd64.tar.gz -C oras-bin
    ./oras-bin/oras version
    ```
9. Create armored GPG signatures (`.asc`) using the key in the `KEYS` file.
    ```sh
    for file in `ls`; do
        gpg --armor --detach-sign $file
    done
    ```
10. Validate the signatures. Not that the `KEYS` file should be imported with `gpg --import KEYS`. Run some form of the following (adapted from Linux project):
    ```bash
    for file in `ls *.asc`; do
        gpg --verify $file
    done
    ```
11. Click "Edit release" button on the release, and add the `.asc` files created in the previous step. Edit the release description for change logs and also add a note indicating your GPG key used to sign the artifacts. Example (replace with your fingerprint etc.):
    ```
    ## Notes

    This release was signed with `E97F 9DA5 AE2E 39CF 48A1 42B7 852A 7470 A39F B81D` (@jdolitsky's GPG key) which can be found [here](https://github.com/jdolitsky.gpg).
    ```
12. Click "Publish Release" button to save. Double-check that the release contains a corresponding `.asc` file for each release artifact.
13. Consume beverage of choice.. you're done! Thanks for moving the project forward.
14. Oh yea, tell people about it in `#oras`
    
### Some Comments

There is a large number of steps here, mostly manual. Here are some comments and/or thoughts on it.

* Step 3: Editing files for stable version. I can see that in one place, say, `README.md`. But do we really have to edit the code? Could we not use build-time flags as in `go build -ldflags="-X main.Version=foo"` or similar?
* Step 5: This is the heart of the release. Adding a tag triggers a github release and an image build pushed to GHCR.
* Steps 6-12: These are all signing and verifying. Of course, it is possible that GH Actions built and released something other than what we thought, but we cannot counter every single possible risk. It still would be nice if we could automate this somehow.
* Step 14: :beer:

From a documentation perspective, I would break this down into sections:

1. Prepare the release
2. Cut the release
3. Verify the release (hopefully automated)
4. Sign the release
5. Make available elsewhere (hopefully automated)

Once ready, this should be a doc in the project itself.

### Library vs Utility

oras actually serves 2 purposes: library and utility. All of the above steps, except for the tag, are entirely about the utility.

For better or for worse, semver is tied up with both. As an example, the current issue with the go modules solely affects its inclusion as a library, but it is immediate. It can be fixed by cutting v0.14.0, and the downstream problems go away. yet cutting a release _also_ means all of the above, which are far more complicated.