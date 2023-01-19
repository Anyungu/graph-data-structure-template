# GRAPH DS TEMPLATE

> This template shows simple implementation of a constant unidirectional graph data structure

## Methods implemented
1. Breadth First search
This is to primarily find all possible nodes based on a certain condition

2. Depth First search
This is to primarily find the first available path to a node based on certain conditions

## How to run this project
Docker is the recommended way to run this project
In the root of the project run: 
`docker-compose up`

## Running from terminal
In the root of the project run:
`npm run start:dev`

## Rnning tests
`npm run test`

## Accessing the Nest API
Once run is complete, view the Swagger API docs, follow this link: http://localhost:3000/docs

### Available endpoints as seen in the docs above
1. POST /rules-status-prediction/status
Return all the possible next statuses after a rule

2. POST /rules-status-prediction/status
Return the first availabe path to a given status based on a rule

3. GET /rules-status-prediction/show
Show the graph data structures used