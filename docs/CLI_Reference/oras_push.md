# oras push

Push files to remote registry.

```bash
oras push [flags] <name>[:<tag>[,<tag>][...]] <file>[:<type>] [...]
```

## Examples

Push file "hi.txt" with media type "application/vnd.oci.image.layer.v1.tar" (default):

```bash
localhost:5000/hello:v1 hi.txt
```

Push file "hi.txt" and export the pushed manifest to a specified path

```bash
--export-manifest manifest.json localhost:5000/hello:v1 hi.txt
```

Push file "hi.txt" with the custom media type "application/vnd.me.hi":

```bash
localhost:5000/hello:v1 hi.txt:application/vnd.me.hi
```

Push multiple files with different media types:

```bash
localhost:5000/hello:v1 hi.txt:application/vnd.me.hi bye.txt:application/vnd.me.bye
```

Push file "hi.txt" with config type "application/vnd.me.config":

```bash
--artifact-type application/vnd.me.config localhost:5000/hello:v1 hi.txt
```

Push file "hi.txt" with the custom manifest config "config.json" of the custom media type "application/vnd.me.config":

```bash
--config config.json:application/vnd.me.config localhost:5000/hello:v1 hi.txt
```

Push file "hi.txt" with specific media type when building the manifest:

```bash
--image-spec v1.1-image localhost:5000/hello:v1 hi.txt    # OCI image
--image-spec v1.1-artifact localhost:5000/hello:v1 hi.txt # OCI artifact
```

Push file to the insecure registry:

```bash
--insecure localhost:5000/hello:v1 hi.txt
```

Push file to the HTTP registry:

```bash
--plain-http localhost:5000/hello:v1 hi.txt
```

Push repository with manifest annotations:

```bash
--annotation "key=val" localhost:5000/hello:v1
```

Push repository with manifest annotation file:

```bash  
--annotation-file annotation.json localhost:5000/hello:v1
```

Push file "hi.txt" with multiple tags:

```bash
localhost:5000/hello:tag1,tag2,tag3 hi.txt
```

Push file "hi.txt" with multiple tags and concurrency level tuned:

```bash
--concurrency 6 localhost:5000/hello:tag1,tag2,tag3 hi.txt
```

Push file "hi.txt" into an OCI layout folder 'layout-dir' with tag 'test':

```bash
--oci-layout layout-dir:test hi.txt
```

## Options

```bash
  -a, --annotation stringArray      manifest annotations
      --annotation-file string      path of the annotation file
      --artifact-type string        artifact type
      --ca-file string              server certificate authority file for the remote registry
      --concurrency int             concurrency level (default 5)
      --config path                 path of image config file
  -d, --debug                       debug mode
      --disable-path-validation     skip path validation
      --export-manifest path        path of the pushed manifest
  -h, --help                        help for push
      --image-spec string           specify manifest type for building artifact. options: v1.1-image, v1.1-artifact
      --insecure                    allow connections to SSL registry without certs
      --oci-layout                  Set target as an OCI image layout.
  -p, --password string             registry password or identity token
      --password-stdin              read password or identity token from stdin
      --plain-http                  allow insecure connections to registry without SSL check
      --registry-config path        path of the authentication file
      --resolve host:port:address   customized DNS formatted in host:port:address
  -u, --username string             registry username
  -v, --verbose                     verbose output
```