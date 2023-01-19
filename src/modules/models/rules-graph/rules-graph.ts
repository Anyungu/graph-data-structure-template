

export class RulesGraph {

    graph !: { [key: string]: [number, string][] }
    edgesObject !: { [key: string]: number[] }
    path: number[] = []
    complete: boolean = false

    constructor(gr: { [key: string]: [number, string][] }, eO: { [key: string]: number[] }, pt: number[]
    ) {
        this.graph = gr
        this.edgesObject = eO
        this.path = pt
    }


    addNode(status: number) {
        if (!this.graph[status]) {
            this.graph[status] = []
        }
    }

    addEdgesObject(rule: string, value: number) {

        if (this.edgesObject[rule]) {
            this.edgesObject = { ...this.edgesObject, [rule]: [...this.edgesObject[rule], value] }
        } else {
            this.edgesObject = { ...this.edgesObject, [rule]: [value] }
        }

    }


    removeNode() {

    }

    /**
     * unidirectional according to test example
     * Adding an already existing edge will attempt to update the rules
     * @param sourceStatus 
     * @param destinationStatus 
     * @param rules 
     */
    addEdge(sourceStatus: number, destinationStatus: number, rules: string) {

        if (this.graph[sourceStatus] && this.graph[destinationStatus]) {

            // const presentEdgeIndex = this.graph[sourceStatus].findIndex(node => node[0] === destinationStatus)

            // if (presentEdgeIndex === -1) {
            this.graph[sourceStatus] = [...this.graph[sourceStatus], [destinationStatus, rules]]
            this.addEdgesObject(rules, destinationStatus)
            // } else {
            //     let neighbors = this.graph[sourceStatus]
            //     neighbors[presentEdgeIndex] = [destinationStatus, rules]
            //     this.graph[sourceStatus] = neighbors
            // }


        }

    }

    removeEdge() {

    }


    nextStatus(rules: string): number[] {

        let currentIndex = 0;

        // get the first node as a starting point
        let nodes = Object.keys(this.graph)
        let nodesCheckQueue = [parseInt(nodes[0])];


        let visitedNodes = {}
        let possibleNextStatuses = []


        for (let i = currentIndex; i < nodesCheckQueue.length; i++) {
            currentIndex++;

            let firstValue = nodesCheckQueue[i]

            if (visitedNodes[firstValue]) continue;

            visitedNodes[firstValue] = true

            const neighbors = this.graph[firstValue]



            for (let j = 0; j < neighbors.length; j++) {
                const neighborStatus = neighbors[j][0]
                const neighborsRules = neighbors[j][1]

                if (neighborsRules === rules) {
                    possibleNextStatuses.push(neighborStatus)
                }
                nodesCheckQueue.push(neighborStatus)

            }

        }

        return possibleNextStatuses;

    }

    anyCorrectPathToNextStatus(startNode: number, rules: string, visited: {} = {}, neighborsRules: string = '') {


        const lookFor = this.edgesObject[rules]
        const startNodePresent = this.graph[startNode]

        /**
         * Are rules and nodes valid and present?
         */
        if (!lookFor || !startNodePresent) {
            this.complete = true;
            this.path = []
            return this.path
        }


        /**
         * Node visited but has not met requirements
         */
        if (visited[startNode] && neighborsRules && neighborsRules !== rules) {
            this.complete = false;
            this.path.pop()
            return this.path
        }


        /**
         * Node has met requirements
         */
        if (rules === neighborsRules && lookFor.includes(startNode)) {
            this.path.push(startNode)
            this.complete = true;
            return this.path
        }

        /**
         * correct Node value has not met transition rules
         */
        if (neighborsRules && rules !== neighborsRules && lookFor.includes(startNode)) {
            this.complete = false;
            this.path.pop()
            return this.path
        }


        this.complete = false;

        this.path.push(startNode)

        visited[startNode] = true;


        const neighbors = this.graph[startNode]

        for (let j = 0; j < neighbors.length; j++) {
            const neighborStatus = neighbors[j][0]
            const neighborsRules = neighbors[j][1]

            if (this.complete) {

                // this.path = [];
                // this.complete = false;
                // console.log(path, 1)
                break;
            } else {
                this.anyCorrectPathToNextStatus(neighborStatus, rules, visited, neighborsRules)
            }


        }

        return;


    }

    giveAndresetPath(): number[] {
        const finalPath = this.path
        this.path = []
        this.complete = false;
        return finalPath;
    }



    showGraph(): { [key: string]: {} } {
        // console.log(this.graph)
        // console.log(this.edgesObject)
        return {'graph': this.graph, 'edges': this.edgesObject}
    }

}
