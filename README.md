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

1. Set Mike's repisitory as a remote so you can pull in changes to the `main` branch. These command should be run from within the project directory: 

    ```
    $ git remote add mike https://github.com/mike-matera/volunteer-me-capstone.git
    $ git fetch mike
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
    