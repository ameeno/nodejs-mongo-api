# Ansible Multi-Node deployment instructions

these instructions aim to simplify multi-node deployment.

These nodes can be in different geographical locations and different cloud providers.

The only requirements are:
ubuntu OS + SSH keys accepting root logins.

## Intial setup & requirements

Due to differences in different cloud providers api's and for additional flexibility, You should create your VM/Servers from the cloud providers web gui or cli with credentials.
Please ensure you use a modern Ubuntu OS and put your SSH public key in the Authorized key's of each machine (Setup varies for each provider).

You can spread your nodes across regions.

- You should be able to login as root to each of the nodes using the included id_rsa and id_rsa.pub.

` These files are included for your convenience, but you should _ALWAYS_ generate your own SSH Keys.

### (how to generate your own keyfiles)

Key files can be generated on most operating systems using ssh-keygen
you can place your key files into your home folder (~)/.ssh/id_rsa or specify connection via a different key file using paegent on windows or openssh on mac/\*nix

## Deployment instructions

1.  In the hosts file of this folder, modify ensure the `master_ip` and `worker_n_ips` to addresses for your slave nodes.

    Once this is setup you can use the command:
    `ansible-playbook -i hosts ./kube-cluster/initial.yml`

    to connect and initially setup ansible and its workers, and setup initial python/ansible environments.
    on each node. This includes Ansible, Python & setup up sudo access for the ubuntu user without requiring user input for password.

2.  next run `ansible-playbook -i hosts ./kube-cluster/kube-dependencies.yml`
    this will install all the dependencies for your Kubernetes Cluster in each of the nodes.
    This includes deps such as docker and kubernetes and other requirements.

3.  execute: `ansible-playbook -i hosts ./kube-cluster/master.yml` to setup your master node with your Kube Cluster master settings.
    You can verify this by:
    SSH into your master node using ssh ubuntu@Master_ip
    and execute kubectl get nodes

        You should see:
        NAME      STATUS    ROLES     AGE       VERSION
        master    Ready     master    1d        v1.14.0

        This verifies your Master node is setup correctly.

4.  now exit out of the ssh session with Master and return to your workspace.
    From there execute
    `ansible-playbook -i hosts ./kube-cluster/workers.yml` This will setup your workers.

This can be verified by SSH'ing back into your master node and running kubectl get nodes once again.

        You should see:
            Output
            NAME      STATUS    ROLES     AGE       VERSION
            master    Ready     master    1d        v1.14.0
            worker1   Ready     <none>    1d        v1.14.0
            worker2   Ready     <none>    1d        v1.14.0

This verifies the master and slave nodes have completed clustering.
From inside the master node, you can git clone this repository (`git clone git://github.com/ameeno/nodejs-mongo-api ~/nodejs-mongo-api`)
and then do `cd ~/nodejs-mongo-api/Kubernetes-k8s/yaml && chmod+x *.sh* && ./kubectl.sh && ./autoscale.sh`

This will bring up the project into your cluster and enable autoscaling on 50% CPU usage for each element.

## Simplified instructions

1. create master & worker nodes with Authorized SSH Keys (Ubuntu)

2. setup ip`s correctly in hosts file

3. execute the following commands in order

>      ansible-playbook -i hosts ./kube-cluster/initial.yml
>      ansible-playbook -i hosts ./kube-cluster/kube-dependencies.yml
>      ansible-playbook -i hosts ./kube-cluster/master.yml
>      ansible-playbook -i hosts ./kube-cluster/workers.yml

4.  SSH into your master node with SSH ubuntu@master_ip

5.  Execute the following commands in order

> `git clone git://github.com/ameeno/nodejs-mongo-api ~/nodejs-mongo-api cd ~/nodejs-mongo-api/Kubernetes-k8s/yaml && chmod+x *.sh* && ./kubectl.sh && ./>autoscale.sh`

to bring up your cluster.

## Automatic deployment

If your SSH keys and ip's are correctly setup hosts file,
simply run:

> `chmod+x deploy-ansible.sh && ./deploy-ansible.sh`

in this folder to do everything for you. (added a playbook called start-api.yml to do the git pull and launch on cluster.)
