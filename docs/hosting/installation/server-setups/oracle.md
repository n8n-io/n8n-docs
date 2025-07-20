---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
---

# Hosting n8n on Oracle

This hosting guide shows you how to self-host n8n on Oracle Cloud. It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Prerequisites

You need [The Oracle command line tool](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm){:target="_blank" .external-link}

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Hosting options

Oracle Cloud Infrastructure - OCI offers several ways suitable for hosting n8n, including OCI Container Instances (optimized for running containers), Oracle Compute, and Oracle Kubernetes Engine (containers running with Kubernetes).

This guide uses the Oracle Kubernetes Engine (OKE) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

The steps in this guide use a mix of the Oracle Cloud Console and command line tool, but you can use either to accomplish these tasks.

## Create a cluster

From [the Oracle Cloud Console](https://cloud.oracle.com/){:target="_blank" .external-link} select **Developer services**.

Under the Developer services page, select **Kubernetes Clusters(OKE)** > **Create Cluster**.

You can select any of the configuration options that suit your needs, then select **Create Cluster** when done.
[Creating OKE Cluster](https://docs.oracle.com/en-us/iaas/Content/ContEng/Tasks/create-cluster.htm){:target="_blank" .external-link}

## Set Kubectl context

The remainder of the steps in this guide require you to set the Oracle Kubernetes Enginer cluster as the Kubectl context. You can find the connection details for a cluster instance by opening its details page and then the **Access Cluster** button. The resulting code snippets shows the steps to paste and run into a terminal to change your local Kubernetes settings to use the new cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting/tree/oracle){:target=_blank .external-link}. The following steps tell you which file configures what and what you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting.git -b oracle
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-kubernetes-hosting
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default OCI storage class, [oci-bv](https://docs.oracle.com/en-us/iaas/Content/ContEng/Tasks/contengcreatingpersistentvolumeclaim_topic-Provisioning_PVCs_on_BV.htm#Provisioning_Persistent_Volume_Claims_on_the_Block_Volume_Service){:target=_blank .external-link}, is suitable for this purpose. This is defined in the `postgres-claaim0-persistentvolumeclaim.yaml` manifest.

```yaml
…
spec:
  storageClassName: "oci-bv"
  accessModes:
    - ReadWriteOnce
…
```

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with your own values. Postgres will use these details when creating the database..

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes is required for:

* Using nodes that interact with files, such as the binary data node.
* If you want to persist [manual n8n encryption keys](/hosting/configuration/environment-variables/deployment.md) between restarts. This saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

```yaml
…
spec:
  storageClassName: "oci-bv"
  accessModes:
    - ReadWriteOnce
…
```

```yaml
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

### Pod resources

[Kubernetes lets you](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/){:target="_blank" .external-link} optionally specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

```yaml
…
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
…    
```

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

--8<-- "_snippets/self-hosting/installation/suggested-pod-resources.md"

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](/hosting/configuration/environment-variables/index.md) for n8n environment variables details.

## Deployments

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits with the `resources` object
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

## Services

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively.

## Send to Kubernetes cluster

Send all the manifests to the cluster with the following command:

```shell
kubectl apply -f .
```

/// note | Namespace error
You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

```shell
kubectl apply -f namespace.yaml
```
///


## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the n8n service. Find the IP address of the n8n service loadbalancer using following command, you will find a service with name n8n.

```shell
kubectl get svc -n n8n
```

## Delete resources

Remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
