## oras blob fetch

Fetch a blob from a remote registry.

```
oras blob fetch [flags] {--output <file> | --descriptor} <name>@<digest>
```

## Examples

Fetch the blob and save it to a local file:

```
oras blob fetch --output blob.tar.gz localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```

Fetch the blob and print the raw blob content:

```
oras blob fetch --output - localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```

Fetch and print the descriptor of a blob:

```
oras blob fetch --descriptor localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```

Fetch the blob, save it to a local file and print the descriptor:

```
oras blob fetch --output blob.tar.gz --descriptor localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```

## Options

```
      --ca-file string         server certificate authority file for the remote registry
  -d, --debug                  debug mode
      --descriptor             output the descriptor
  -h, --help                   help for fetch
      --insecure               allow connections to SSL registry without certs
  -o, --output path            output file path, use - for stdout
  -p, --password string        registry password or identity token
      --password-stdin         read password or identity token from stdin
      --plain-http             allow insecure connections to registry without SSL check
      --pretty                 prettify JSON objects printed to stdout
      --registry-config path   path of the authentication file
  -u, --username string        registry username
  -v, --verbose                verbose output
```
