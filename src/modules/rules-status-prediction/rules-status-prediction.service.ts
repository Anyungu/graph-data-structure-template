import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { RulesGraph } from '../models/rules-graph/rules-graph';
import { FirstPathRequest, NextStatusRequest } from './models/dto/dto.interface';

@Injectable()
export class RulesStatusPredictionService implements OnModuleInit {

    private rulesGraph !: RulesGraph

    async onModuleInit(): Promise<void> {

        // Add all the nodes staticaslly
        this.rulesGraph = new RulesGraph({}, {}, [])
        this.rulesGraph.addNode(1)
        this.rulesGraph.addNode(2)
        this.rulesGraph.addNode(3)
        this.rulesGraph.addNode(4)
        this.rulesGraph.addNode(5)


        //Add one directed edges
        this.rulesGraph.addEdge(5, 1, 'RAS')
        this.rulesGraph.addEdge(1, 2, 'SAS')
        this.rulesGraph.addEdge(5, 2, 'RPS')
        this.rulesGraph.addEdge(2, 3, 'SPS')
        this.rulesGraph.addEdge(3, 4, 'RUS')
        this.rulesGraph.addEdge(4, 5, 'RAS')
        this.rulesGraph.addEdge(4, 5, 'RPB')
        this.rulesGraph.addEdge(4, 2, 'RPS')

    }


    giveNextStatus(nextStatusRequest: NextStatusRequest): number[] {

        if (nextStatusRequest && nextStatusRequest.transition.length === 3) {

            return this.rulesGraph.nextStatus(nextStatusRequest.transition.join('').toUpperCase())
        }

        throw new BadRequestException('Body not found')

    }

    giveFirstPath(firstPathRequest: FirstPathRequest): { [key: string]: number[] } {



        if (firstPathRequest && firstPathRequest.transition.length === 3) {

            let pathObject: { [key: string]: number[] } = {}

            for (let i = 0; i < firstPathRequest.statuses.length; i++) {


                this.rulesGraph.
                    anyCorrectPathToNextStatus(firstPathRequest.statuses[i], firstPathRequest.transition.join('').toUpperCase())
                const path = this.rulesGraph.giveAndresetPath()

                console.log(path)


                pathObject[firstPathRequest.statuses[i]] = path

            }

            return pathObject



        }
        throw new BadRequestException('Body not found')

    }

    showAllPaths(): { [key: string]: {} } {
        return this.rulesGraph.showGraph()
    }
}
