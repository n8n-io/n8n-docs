# Hosting n8n on Scaleway

This hosting guide shows you how to self-host n8n with Scaleway. It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

## Hosting options

Scaleway offers several ways suitable for hosting n8n, including Instances (virtual machines), and Kapsule (containers running with Kubernetes).

This guide uses [Kapsule](https://www.scaleway.com/en/kubernetes-kapsule/){:target=_blank .external-link} as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

## Prerequisites

The steps in this guide uses [the Scaleway CLI tool](https://github.com/scaleway/scaleway-cli#installation){:target=_blank .external-link} and assumes that you are authenticated with the tool (see [Setup my configuration](https://github.com/scaleway/scaleway-cli#setup-your-configuration)).

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## Create a cluster

Use the `scw` tool to create a cluster specifying a name, the version of Kubernetes to use, and the size/type of the cluster with the following command:

```shell
scw k8s cluster create name=n8n version=1.26.2 pools.0.size=1 pools.0.node-type=DEV1-M pools.0.name=default --wait
```

This can take a while to create the cluster.

Once the cluster is created, you can set the kubectl context to the cluster using `scw k8s kubeconfig install <cluster-id>` with the ID returned by the previous command.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-kubernetes-hosting){:target=_blank .external-link}. The following steps tell you what each file does, and what settings you need to change.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-kubernetes-hosting.git
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-kubernetes-hosting
```

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. This is defined in the `postgres-claaim0-persistentvolumeclaim.yaml` manifest.

### Environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with values of your own for user details and the database to use.

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

## Configure n8n

### Create a volume for file storage

While not essential for running n8n, using persistent volumes helps maintain files uploaded while using n8n and if you want to persist [manual n8n encryption keys](https://docs.n8n.io/hosting/configuration/#encryption-key) between restarts, which saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

### Pod resources

[Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/){:target=_blank .external-link} lets you specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

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

- **Start**: 320mb RAM, 10 millicore CPU burstable
- **Pro**: 640mb RAM, 20 millicore CPU burstable
- **Power**: 1280mb RAM, 80 millicore CPU burstable

Be sure to use the right Kapsule offer for your needs. The [Scaleway Consule](https://console.scaleway.com/kubernetes/clusters/create){:target=_blank .external-link} has details on the different offers.

### Environment variables

n8n needs some environment variables set to pass to the application running in the containers.

The example `n8n-secret.yaml` file contains placeholders you need to replace with values of your own for authentication details.

Refer to [Environment variables](/hosting/environment-variables/environment-variables/) for n8n environment variables details.

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

!!! note "Namespace error"
    You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

    ```shell
    kubectl apply -f namespace.yaml
    ```

## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to a static address of the instance.

To find the address of the n8n service running on the instance, run the following command:

```shell
kubectl -n=n8n get services
```

The output should look similar to the following:

```shell
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
n8n                LoadBalancer   10.42.134.204   51.158.58.179   5678:32623/TCP   7m42s
postgres-service   ClusterIP      None            <none>          5432/TCP         7m44s
```

The `EXTERNAL-IP` value is the address you need to use for the DNS record. In the example above, the address is `51.158.58.179`.

## Delete resources

If you need to delete the setup, you can remove the resources created by the manifests with the following command:

```shell
kubectl delete -f .
```

And delete the cluster with the following command:

```shell
scw k8s cluster delete <cluster-id>
```

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
