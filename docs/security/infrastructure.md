---
title: Infrastructure
description: A visual representation of the Infrastructure that is used for our applications
tags:
  - DOC²
  - Infrastructure
---

# Application Infrastructure


### Open ports
* 443

### Comunication with the Database
Kubernetes and our Databases are inside the same VPC. We only access the database via the local ip, this way the transferd data never leaves the local network.
Additionally we only use ssl secured connections to comunicate with the database.

### Digital Ocean Spaces
The uploaded documents are stored in a Digital Ocean Space. The trafic is secured via ssl and multiple keys are required to access the stored files.

### Trafic Security
We only allow https secured connections to comunicate with our Servers. This ensures that the transferd data is encrypted and secure. 

## Cloud Infor
![cloud-infor](/_images/security/infra-cloud.png)



## On Prem Infor
With our On Prem solution, you done have to open any ports. This ensures that the security of your network is not compromised. 
![on-prem-infor](/_images/security/infra-on-prem.png)