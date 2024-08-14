
## Contents

Included in this repository are the front and backend of the IDBapp, each with their own Dockerfile and yml file (for docker-compose) in their respective directories. In the root directory of the project is a yml file that configures the front and backend as well as the database provider used (which is mongodb) and mongo-express.

## Prerequisites:
In order for the images of this application to run you'll have to install Docker on your machine. Once
that's done, make sure docker is up and running. This will start the docker engine, which is needed to
run the containers and docker processes on your machine. You also will have to have git installed on
your machine, of course.

##Installation type 1

- Run the command below to clone this repository in your local environment:
	```bash
	git clone https://github.com/omnisilica/IDBapp-with-docker.git
	```
- Navigate to the projects root directory, where the idbapp.yml file is located.
- Run docker-compose idbapp.yml
	```bash
	docker-compose -f idbapp.yml
	```
	In the above command, docker-compose pulls or builds the images specified in the yml file. It'll get these services from either dockerhub or the instructions in the Dockerfile, the location of which is specified in the yml file.

## What the Dockerfile in banking-app-node does:

The Dockerfile is what is used to creat an image of an application and that image is what docker uses to create and start containers. The contents of the docker file are essentially instructions for what docker should do to create an image of the target application and what to base the image on.

The Dockerfile in banking-app-node tells docker to set the working directory to /IDBapp/banking-app-node within the container and copy all the contents of the directory that the Dockerfile is in into the specified path, which also happens to be the working directory. The RUN commands are used to generate the node modules necessary for the react app. The EXPOSE command is used to expose the application on the port specified, and the CMD command is used to start the react application inside the container. The FROM command tells docker what to base the image on. In this case, since banking-app-node is a node.js/express.js application it is based on Node, which docker will pull from the docker hub. Docker will pull a specific version of Node, i.e., 18-alpine. Otherwise, if not included, docker would pull the latest image of Node, which is larger than what is necessary for this application.

## What the Dockerfile in banking-app-react does:

Dockerfile creates an image of an application. In banking-app-react, Dockerfile tells docker to set the working directory to /IDBapp/banking-app-react within the container and copy all the contents in the directory of the Dockerfile into the working directory. The RUN command installs all the node modules necessary for the app. 'EXPOSE' exposes the application on the specified port and the CMD command is used to start the application within the container.

## What the yml file in banking-app-node does:
The yml file, i.e., banking-app-node.yml, tells docker how to run the banking-app-node image. Since the banking-app-node backend uses mongodb as a database, mongod is added to the file as a service. For the banking-app-node section of the file, build is used to specify the location of the Dockerfile used to build an image of the service. THe purpose of this is so that docker can build an image of the app if one is not already there. The 'environment' section is used to set the project level environment variables, and 'depends_on' is set to 'mongod', telling docker-compose to wait until the mongod service, specified in the app, is running before it starts up the banking-app-node. 'stdin_open' and 'tty' are used to open an interactive terminal using docker-compose.

## What the yml file in banking-app-react does:

The yml file, i.e., banking-app-react.yml, tells docker how to run the banking-app-node image. 'build' is set to the location where the Dockerfile for banking-app-react exists. If the yml file is run and no image exists for the app, docker-compose will build the image and then start the container. 'container_name' tells docker what to name the container when it runs, and 'ports' tells docker what port to run the app on. 'stdin_open' and 'tty' allows one to open an interactive terminal of the container.

## What the yml file in the root directory of the project does:

The yml file in the projects root directory boots up all the images of the services listed and runs them in containers. The mongo image is used as a database for the banking-app-node application and is set to run on port 27017. 

The mongo-express image is used to view data in the mongodb database that the banking-app-node persists and is set to run after the mongo image starts up. THe port is set to run on 8080 and the environment varaiables are set to access the mongo-express app.

The banking-app-node application is set to run on port 3000 after the mongo image starts up and when it does one can enter an interactive terminal which is made possible by 'stdin_open' and 'tty'. If the image for banking-app-node doesn't exist, docker-compose uses the Dockerfile in the specified path, through 'build', to build one.

The banking-app-react app is set to run on port 5173 and one can enter an interactive terminal, made possible by 'stdin_open' and 'tty'. docker-compose uses the Dockerfile in the path the 'build' argument specifies.