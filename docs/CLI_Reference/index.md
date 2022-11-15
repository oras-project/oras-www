# Use the ORAS command line

To list available commands, either run `oras` with no parameters or execute `oras help`:

```
$ oras
Usage:
  oras [command]

Available Commands:
  attach      Attach files to an existing artifact
  blob        Blob operations
  completion  Generate the autocompletion script for the specified shell
  cp          Copy artifacts from one target to another
  discover    Discover referrers of a manifest in the remote registry
  help        Help about any command
  login       Log in to a remote registry
  logout      Log out from a remote registry
  manifest    Manifest operations
  pull        Pull files from remote registry
  push        Push files to remote registry
  repo        Repository operations
  tag         Tag a manifest in the remote registry
  version     Show the oras version information

Flags:
  -h, --help   help for oras

Use "oras [command] --help" for more information about a command.
```

## See also

* [oras attach](0_oras_attach.md)	 - Attach files to an existing artifact
* oras blob - Blob operations
    * [oras blob delete](1_oras_blob_delete.md)	 - Delete a blob from a remote registry
    * [oras blob fetch](2_oras_blob_fetch.md)	 - Fetch a blob from a remote registry
    * [oras blob push](3_ras_blob_push.md)	 - Push a blob to a remote registry
    * [oras copy](4_oras_copy.md)	 - Copy artifacts from one target to another
* [oras discover](5_oras_discover.md)	 - Discover referrers of a manifest in the remote registry
* [oras login](oras_login.md)	 - Log in to a remote registry
* [oras logout](oras_logout.md)	 - Log out from a remote registry
* oras manifest - Manifest operations
    * [oras manifest delete](oras_manifest_delete.md)	 - Delete a manifest from a remote registry
    * [oras manifest fetch-config](oras_manifest_fetch-config.md)	 - Fetch the config of a manifest from a remote registry
    * [oras manifest fetch](oras_manifest_fetch.md)	 - Fetch manifest of the target artifact
    * [oras manifest push](oras_manifest_push.md)	 - Push a manifest to a remote registry
* [oras pull](oras_pull.md)	 - Pull files from a remote registry
* [oras push](oras_push.md)	 - Push files to a remote registry
* [oras repository](oras_repository.md)	 - Repository operations
* [oras tag](oras_tag.md)	 - Tag a manifest in the remote registry
* [oras version](oras_version.md)	 - Show ORAS CLI version

