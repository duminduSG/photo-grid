#### Image grid generator

##### Installation and Setup Instructions

There are two ways to setup the project. Try one from two of them.

1. With Docker

	**Prerequisite - Latest Version of docker**

	- clone the repo and go to project root directory
	- rename all example.env file to .env and replace values with yours values
	- run docker-compose up -d 
	- visit http://localhost:3000/

2.  Without Docker

	**Prerequisite - NodeJs**

	Backend
	- clone the repo and go to backend folder
	- rename example.env file to .env and replace values with yours values
	- execute `npm install`
	- execute `npm run start:dev`

	Frontend
	- clone the repo and go to frontend folder
	- rename example.env file to .env and replace values with yours values
	- execute `npm install`
	- execute `npm run start`
	- visit http://localhost:3000/


##### Run Unit test

Backend
- go to backend folder
- execute `npm run test`

Frontend
- go to frontend folder
- execute `npm run test`


