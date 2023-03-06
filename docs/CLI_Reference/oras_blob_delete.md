# oras blob delete

Delete a blob from a remote registry.

```
oras blob delete [flags] <name>@<digest>
```

## Examples


Delete a blob:

```
oras blob delete localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```

Delete a blob without prompting confirmation:

```
oras blob delete --yes localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```

Delete a blob and print its descriptor:

```
oras blob delete --descriptor --yes localhost:5000/hello@sha256:9a201d228ebd966211f7d1131be19f152be428bd373a92071c71d8deaf83b3e5
```  

## Options

```
      --ca-file string         server certificate authority file for the remote registry
  -d, --debug                  debug mode
      --descriptor             output the descriptor
  -h, --help                   help for delete
      --insecure               allow connections to SSL registry without certs
  -p, --password string        registry password or identity token
      --password-stdin         read password or identity token from stdin
      --plain-http             allow insecure connections to registry without SSL check
      --pretty                 prettify JSON objects printed to stdout
      --registry-config path   path of the authentication file
  -u, --username string        registry username
  -v, --verbose                verbose output
  -y, --yes                    do not prompt for confirmation
```

