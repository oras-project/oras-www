# oras manifest delete

Delete a manifest from remote registry.

```bash
oras manifest delete [flags] <name>{:<tag>|@<digest>}
```

## Examples

Delete a manifest tagged with 'v1' from repository 'localhost:5000/hello':

```bash
  oras manifest delete localhost:5000/hello:v1
```

Delete a manifest without prompting confirmation:

```bash
  oras manifest delete --force localhost:5000/hello:v1
```

Delete a manifest and print its descriptor:

```bash
  oras manifest delete --descriptor localhost:5000/hello:v1
```

Delete a manifest by digest 'sha256:99e4703fbf30916f549cd6bfa9cdbab614b5392fbe64fdee971359a77073cdf9' from repository 'localhost:5000/hello':

```bash
  oras manifest delete localhost:5000/hello@sha:99e4703fbf30916f549cd6bfa9cdbab614b5392fbe64fdee971359a77073cdf9
```


## Options

```bash
      --ca-file string              server certificate authority file for the remote registry
  -d, --debug                       debug mode
      --descriptor                  output the descriptor
      --distribution-spec string    set OCI distribution spec version and API option for target. options: v1.1-referrers-api, v1.1-referrers-tag
  -f, --force                       ignore nonexistent references, never prompt
  -h, --help                        help for delete
      --insecure                    allow connections to SSL registry without certs
  -p, --password string             registry password or identity token
      --password-stdin              read password or identity token from stdin
      --plain-http                  allow insecure connections to registry without SSL check
      --pretty                      prettify JSON objects printed to stdout
      --registry-config path        path of the authentication file
      --resolve host:port:address   customized DNS formatted in host:port:address
  -u, --username string             registry username
  -v, --verbose                     verbose output
```