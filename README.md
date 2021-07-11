# Notes

```js
const url = serverlessApiDomain + `/auth` +
  `?redirect_domain=${encodeURIComponent("*.vighnesh153.com")}` + 
  `&redirect_path=${encodeURIComponent("/")}` +
  `&secure_redirect=true`;      // http or https
```

### Todo
* Automatically use the latest layer version in lambda
* Admin pages (only for admins):
    - /admin        ( home page )
    - /admin/users    (actions: ban/unban)
    - /admin/audits
