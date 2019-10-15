# Moyklass Lesson Backend

### Require
* NodeJS version >= 10
* PostgresSQL

### Install
1. `git clone` this repo
2. `npm install`
3. configure yamls in `config` dir
4. make DB `moyklass`
5. migrate with `npm run migrate`

### Run
Environments:
* development: `npm run development` (with nodemon mode || `npm run startDev` without nodemon)
* staging:
    - for CI: NODE_ENV=staging NODE_PATH=./build
    - make dir `build`
    - `npm run build` || `npm run buildWin`
    - `npm run staging` || `npm run stagingWin`
* production:
    - for CI: NODE_ENV=production NODE_PATH=./build
    - make dir `build`
    - `npm run build` || `npm run buildWin`
    - `npm run production` || `npm run productionWin`

### Usage
Development. Server running on 127.0.0.1:8000/ - redirect to `/api/docs`

### Docs
* Swagger docs at `/api/docs`

### Tests
Need mocha globally.
1. Start development server
2. `npm run testDev`
