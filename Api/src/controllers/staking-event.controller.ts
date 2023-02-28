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
import {stakingevents} from '../models';
import {StakingEventSchemaRepository} from '../repositories';

class StakingEventController {
    constructor(
        @repository(StakingEventSchemaRepository)
        public stakingEventSchemaRepository: StakingEventSchemaRepository,
    ) {
    }

    @post('/staking-event-schemas')
    @response(200, {
        description: 'StakingEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(stakingevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(stakingevents, {
                        title: 'NewStakingEventSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            stakingEventSchema: Omit<stakingevents, '_id'>,
    ): Promise<stakingevents> {
        return this.stakingEventSchemaRepository.create(stakingEventSchema);
    }

    @get('/staking-event-schemas/count')
    @response(200, {
        description: 'StakingEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(stakingevents) where?: Where<stakingevents>,
    ): Promise<Count> {
        return this.stakingEventSchemaRepository.count(where);
    }

    @get('/staking-event-schemas')
    @response(200, {
        description: 'Array of StakingEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(stakingevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(stakingevents) filter?: Filter<stakingevents>,
    ): Promise<stakingevents[]> {
        return this.stakingEventSchemaRepository.find(filter);
    }

    @patch('/staking-event-schemas')
    @response(200, {
        description: 'StakingEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(stakingevents, {partial: true}),
                },
            },
        })
            stakingEventSchema: stakingevents,
        @param.where(stakingevents) where?: Where<stakingevents>,
    ): Promise<Count> {
        return this.stakingEventSchemaRepository.updateAll(stakingEventSchema, where);
    }

    @get('/staking-event-schemas/{id}')
    @response(200, {
        description: 'StakingEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(stakingevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(stakingevents, {exclude: 'where'}) filter?: FilterExcludingWhere<stakingevents>
    ): Promise<stakingevents> {
        return this.stakingEventSchemaRepository.findById(id, filter);
    }

    @patch('/staking-event-schemas/{id}')
    @response(204, {
        description: 'StakingEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(stakingevents, {partial: true}),
                },
            },
        })
            stakingEventSchema: stakingevents,
    ): Promise<void> {
        await this.stakingEventSchemaRepository.updateById(id, stakingEventSchema);
    }

    @put('/staking-event-schemas/{id}')
    @response(204, {
        description: 'StakingEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() stakingEventSchema: stakingevents,
    ): Promise<void> {
        await this.stakingEventSchemaRepository.replaceById(id, stakingEventSchema);
    }

    @del('/staking-event-schemas/{id}')
    @response(204, {
        description: 'StakingEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.stakingEventSchemaRepository.deleteById(id);
    }
}
