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

* Generic DATA endpoint
  - interface
  - impl
* Backend s3 bucket pre-signed url generation for upload
* Serving private content via cloudfront
  - https://medium.com/roam-and-wander/using-cloudfront-signed-urls-to-serve-private-s3-content-e7c63ee271db
