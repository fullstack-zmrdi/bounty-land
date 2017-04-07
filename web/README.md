# tgm.com

[![Greenkeeper badge](https://badges.greenkeeper.io/tgmproject/tgm-frontend.svg?token=9073b17036e3f9cf61a98e1ee76690f161edd84057699800f1aadd6cf0da65dd)](https://greenkeeper.io/)
[![buddy pipeline](https://app.buddy.works/tgmproject/tgm-frontend/pipelines/pipeline/43475/badge.svg?token=15b29c0ec68692fe12b8343969e56d4ab215737cf15f95cc95aa28202d8797de "buddy pipeline")](https://app.buddy.works/tgmproject/tgm-frontend/pipelines/pipeline/43475)
[![buddy pipeline](https://app.buddy.works/tgmproject/tgm-frontend/pipelines/pipeline/43476/badge.svg?token=15b29c0ec68692fe12b8343969e56d4ab215737cf15f95cc95aa28202d8797de "buddy pipeline")](https://app.buddy.works/tgmproject/tgm-frontend/pipelines/pipeline/43476)

## Prerequisites

Node >= 7.6.0

## Install
```
cp .env.example .env 
yarn i
```

## Run

For development:
```
yarn start
```

## local development domain

In order for facebook login to work on your local machine, you need to add:
```
127.0.0.1	local.tgmproject.xyz
```

to your `/etc/hosts` file

For production:
```
NODE_ENV=production yarn build && yarn start
```