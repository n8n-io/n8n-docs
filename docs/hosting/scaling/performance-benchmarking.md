---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n performance and resource consumption benchmarking.
contentType: explanation
---

# Performance and benchmarking

n8n can handle many workflow executions per second on a single instance, with the ability to scale up further by adding more instances.

This document outlines n8n's performance benchmarking. It describes the factors that affect performance and includes information on how to use the n8n benchmarking framework.

## Performance factors

The performance of n8n depends on factors including: 

* The workflow type
* The resources available to n8n
* How you configure n8n's scaling options

## Run your own benchmarking

To get an accurate estimate for your use case, run n8n's [benchmarking framework](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/benchmark){:target=_blank .external-link}.

The framework allows you to connect to a running n8n instance and generate performance data by executing workflows in various configurations.

See the [benchmarking README](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/benchmark#n8n-benchmarking-tool) for more information about using the framework.

### An example benchmark run 

To understand how the benchmark works, benchmark a local [n8n instance in Docker](/hosting/installation/docker/).

Create a Docker network to connect the n8n instance and the benchmark:

```shell
docker network create n8n-net
```

Create a data volume if this is a new instance and start the container using the network and volume:

```shell
docker volume create n8n_data
docker run -it --rm --name my-n8n \
	--network n8n-net \
	-p 5678:5678 \
	-v n8n_data:/home/node/.n8n \
	docker.n8n.io/n8nio/n8n
```

Sign into the instance to create a new user if necessary.

Run the benchmark by connecting to your n8n instance. Use the same Docker network and refer to the running instance by name in the `--n8nBaseUrl` parameter:

```shell
docker run --network n8n-net ghcr.io/n8n-io/n8n-benchmark:latest run \
	--n8nBaseUrl=http://my-n8n:5678 \
	--n8nUserEmail=InstanceOwner@email.com \
	--n8nUserPassword=InstanceOwnerPassword \
	--vus=5 \
	--duration=1m \
	--scenarioFilter=single-webhook
```

The benchmark framework will connect to the n8n instance to execute workflows according to the benchmark scenarios you enable.

/// info | Not representative performance data
The results below show a single scenario running on consumer hardware with a basic, unoptimized configuration. The benchmark repository contains other [scenarios](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/benchmark/scenarios) and [n8n setups](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/benchmark/scripts/n8n-setups) to test other configurations and behavior.
///

After the tests run for the specified duration, the results display:

```
Waiting for n8n http://my-n8n:5678 to become online
Setting up owner
Owner already set up
Running scenario: Unnamed-SingleWebhook
Loading and importing data
Executing scenario script
     ✓ is status 200

     checks.........................: 100.00% ✓ 385      ✗ 0  
     data_received..................: 104 kB  1.7 kB/s
     data_sent......................: 37 kB   609 B/s
     http_req_blocked...............: avg=23.14µs  min=3.75µs  med=7.69µs   max=1.2ms    p(90)=10.14µs  p(95)=11.24µs 
     http_req_connecting............: avg=3.15µs   min=0s      med=0s       max=279.01µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=787.87ms min=43.2ms  med=801.98ms max=951.17ms p(90)=865.17ms p(95)=883.09ms
       { expected_response:true }...: avg=787.87ms min=43.2ms  med=801.98ms max=951.17ms p(90)=865.17ms p(95)=883.09ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 385
     http_req_receiving.............: avg=124.89µs min=41.14µs med=125.17µs max=657.93µs p(90)=173.03µs p(95)=187.17µs
     http_req_sending...............: avg=27.86µs  min=11.4µs  med=25.18µs  max=181.32µs p(90)=34.87µs  p(95)=42.79µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=787.72ms min=42.85ms med=801.8ms  max=950.95ms p(90)=865.04ms p(95)=882.93ms
     http_reqs......................: 385     6.338951/s
     iteration_duration.............: avg=788.14ms min=45.13ms med=802.25ms max=951.52ms p(90)=865.37ms p(95)=883.34ms
     iterations.....................: 385     6.338951/s
     vus............................: 5       min=5      max=5
     vus_max........................: 5       min=5      max=5
```

The `http_reqs` and `iterations` results are often helpful to get a general sense of performance.

The benchmark framework marks the workflows as active when it loads them for testing. You can disable or delete them when you finish benchmarking.
