## Using header auth

Use this generic authentication if your app or service supports header authentication.

To configure this credential, enter:

- The header **Name** you need to pass to the app or service your HTTP request is targeting
- The **Value** for the header 

Read more about [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#authentication){:target=_blank .external-link}.

/// note | Credential data can vary
The credential data required for header auth credentials depends on the type used. For example, if you need to provide an `Authorization: Bearer <token>` header, the credential data `Name` will be `Authorization` and the `Value` will be `Bearer <token>`.
///		
