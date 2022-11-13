## oras copy

Copy artifacts from one target to another.

```
oras copy [flags] <from>{:<tag>|@<digest>} <to>[:<tag>[,<tag>][...]]
```

## Examples

Copy the artifact tagged with `v1` from repository `localhost:5000/net-monitor` to repository `localhost:5000/net-monitor-copy`:

```
oras copy localhost:5000/net-monitor:v1 localhost:5000/net-monitor-copy:v1
```

Copy the artifact tagged with `v1` and its referrers from repository `localhost:5000/net-monitor` to `localhost:5000/net-monitor-copy`:

```
oras copy -r localhost:5000/net-monitor:v1 localhost:5000/net-monitor-copy:v1
```

Copy the artifact tagged with `v1` from repository `localhost:5000/net-monitor` to `localhost:5000/net-monitor-copy` with certain platform:

```
oras copy --platform linux/arm/v5 localhost:5000/net-monitor:v1 localhost:5000/net-monitor-copy:v1 
```

Copy the artifact tagged with `v1` from repository `localhost:5000/net-monitor` to `localhost:5000/net-monitor-copy` with multiple tags:

```
oras copy localhost:5000/net-monitor:v1 localhost:5000/net-monitor-copy:v1,tag2,tag3
```

Copy the artifact tagged with `v1` from repository `localhost:5000/net-monitor` to `localhost:5000/net-monitor-copy` with multiple tags and concurrency level tuned:

```
oras copy --concurrency 6 localhost:5000/net-monitor:v1 localhost:5000/net-monitor-copy:v1,tag2,tag3
```

## Options

```
      --concurrency int                             concurrency level (default 3)
  -d, --debug                                       debug mode
      --from-ca-file string                         server certificate authority file for the remote source registry
      --from-insecure                               allow connections to source SSL registry without certs
      --from-password string                        source registry password or identity token
      --from-plain-http                             allow insecure connections to source registry without SSL check
      --from-username string                        source registry username
  -h, --help                                        help for copy
      --platform os[/arch][/variant][:os_version]   request platform in the form of os[/arch][/variant][:os_version]
  -r, --recursive                                   recursively copy the artifact and its referrer artifacts
      --registry-config path                        path of the authentication file
      --to-ca-file string                           server certificate authority file for the remote destination registry
      --to-insecure                                 allow connections to destination SSL registry without certs
      --to-password string                          destination registry password or identity token
      --to-plain-http                               allow insecure connections to destination registry without SSL check
      --to-username string                          destination registry username
  -v, --verbose                                     verbose output
```
