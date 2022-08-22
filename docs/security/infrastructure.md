---
title: Infrastructure for Infor Cloud and on Premise
description: A visual representation of the Infrastructure that is used for our applications when running Infor Cloud or On-Prem
tags:
  - DOC²
  - Infrastructure
  - Infor
---

# Application Infrastructure


### Open ports
* 443

### Communication with the Database
Kubernetes and our Databases are inside the same VPC. We only access the database via the local IP, this way the transferred data never leaves the local network.
Additionally, we only use SSL secured connections to communicate with the database.

### Spaces
The uploaded documents are stored in a Space. The trafic is secured via ssl and multiple keys are required to access the stored files.

### Traffic Security
We only allow https secured connections to communicate with our servers. This ensures that the transferred data is encrypted and secure. 

## Cloud Infor
![cloud-infor](/_images/security/infra-cloud.png)



## On-Prem Infor
With our On-Prem solution, you don't have to open any ports. This ensures that the security of your network is not compromised. 
![on-prem-infor](/_images/security/infra-on-prem.png)