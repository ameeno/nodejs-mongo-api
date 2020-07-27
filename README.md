## Simple API With NodeJS

NodeJS Simple API built on Node+Express With MongoDB

This API responds to POST requests at http://<IP>/app with a user \_id & timestamp.
These timestamps are stored in a persistent MongoDB Database.
IP addresses & User Id's can be retrieved via HTML, by making a GET request.

(You can use your web browser for this to see all POST's)
simply point your browser to http://<IP>/app as a get request. The data will be displayed.

# Scalability.

This project is deployed on Kubernetes using the included YAML & Secret files.

I have included the .env file for port/DB name details. There is load balancing on the Database & The Node microservices., provided by Kubernetes.

# Development process

The project was built using first, Developing API & mongo on Localhost with Windows 10 and Windows Subsystem for Linux (20.04 Ubuntu).

This was done via a simple Node + Express + MongoDB Install and getting the API to work.

- Next I containerised the app locally in Docker.
- Next I split the app up Using Docker compose and environmental variables.
- Next I created a Dokerfile of the node API container and created an image which was pushed to Docker Hub under ameeno/node-Kubernetes.
- Next I used Kompose convert to create Kubernetes Configurations, which was tested on a local Kubernetes Cluster.

There is load balancing and scalability on both the API and the Database, however as the Database uses persistent storage, it could benefit from Queuing to avoid Database Locking.

## Deployment Process Simplified.

There is a Kubernetes-k8s-YAML folder which contains the K8S configuration.
There is a script included to create the cluster in any location called "kubectl.sh"

The Repository can be cloned in any location and running kubectl.sh with the included YAML files in the project directory will launch the cluster.

The relied upon docker images are in docker hub as public.
I will plan a short update tomorrow to deploy the Kubernetes cluster with ansible.
