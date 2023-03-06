# oras discover

Discover referrers of a manifest in the remote registry.

```
oras discover [flags] <name>{:<tag>|@<digest>}
```

## Examples

Discover direct referrers of manifest `hello:latest` in registry `localhost:5000`:

```
oras discover localhost:5000/hello
```

Discover all the referrers of manifest `hello:latest` in registry `localhost:5000` and display in a tree view:

```
oras discover -o tree localhost:5000/hello
```

Discover referrers with type `test-artifact` of manifest `hello:latest` in registry `localhost:5000`:

```
oras discover --artifact-type test-artifact localhost:5000/hello
```

## Options

```
      --artifact-type string   artifact type
      --ca-file string         server certificate authority file for the remote registry
  -d, --debug                  debug mode
  -h, --help                   help for discover
      --insecure               allow connections to SSL registry without certs
  -o, --output string          format in which to display referrers (table, json, or tree). tree format will also show indirect referrers (default "table")
  -p, --password string        registry password or identity token
      --password-stdin         read password or identity token from stdin
      --plain-http             allow insecure connections to registry without SSL check
      --registry-config path   path of the authentication file
  -u, --username string        registry username
  -v, --verbose                verbose output
```