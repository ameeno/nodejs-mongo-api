#!/usr/bin/env bash
kubectl create -f nodejs-service.yaml,nodejs-deployment.yaml,env-configmap.yaml,db-service.yaml,db-deployment.yaml,dbdata-persistentvolumeclaim.yaml,secret.yaml