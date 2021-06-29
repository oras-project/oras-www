# Manifest Config

Customizing the configuration object in Go is as simple as passing [oras.WithConfig()](https://godoc.org/oras.land/oras-go/pkg/oras#WithConfig) option to [oras.Push()](https://godoc.org/oras.land/oras-go/pkg/oras#Push).

Suppose there is a descriptor `configDesc` referencing the config file in the content provider `store`.

```go
configDesc := ocispec.Descriptor{
    MediaType: mediaType, // config media type
    Digest:    digest,    // sha256 digest of the config file
    Size:      size,      // config file size
}
```

To push with custom config, execute

```go
_, err := oras.Push(ctx, resolver, ref, store, contents, oras.WithConfig(configDesc))
```

If the caller wants to customize the config media type only, pass the [oras.WithConfigMediaType()](https://godoc.org/oras.land/oras-go/pkg/oras#WithConfigMediaType) option to [oras.Push()](https://godoc.org/oras.land/oras-go/pkg/oras#Push).

```go
_, err := oras.Push(ctx, resolver, ref, store, contents,
                    oras.WithConfigMediaType("application/vnd.oras.config.v1+json"))
```