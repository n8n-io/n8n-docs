---
title: User accounts, authentication, and authorization
description: n8n user accounts
---

# User accounts, authentication, and authorization

## n8n Cloud

When you sign up for an n8n cloud account, you create an account directly with n8n. 

When you create an account on n8n.cloud with a username and password, n8n implements best account security practices. For example, n8n salts and hashes your password, then stores the hashed password in a database which is encrypted at rest.

## Self-hosted

n8n salts and hashes the passwords of self-hosted users on account creation. However, encrypting other data at rest is the responsibility of the user.


