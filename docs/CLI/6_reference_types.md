# ORAS Artifact Reference Types (Alpha)

## Pushing artifacts that reference other artifacts

The focus on distributing secure supply chain artifacts has driven new innovations for supporting signatures, software bill of materials (SBoMs) and security scan results as artifacts that may be pushed, discovered and pulled, based on the tag or digest reference of a subject artifact.

See the [ORAS Artifacts Spec scenarios][oras-artifacts-scenarios] for more details.

## ORAS Artifact Spec Support

The latest alpha build of the oras cli is available at: https://github.com/oras-project/oras/releases/tag/v0.2.0-alpha.1

## Pushing Reference Types

The following walkthrough will generate the following graph of artifacts:

![](../assets/images/net-monitor-graph.svg)

Pushing artifact references involves identifying the unique artifact type, at least one file and the `subject` artifact being referenced.

The following sample defines a new Artifact Type of **signature**, using `signature/example` as the `manifest.artifactType`.

- Set environment variables for the registry and artifacts
  ```bash
  REPO=${REGISTRY}/net-monitor
  IMAGE=${REPO}:v1
  ```
- Build and push an image

  ```bash
  docker build -t $IMAGE https://github.com/wabbit-networks/net-monitor.git#main
  docker push $IMAGE
  ```

- Create a sample signature to the container image

  ```bash
  echo '{"artifact": "'${IMAGE}'", "signature": "pat hancock"}' > signature.json
  ```

- Push the signature to the registry, as a reference to the $IMAGE:

  ```
  oras push $REPO \
      --artifact-type 'signature/example' \
      --subject $IMAGE \
      -u $USERNAME -p $PASSWORD \
      ./signature.json:application/json
  ```

## Discovering Artifact References

The ORAS Artifacts Specification defines a [referrers API][oras-artifacts-referrers] for discovering references to a `subject` artifact. In the above case, oras discover can show the the list of references to the $IMAGE

- Using `oras discover`, view the graph of artifacts now stored in the registry

  ```bash
  oras discover \
    -u $USERNAME -p $PASSWORD \
    -o tree $IMAGE
  ```
- The output shows the beginning of a graph of artifacts, where the signature is viewed as a child of the $IMAGE

  ```output
  localhost:5000/net-monitor:v1
  └── signature/example
      └── sha256:1b6308bc4a2dd8933e9f66ff5bbc47e685516e5378208b46c58dc...
  ```

## Creating Deep Graphs of Artifacts

The ORAS Artifacts specification enables deep graphs, enabling signed SBoMs and other artifact types.

- Create and push a sample Software Bill of Materials to the registry:
  ```bash
  echo '{"version": "0.0.0.0", "artifact": "'${IMAGE}'", "contents": "good"}' > sbom.json

  oras push $REPO \
    --artifact-type 'sbom/example' \
    --subject $IMAGE \
    -u $USERNAME -p $PASSWORD \
    ./sbom.json:application/json
  ```
- Sign the SBoM
  ```bash
  SBOM_DIGEST=$(oras discover -o json \
                  --artifact-type sbom/example \
                  -u $USERNAME -p $PASSWORD \
                  $IMAGE | jq -r ".references[0].digest")

  echo '{"artifact": "'${REPO}${SBOM_DIGEST}'", "signature": "pat hancock"}' > sbom-signature.json

  oras push $REPO \
    --artifact-type 'signature/example' \
    --subject $REPO@$SBOM_DIGEST \
    -u $USERNAME -p $PASSWORD \
    ./sbom-signature.json:application/json
  ```
- View the graph
  ```bash
  oras discover \
      -u $USERNAME -p $PASSWORD \
      -o tree $IMAGE
  ```
- Generates the following output:
  ```bash
  localhost:5000/net-monitor:v1
  ├── signature/example
  │   └── sha256:49f47c674c0224c72ca646ae0b8b70c14115cf4874f7...
  └── sbom/example
      └── sha256:dc737e2b9bb2489aa61f3fc4a90e2ec166bd9685fd56c6f48d...
          └── signature/example
              └── sha256:31eb6a50c54df208a09222127a06e9b7afe1dd042771631b175...
  ```

## Registry Support

The following registries currently support the [ORAS Artifacts Specification][oras-artifacts].

- Please [submit PRs](https://github.com/oras-project/oras-www/pulls) for additional registry support.
- See [ORAS Artifacts Community](https://github.com/oras-project/artifacts-spec#community) for how to get engaged.

### CNCF Distribution with ORAS Artifacts Support

A reference implementation of the ORAS Artifacts Spec is available at [github.com/oras-project/distribution](https://github.com/oras-project/distribution)

> note: to keep the `oras` commands consistent across registries, `-u USERNAME -p PASSWORD` are used consistently. By setting the username and password = nothing, the commands will work consistently.

To run distribution locally:
  ```bash
  docker run -d -p 5000:5000 ghcr.io/oras-project/registry:v0.0.3-alpha
  REGISTRY=localhost:5000
  USERNAME=nothing
  PASSWORD=nothing
  ```

### Azure Container Registry

The Azure Container Registry supports [ORAS Artifacts][oras-artifacts]. To enable the `oras` cli to `push`, `discover`, `pull` with ACR, configure username and passwords using [ACR Repository Scoped Tokens][acr-tokens]. Other [authentication options](https://aka.ms/acr/authentication) are also available.

```bash
ACR_NAME=<registryName>
REGISTRY=$ACR_NAME.azurecr.io
USERNAME='oras-token'
PASSWORD=$(az acr token create -n $USERNAME \
                    -r $ACR_NAME \
                    --scope-map _repositories_admin \
                    --only-show-errors \
                    -o json | jq -r ".credentials.passwords[0].value")

docker login -u $USERNAME -p $PASSWORD $REGISTRY
```

### Coming Soon: AWS ACR

The [AWS Elastic Container Registry has committed to supporting ORAS Artifacts](https://github.com/aws/containers-roadmap/issues/43#issuecomment-943740674).

### Coming Soon: Docker Hub

Docker Hub has committed to supporting ORAS Artifacts

[acr-tokens]:                 https://aka.ms/acr/tokens
[oras-artifacts]:             https://github.com/oras-project/artifacts-spec/
[oras-artifacts-scenarios]:   https://github.com/oras-project/artifacts-spec/blob/main/scenarios.md
[oras-artifacts-referrers]:   https://github.com/oras-project/artifacts-spec/blob/main/manifest-referrers-api.md