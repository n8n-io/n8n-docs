# Credentials file

The credentials file defines the authorization methods for the node. The settings in this file affect what n8n displays in the **Credentials** modal.



## Structure of the credentials file



## Parameters

### properties

Object. Contains objects that tell n8n how to inject the authentication data as part of the API request. Options are:

[TODO: is this true? Or are properties the metadata? Am not seeing auth in our examples either. And qs is in authenticate not properties]

#### auth

```js
  auth?: {
      username: string;
      password: string;
  };
```

#### body

Object. Can contain nested objects.

#### header

Object.

#### qs

Object. Stands for "query string."