# Getting Started

Source code: [github.com/oras-project/oras-go](https://github.com/oras-project/oras-go)

## Introduction

Using the ORAS Go client library, you can develop your own push/pull experience:

```
myclient push artifacts.azurecr.io/myartifact:1.0 ./mything.thang
```

The package `oras.land/oras-go` can quickly be imported in other Go-based tools that
wish to benefit from the ability to store arbitrary content in container registries.

## Example

[Source](https://github.com/oras-project/oras-go/blob/main/examples/simple_push_pull.go)

```go
package main

import (
	"context"
	"fmt"

	"github.com/containerd/containerd/remotes/docker"
	ocispec "github.com/opencontainers/image-spec/specs-go/v1"

	"oras.land/oras-go/pkg/content"
	"oras.land/oras-go/pkg/oras"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	ref := "localhost:5000/oras:test"
	fileName := "hello.txt"
	fileContent := []byte("Hello World!\n")
	customMediaType := "my.custom.media.type"

	ctx := context.Background()
	resolver := docker.NewResolver(docker.ResolverOptions{})

	// Push file(s) w custom mediatype to registry
	memoryStore := content.NewMemoryStore()
	desc := memoryStore.Add(fileName, customMediaType, fileContent)
	pushContents := []ocispec.Descriptor{desc}
	fmt.Printf("Pushing %s to %s...\n", fileName, ref)
	desc, err := oras.Push(ctx, resolver, ref, memoryStore, pushContents)
	check(err)
	fmt.Printf("Pushed to %s with digest %s\n", ref, desc.Digest)

	// Pull file(s) from registry and save to disk
	fmt.Printf("Pulling from %s and saving to %s...\n", ref, fileName)
	fileStore := content.NewFileStore("")
	defer fileStore.Close()
	allowedMediaTypes := []string{customMediaType}
	desc, _, err = oras.Pull(ctx, resolver, ref, fileStore, oras.WithAllowedMediaTypes(allowedMediaTypes))
	check(err)
	fmt.Printf("Pulled from %s with digest %s\n", ref, desc.Digest)
	fmt.Printf("Try running 'cat %s'\n", fileName)
}
```
