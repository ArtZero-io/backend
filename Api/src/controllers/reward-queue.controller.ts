import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
    response,
} from '@loopback/rest';
import {rewardqueues} from '../models';
import {RewardQueueSchemaRepository} from '../repositories';

class RewardQueueController {
    constructor(
        @repository(RewardQueueSchemaRepository)
        public rewardQueueSchemaRepository: RewardQueueSchemaRepository,
    ) {
    }

    @post('/reward-queue-schemas')
    @response(200, {
        description: 'RewardQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(rewardqueues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(rewardqueues, {
                        title: 'NewRewardQueueSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            rewardQueueSchema: Omit<rewardqueues, 'id'>,
    ): Promise<rewardqueues> {
        return this.rewardQueueSchemaRepository.create(rewardQueueSchema);
    }

    @get('/reward-queue-schemas/count')
    @response(200, {
        description: 'RewardQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(rewardqueues) where?: Where<rewardqueues>,
    ): Promise<Count> {
        return this.rewardQueueSchemaRepository.count(where);
    }

    @get('/reward-queue-schemas')
    @response(200, {
        description: 'Array of RewardQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(rewardqueues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(rewardqueues) filter?: Filter<rewardqueues>,
    ): Promise<rewardqueues[]> {
        return this.rewardQueueSchemaRepository.find(filter);
    }

    @patch('/reward-queue-schemas')
    @response(200, {
        description: 'RewardQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(rewardqueues, {partial: true}),
                },
            },
        })
            rewardQueueSchema: rewardqueues,
        @param.where(rewardqueues) where?: Where<rewardqueues>,
    ): Promise<Count> {
        return this.rewardQueueSchemaRepository.updateAll(rewardQueueSchema, where);
    }

    @get('/reward-queue-schemas/{id}')
    @response(200, {
        description: 'RewardQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(rewardqueues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(rewardqueues, {exclude: 'where'}) filter?: FilterExcludingWhere<rewardqueues>
    ): Promise<rewardqueues> {
        return this.rewardQueueSchemaRepository.findById(id, filter);
    }

    @patch('/reward-queue-schemas/{id}')
    @response(204, {
        description: 'RewardQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(rewardqueues, {partial: true}),
                },
            },
        })
            rewardQueueSchema: rewardqueues,
    ): Promise<void> {
        await this.rewardQueueSchemaRepository.updateById(id, rewardQueueSchema);
    }

    @put('/reward-queue-schemas/{id}')
    @response(204, {
        description: 'RewardQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() rewardQueueSchema: rewardqueues,
    ): Promise<void> {
        await this.rewardQueueSchemaRepository.replaceById(id, rewardQueueSchema);
    }

    @del('/reward-queue-schemas/{id}')
    @response(204, {
        description: 'RewardQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.rewardQueueSchemaRepository.deleteById(id);
    }
}
