# oras attach

Attach files to an existing artifact.

```bash
oras attach [flags] --artifact-type=<type> <name>{:<tag>|@<digest>} <file>[:<type>] [...]
```

## Examples

Attach file `hi.txt` with type `doc/example` to manifest `hello:test` in registry `localhost:5000`

```bash
oras attach --artifact-type doc/example localhost:5000/hello:test hi.txt
```

Attach file `hi.txt` and add annotations from file `annotation.json`

```bash
oras attach --artifact-type doc/example --annotation-file annotation.json localhost:5000/hello:latest hi.txt
```

Attach an artifact with manifest annotations

```bash
oras attach --artifact-type doc/example --annotation "key1=val1" --annotation "key2=val2" localhost:5000/hello:latest
```
Attach file `hi.txt` and add manifest annotations
 
```bash 
oras attach --artifact-type doc/example --annotation "key=val" localhost:5000/hello:latest hi.txt
```

Attach file `hi.txt` and export the pushed manifest to `manifest.json`

```bash
oras attach --artifact-type doc/example --export-manifest manifest.json localhost:5000/hello:latest hi.txt
```

## Options

```
  -a, --annotation stringArray    manifest annotations
      --annotation-file string    path of the annotation file
      --artifact-type string      artifact type
      --ca-file string            server certificate authority file for the remote registry
      --concurrency int           concurrency level (default 5)
  -d, --debug                     debug mode
      --disable-path-validation   skip path validation
      --export-manifest path      path of the pushed manifest
  -h, --help                      help for attach
      --insecure                  allow connections to SSL registry without certs
  -p, --password string           registry password or identity token
      --password-stdin            read password or identity token from stdin
      --plain-http                allow insecure connections to registry without SSL check
      --registry-config path      path of the authentication file
  -u, --username string           registry username
  -v, --verbose                   verbose output
```


