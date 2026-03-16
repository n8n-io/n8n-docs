---
contentType: tutorial
---

# Hosting n8n on Amazon Web Services

This hosting guide shows you how to self-host n8n with Amazon Web Services (AWS). It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Hosting options

AWS offers several ways suitable for hosting n8n, including EC2 (virtual machines), and EKS (containers running with Kubernetes).

This guide uses [EKS](https://aws.amazon.com/eks/) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

## Prerequisites

The steps in this guide use a mix of the AWS UI and [the eksctl CLI tool for EKS](https://eksctl.io).

While not mentioned in the documentation for eksctl, you also need to [install the AWS CLI tool](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), and [configure authentication of the tool](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Create a cluster

Use the eksctl tool to create a cluster specifying a name and a region with the following command:

```shell
eksctl create cluster --name n8n --region <your-aws-region>
```

This can take a while to create the cluster.


Once the cluster is created, eksctl automatically sets the kubectl context to the cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-hosting). The following steps tell you what each file does, and what settings you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-hosting.git 
```

And change directory:

```shell
cd n8n-hosting/kubernetes
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default AWS storage class, [gp3](https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#gp3-ebs-volume-type), is suitable for this purpose. This is defined in the `postgres-claim0-persistentvolumeclaim.yaml` manifest.


```yaml
…
spec:
  storageClassName: gp3
  accessModes:
    - ReadWriteOnce
…
```

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with values of your own for user details and the database to use.

PostgreSQL uses a root user (`POSTGRES_USER`) for setup and administration, but it’s best practice to create a separate non-root user (`POSTGRES_NON_ROOT_USER`) for n8n. The root user has full control, while n8n only needs the non-root user permissions to run. Configuring both improves security and helps prevent accidental changes to the database system.

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes helps maintain files uploaded while using n8n and if you want to persist [manual n8n encryption keys](/hosting/configuration/environment-variables/deployment.md) between restarts, which saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

```yaml
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

### Pod resources

[Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) lets you specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

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
- Set resource consumption limits
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

## Services

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively by default.

## Send to Kubernetes cluster

Send all the manifests to the cluster by running the following command in the `n8n-kubernetes-hosting` directory:

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

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to a static address of the instance.

To find the address of the n8n service running on the instance:

1. Open the **Clusters** section of the **Amazon Elastic Kubernetes Service** page in the AWS console.
2. Select the name of the cluster to open its configuration page.
3. Select the **Resources** tab, then **Service and networking** > **Services**.
4. Select the **n8n** service and copy the **Load balancer URLs** value. Use this value suffixed with the n8n service port (5678) for DNS.

/// note | Use HTTP
This guide uses HTTP connections for the services it defines, for example in `n8n-deployment.yaml`. However, if you click the **Load balancer URLs** value, EKS takes you to an "HTTPS" URL which results in an error. To solve this, when you open the n8n subdomain, make sure to use HTTP.
///
## Delete resources

If you need to delete the setup, you can remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
