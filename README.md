How to set Port
```
export PORT=5000
```

How to set NODE_ENV
```
export NODE_ENV=production
```

Setup conditional variable Prod or Dev
- instal config package
- create `config` folder in the root folder
- create `development.json`, `production.json`, and `default.json`
- how to access?

``` js
const config = require('config');
config.get('name')
config.get('mail.host')
```

Password configuration
- set env_variable `export app_password=1234`
- create `custom-environment-variables.json` file in the config folder
- type this snippet
```json
{
  "mail": {
    "password": "app_password"
  }
}
```
- call it from js using `config.get('mail.password')`