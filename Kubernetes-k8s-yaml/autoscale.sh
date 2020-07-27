#!/usr/bin/env bash
kubectl autoscale deployment nodejs --cpu-percent=50 --min=1 --max=10
kubectl autoscale deployment db --cpu-percent=50 --min=1 --max=10