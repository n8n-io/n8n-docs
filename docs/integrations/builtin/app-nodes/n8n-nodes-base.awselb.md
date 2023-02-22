# AWS Elastic Load Balancing

[AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/){:target=_blank .external-link} (ELB) automatically distributes incoming application traffic across multiple targets and virtual appliances in one or more Availability Zones (AZs).

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/aws/).

## Operations

* Listener Certificate
	* Add
	* Get Many
	* Remove
* Load Balancer
	* Create
	* Delete
	* Get
	* Get Many

This node supports creating and managing application and network load balancers. It doesn't currently support gateway load balancers.

## Related resources

Refer to [AWS ELB's documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html){:target=_blank .external-link} for more information on this service.

View [example workflows and related content](https://n8n.io/integrations/aws-elb/){:target=_blank .external-link} on n8n's website.
