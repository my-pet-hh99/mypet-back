# mypet-back

## [API 명세](./doc/API명세서.md)

## Directory Structure
```cmd
root
├─doc
├─node_modules
├─src
└─┐config
  ├─layers
  │  ├─controllers
  │  ├─repositories
  │  ├─routers
  │  └─services
  ├─middlewares
  ├─migrations
  ├─models
  ├─modules
  └─seeders
```

## package
```json
  "dependencies": {
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.3.3",
    "nodemon": "^2.0.19",
    "sequelize": "^6.21.3"
  },
  "devDependencies": {
    "prettier": "2.7.1",
    "sequelize-cli": "^6.4.1"
  }
  ```
