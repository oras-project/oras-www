# Manifest Annotations

Making annotations in Go is as simple as modifying the `Annotations` field of the [Descriptor](https://godoc.org/github.com/opencontainers/image-spec/specs-go/v1#Descriptor) struct objects before passing them to [oras.Push()](https://godoc.org/oras.land/oras-go/pkg/oras#Push) with or without the option [oras.WithConfig()](https://godoc.org/oras.land/oras-go/pkg/oras#WithConfig).

The caller can pass the push option [oras.WithConfigAnnotations()](https://godoc.org/oras.land/oras-go/pkg/oras#WithConfigAnnotations) to make annotations to the default config. Similarly, the caller can pass the push option [oras.WithManifestAnnotations()](https://godoc.org/oras.land/oras-go/pkg/oras#WithManifestAnnotations) to make annotations to the manifest.

## Retrieve Annotations

Retrieving the annotations of individual layers is as simple as reading the `Annotations` field of the [Descriptor](https://godoc.org/github.com/opencontainers/image-spec/specs-go/v1#Descriptor) slice returned by [oras.Pull()](https://godoc.org/oras.land/oras-go/pkg/oras#Pull).

For example:

```go
_, files, err := oras.Pull(ctx, resolver, ref, store)
if err != nil {
    panic(err)
}
for _, file := range files {
    fmt.Println(file.Annotations)
}
```

Retrieving the annotations of the manifest and/or the config is currently not supported.
