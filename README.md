# OTNode Boilerplate

<div align="center">
![otn](https://img.shields.io/badge/OTNode-v0.0.0-blueviolet)
</div>

<div align="center">
![node](https://img.shields.io/badge/node->=14.15.1-brightgreen?logo=node.js&logoColor=white)
![nodemon](https://img.shields.io/badge/nodemon->=2.0.7-brightgreen?logo=nodemon&logoColor=white)
![ts](https://img.shields.io/badge/ts->=4.1.3-blue?logo=TypeScript&logoColor=white)
![eslint](https://img.shields.io/badge/eslint->=7.18.0-blue?logo=eslint)
</div>

## Use

### Install

```sh
yarn install

# or

npm install
```

### Dev server

```sh
yarn dev

# or

npm run dev
```

### Build and start

```sh
yarn build && yarn start

# or

npm run build && npm run start
```

## Env file

```env
NODE_ENV=development
PORT=3000
DEBUG=app:*,otn:*
```

## Files structure

```
src/
  |- index              # Main file
  |- server/
    |- index            # Main server file
  |- utils/
    |- config           # Config env file
  |- routes/
    |- index            # Main routes files
    |- test/
      |- index          # Test default routes to dev
```