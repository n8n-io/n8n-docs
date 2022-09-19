# Hosting n8n on Amazon Web Services

This hosting guide shows you how to self-host n8n with Amazon Web Services (AWS). It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Hosting options

AWS offers several ways suitable for hosting n8n, including EC2 (virtual machines), and EKS (containers running with Kubernetes).

This guide uses EKS as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

## Prerequisites

The steps in this guide use a mix of the AWS UI and [the eksctl CLI tool for EKS](https://eksctl.io).

While not mentioned in the documentation for eksctl, you also need to [install the AWS CLI tool](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), and [configure authentication of the tool](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Create a cluster

Use the eksctl tool to create a cluster specifying a name and a region with the following command:

```shell
eksctl create cluster --name n8n --region eu-central-1
```

This can take a while to create the cluster.

!!! note "AWS Fargate"
    Fargate, AWS's serverless container management system is not compatible with n8n.

Once the cluster is created, eksctl automatically sets the kubectl context to the cluster.

## Setup DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to a static address of the instance.

To find the address of the n8n service running on the instance, first open the **Clusters** section of the **EKS** service page in the AWS console.

Click the name of the cluster to open its configuration page.

Click the **Resources** tab and the **Services** sub-menu of the **Service and networking** page.

Click the **n8n** service and copy the **Load balancer URLs** value. Use this value suffixed with the n8n service port (5678) for DNS.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting/tree/gcp){:target=_blank .external-link} locally. The following steps will tell you which file configures what and what you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting/tree/aws
```

And change directory to the root of the repository you cloned:

```shell
cd aws
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default AWS storage class, "[gp2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/general-purpose.html#EBSVolumeTypes_gp2)" is suitable for this purpose and is defined in the `postgres-claaim0-persistentvolumeclaim.yaml` manifest.

```yaml
…
spec:
  storageClassName: gp2
  accessModes:
    - ReadWriteOnce
…
```

### Environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with values of your own for user details and the database to use.

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

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

Remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```