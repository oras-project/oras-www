# Go

Source code: [github.com/oras-project/oras-go](https://github.com/oras-project/oras-go)

## Introduction

The ORAS Go client library provides the ability to replicate artifacts between different [Targets](../#target).  
Furthermore, the version `v2` is a registry client conforming [image-spec v1.1.0-rc.2](https://github.com/opencontainers/image-spec/releases/tag/v1.1.0-rc2) and [distribution-spec v1.1.0-rc1](https://github.com/opencontainers/distribution-spec/blob/v1.1.0-rc1/spec.md).

Using the ORAS Go client library, you can develop your own push/pull experience:

```
myclient push artifacts.example.com/myartifact:1.0 ./mything.thang
```

## Usage

The package `oras.land/oras-go/v2` can quickly be imported in other Go-based tools that
wish to benefit from the ability to store arbitrary content in container registries.

1. Get the  `oras.land/oras-go/v2` package
```sh
go get oras.land/oras-go/v2
```

2. Import and use the `v2` package
```go
import "oras.land/oras-go/v2"
```

3. Run
```sh
go mod tidy
```