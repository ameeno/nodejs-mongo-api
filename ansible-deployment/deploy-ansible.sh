#!/usr/bin/env bash

ansible-playbook -i hosts ./kube-cluster/initial.yml
ansible-playbook -i hosts ./kube-cluster/kube-dependencies.yml
ansible-playbook -i hosts ./kube-cluster/master.yml
ansible-playbook -i hosts ./kube-cluster/workers.yml
ansible-playbook -i hosts ./kube-cluster/start-api.yml