# Hosting n8n on Azure

This hosting guide shows you how to self-host n8n on Azure. It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Prerequisites

- [The Azure command line tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli){:target="_blank" .external-link}

## Hosting options

Azure offers several ways suitable for hosting n8n, including Azure Container Instances (optimized for running containers), Linux Virtual Machines, and Azure Kubernetes Service (containers running with Kubernetes).

This guide uses the Azure Kubernetes Service (AKS) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

The steps in this guide use a mix of the Azure UI and command line tool, but you can use either to accomplish most tasks.

## Open the Azure Kubernetes Service

From [the Azure portal](https://portal.azure.com/) select **Kubernetes services**.

## Create a cluster

From the Kubernetes services page, click the **Create** button and the **Create a Kubernetes cluster** menu item.

You can select any of the configuration options that suit your need and then click the **Create** button when done.

## Set Kubectl context

The remainder of the steps in this guide require you to set the Azure instance as the Kubectl context. You can find the connection details for a cluster instance by opening its details page and then the **Connect** button. The resulting code snippets shows the steps to paste and run into a terminal to change your local Kubernetes settings to use the new cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting/tree/azure){:target=_blank .external-link} locally. The following steps will tell you which file configures what and what you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting.git -b azure
```

And change directory to the root of the repository you cloned:

```shell
cd azure
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default storage class is suitable for this purpose and is defined in the `postgres-claim0-persistentvolumeclaim.yaml` manifest.

!!! note "Specialized Storage Classes"
    If you have specialised or higher requirements for Storage Classes, [read more on the options Azure offers in the documentation](https://learn.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes){:target="_blank" .external-link}.

### Environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with values of your own for user details and the database to use.

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes helps maintain files uploaded while using n8n and if you want to persist [manual n8n encryption keys](https://docs.n8n.io/hosting/configuration/#encryption-key){:target="_blank" .external-link} between restarts, which saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

```yaml
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

### Environment variables

n8n needs some environment variables set to pass to the application running in the containers.

The example `n8n-secret.yaml` file contains placeholders you need to replace with values of your own for authentication details.

## Deployments

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits. This is left empty in the example manifests, but you should set them to something appropriate for your deployment.
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define only one instance of each pod, you should change this to meet your needs.

## Services

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively by default.

## Send to Kubernetes cluster

Send all the manifests to the cluster with the following command:

```shell
kubectl apply -f .
```

!!! note "Namespace error"
    You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

    ```shell
    kubectl apply -f namespace.yaml
    ```

## Setup DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the n8n service. Find the IP address of the n8n service from the **Services & ingresses** menu item of the cluster you want to use under the **External IP** column. You need to add the n8n port, "5678" to the URL.

!!! note "Static IP addresses with AKS"

  [Read this tutorial](https://learn.microsoft.com/en-us/azure/aks/static-ip){:target="_blank" .external-link} for more details on how to use a static IP address with AKS.

## Delete resources

Remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```