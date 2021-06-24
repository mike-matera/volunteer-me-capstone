# Capstone Project for National University 

Here's how you get ready to develop. 

## Install and Setup the Required Software for Windows 

In order to use the full development mode you have to use Docker and WSL2 on Windows. Follow these instructions to install Ubuntu on Windows using WSL2 

1. [Install Ubuntu using WSL2](https://ubuntu.com/tutorials/ubuntu-on-windows#1-overview)

    Note: If you already have Ubuntu installed using WSL1 do this to upgrade:

    1. Stop all Ubuntu terminals 
    1. Set the default WSL version: 

        ```
        PS> wsl --set-default-version 2
        PS> wsl --set-version Ubuntu-20.04 2
        ```

1. [Docker Desktop](https://docs.docker.com/docker-for-windows/install/)

    Note: After installation update Docker Desktop's settings as described in this article about [Docker Desktop WSL 2 backen](https://docs.docker.com/docker-for-windows/wsl/). The important parts are: 

    1. Enable the WSL2 backend for Docker
    1. Enable WSL integration for Ubuntu 20.04

1. [Install vscode](https://code.visualstudio.com/download) for Windows. 

1. Install the [Remote WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension in vscode. 

    Notes: Follow the instructions in the Remote WSL page to create a connection from vscode into your Ubuntu instance. If you do that you should see the `Clone Repository` button. 

1. Clone your GitHub repository into your vscode instance. 

1. Set Mike's repository as a remote so you can pull in changes to the `main` branch. These command should be run from within the project directory: 

    ```
    $ git remote add mike https://github.com/mike-matera/volunteer-me-capstone.git
    $ git fetch mike
    ```

1. Install the latest version of Node on your Ubuntu. 

    ```
    $ curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    $ sudo apt install -y nodejs yarn
    $ sudo npm install --global yarn
    ```    

## Setup Tasks 

If you've completed the previous section you're ready to code. However, some tasks must be run every time you clone a new repository or you pull in new changes. 

1. Check for any package updates: 

    ```
    $ yarn install 
    ``` 

1. *Optional:* Reset the Database. If there is an upstream schema change you must reset your schema and all the data. You can do this anytime when you want to reset your database and you **must** do it the first time you create your repository:

    ```
    $ npm run initdb
    ```

## Run the Development Server 

Run this command to start the dev server:

```
$ npm run dev
```

The developent server is accessible from the URL:

> http://localhost:3000

## Getting the Latest Upstream Changes 

When a pull request is applied an the upstream repository is updated run this command from your source directory to pull in the latest changes:

```
$ git pull mike main 
``` 

> This will fail if you have uncommitted local changes! 

There are two options if you have work that you would like to save:

1. Commit your changes if they're ready. If not finish your changes and commit them. 
1. Stash your changes and try to apply them onto the new code. 

    ```
    $ git stash 
    $ git pull mike main 
    $ git stash pop 
    ```

## Deployment to AWS 

This guide has the steps for deploying the application to AWS EKS. 

### Before you Begin 

You must have the follwoing tools isntalled:

- The [aws CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Amazon's [eksctl](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [helm](https://helm.sh/docs/intro/install/)

Verify that `aws` is connected to your account:

```
$ aws iam get-user
{
    "User": {
        "Path": "/",
        "UserName": "yourname",
        "UserId": "XXXXXXXXXXXXXXXXXXXXX",
        "Arn": "arn:aws:iam::XXXXXXXXXXXX:user/yourname",
        "CreateDate": "2020-01-22T15:46:02Z",
        "PasswordLastUsed": "2021-06-17T17:57:50Z"
    }
}
```

### Create a EKS Cluster 

These instructions are adapted from the [creating and managing EKS clusters](https://eksctl.io/usage/creating-and-managing-clusters/) documentation.

> NOTE: Set your default region and match the region in `helm/aws-cluster.yaml`

```
$ eksctl create cluster -f aws-cluster.yaml
```

This will take a while. It configures the `kubectl` command so once it's complete you should be able to run:

```
$ kubectl get all 
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.100.0.1   <none>        443/TCP   16m
```

### Install the AWS Load Balancer Controller 

Follow the instructions on the [AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html) page. The controller monitors your Kubernetes deployments for `LoadBalancer` services and `Ingress` types. When it finds them it allocates an AWS Application Load Balancer (alb) for your application. The controller is installed using `helm`.

I used custom values to reduce the replica count: 

```
helm install -n kube-system \
    aws-load-balancer-controller eks/aws-load-balancer-controller \
    -f values-aws-load-balancer-controller.yaml
```

Verify the controller is running using the command:

```
$ kubectl get deployment -n kube-system aws-load-balancer-controller
NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
aws-load-balancer-controller   2/2     2            0           46s
```

### (Optional) Connect the Load Balancer Controller to a Route 53 Hosted Zone 

If you want Kubernetes to automatically update your DNS records with deployed apps use the [Bitnami External DNS chart](https://github.com/bitnami/charts/). In AWS you have to authorize your cluster to do this work: 

I created this policy: 

```
$ aws iam create-policy --policy-name update-route53-managed-zones --policy-document file://route53-policy.json
```

And I created this service account: 

```
eksctl create iamserviceaccount \
    --name route53-updater \
    --namespace kube-system \
    --cluster volunteerme \
    --attach-policy-arn arn:aws:iam::XXXXXXXXXXXX:policy/update-route53-managed-zones \
    --approve \
    --override-existing-serviceaccounts
```

Then I installed the helm chart: 

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm search repo bitnami
$ helm install external-dns bitnami/external-dns --values values-external-dns.yaml -n kube-system
```

### Deploy the Application 

Use the values and the secret override values to deploy. 

```
$ helm install volme volunteerme/ --values values-aws.yaml --values secrets/secrets-aws.yaml
```


