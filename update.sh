#! /bin/bash

git pull
docker-compose stop rsshub
docker-compose rm rsshub
docker-compose up -d rsshub
docker-compose ps
