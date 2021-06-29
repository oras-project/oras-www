# Overview

## Languages

The following languages are currently supported:

- [Go](./Go/)
- [Python](./1_python) (in progress)
- [Rust](./2_rust) (in progress)

## Paradigms

🚧 *Note: this section is contingent on
[oras-project/oras-go#8](https://github.com/oras-project/oras-go/pull/8) and
does not reprersent the current state of the ORAS Go client library.*

At a high-level, each client library provides the concept of a `Target` interface
and a `Copy` method. `Copy` transfers content from one `Target` to another.

### `Target`

A `Target` represents a place to which one can send/push or retrieve/pull artifacts.
Anything that implements this interface can be used as a place to send
or retrieve artifacts.

Some examples of a `Target` may include the following:

- An OCI Registry
- An [OCI Image Layout](https://github.com/opencontainers/image-spec/blob/master/image-layout.md)
- A local collection of files

### `Copy`

`Copy` copies a ref from one `Target` to a ref in another `Target`.

#### Method signature

The following is a rough method signature based on the Go version:

```
func Copy(from Target, fromRef string, to Target, toRef string) Descriptor
```
