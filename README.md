# Notes

```js
const url = serverlessApiDomain + `/auth` +
  `?redirect_domain=${encodeURIComponent("*.vighnesh153.com")}` + 
  `&redirect_path=${encodeURIComponent("/")}` +
  `&secure_redirect=true`;      // http or https
```

### Todo
* Generic DATA endpoint
  - interface
  - impl
* Backend s3 bucket pre-signed url generation for upload
* Serving private content via cloudfront
  - https://medium.com/roam-and-wander/using-cloudfront-signed-urls-to-serve-private-s3-content-e7c63ee271db
