# ORAS 0.14 and Future: Empower Container Secure Supply Chain

_Feynman Zhou, CNCF Ambassador, ACR Product Manager_

The [OCI Registry As Storage (ORAS)](https://oras.land/) project maintainers announced v0.14 release for the ORAS CLI recently. ORAS v0.14 introduces four new top-level commands and new options to manage supply chain artifacts across different container registries and multi-cloud environments. 

## What's new in ORAS 0.14

* New command sets
  * `oras attach`: [Preview] Attach files to an existing artifact
  * `oras discover`: [Preview] Discover referrers of a manifest in the remote registry
  * `oras copy`: [Preview] Copy artifacts from one target to another
  * `oras manifest fetch`: [Preview] Fetch manifest of the target artifact
* New options for `oras push`
  * Add ability to export manifest after pushing artifacts by `--export-manifest <path>`
  * Add `--artifact-type` to set the media type of the manifest config for OCI manifests
  * Add `--annotation <key>=<value>` option for easier specifying manifest annotations
* New options for `oras pull`
  * Support pulling arbitrary manifest config

Please see the [Release Notes](https://github.com/oras-project/oras/releases/tag/v0.14.0) for details.

Prior to ORAS CLI v0.14 release, the ORAS Go library, also released v2.0.0-rc.2 to support [artifacts-spec v1.0.0-rc.2](https://github.com/oras-project/artifacts-spec/releases/tag/v1.0.0-rc.2) and provides new functions to enable developers to build your own OCI client tool.

As cloud native development continues to grow, we have seen increased community interest in evolving registries to natively store, pull, copy, and discover a graph of supply chain artifacts. Artifact references are important for many use cases such as adding Software Bill of Materials (SBoM), security scan results, and container image signing. 

This blog will demonstrate how to use ORAS v0.14 to copy an image from a validated artifact registry to personal conintainer registry, then attach a SBOM to it and discover the graph.


## Install ORAS 0.14

Install the latest release of ORAS on a Linux machine:

```
curl -LO https://github.com/oras-project/oras/releases/download/v0.14.1/oras_0.14.1_linux_amd64.tar.gz
mkdir -p oras-install/
tar -zxf oras_0.14.1_*.tar.gz -C oras-install/
mv oras-install/oras /usr/local/bin/
rm -rf oras_0.14.1_*.tar.gz oras-install/
```

> Note: You can also refer to the [installation guide](https://oras.land/cli/) for other different platforms.

## Copy an image from Registry A to Registry B

In this demo, assume all images are validated in MAR, so I will use ORAS to copy the container image from Microsoft Artifact Registry (MAR) to my personal repository of Docker Hub. You can use your prefered container registry with ORAS.

```
oras copy mcr.microsoft.com/mmlspark/spark2.4:1.0.0 registry-1.docker.io/pengfeizhou/spark2.4:1.0.0
```

> Note: There is a [known issue](https://github.com/oras-project/oras/issues/542) of using the DockerHub host name. You will be able to use `docker.io` directly in ORAS 0.15. 

## Using SBOM Tool to generate a SBOM

[SBOM Tool](https://github.com/microsoft/sbom-tool) is a general purpose, enterprise-proven, build-time SBOM generator open-sourced by Microsoft. You can use SBOM Tool to create SPDX 2.2 compatible SBOMs for any variety of artifacts. 

Install SBOM Tool on a Linux machine:

```
curl -Lo sbom-tool https://github.com/microsoft/sbom-tool/releases/latest/download/sbom-tool-linux-x64
chmod +x sbom-tool
```

Generate a SBOM for the Spark image stored in Docker Hub:

```
sbom-tool generate -di registry-1.docker.io/pengfeizhou/spark2.4:1.0.0 -b ./foo -pn bar -pv 0.1 -bc ./foo -ps MyCompany -nsb http://mycompany.com
```

## Attach the SBOM to this image

Attach the generate SBOM to this Spark image stored in Docker Hub:

```
oras attach registry-1.docker.io/pengfeizhou/spark2.4:1.0.0 foo/_manifest/spdx_2.2/manifest.spdx.json --artifact-type example/sbom
```

## View the graph of artifacts

A linked graph of supply chain artifacts can be viewed through the ORAS discovery command:

```
oras discover registry-1.docker.io/pengfeizhou/spark2.4:1.0.0 -o tree
```

## ORAS Present and Future

ORAS has been integrated and adopted by some industry-leading ISVs and projects, such as [soci-snapshotter](https://github.com/awslabs/soci-snapshotter) by AWS, [KubeApps](https://github.com/vmware-tanzu/kubeapps) by VMware Tanzu, [UOR Framework](https://universalreference.io/) by Red Hat etc. 

TBD: Introduce ORAS 0.15 and future milestones.

## Join the ORAS community
 
The ORAS Project was accepted in June 2021 as a Cloud Native Computing Foundation (CNCF) Sandbox project. It is important that we hear from the community as we advance the artifact-spec capability; if you maintain or are implementing a container registry, we are particularly [interested in your feedback](https://github.com/oras-project/artifacts-spec#community). Working together, we can improve supply chain artifact security in the cloud native ecosystem. 
