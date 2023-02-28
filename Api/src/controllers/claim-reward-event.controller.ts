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
import {claimrewardevents} from '../models';
import {ClaimRewardEventSchemaRepository} from '../repositories';

class ClaimRewardEventController {
    constructor(
        @repository(ClaimRewardEventSchemaRepository)
        public claimRewardEventSchemaRepository: ClaimRewardEventSchemaRepository,
    ) {
    }

    @post('/claim-reward-event-schemas')
    @response(200, {
        description: 'ClaimRewardEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(claimrewardevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(claimrewardevents, {
                        title: 'NewClaimRewardEventSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            claimRewardEventSchema: Omit<claimrewardevents, '_id'>,
    ): Promise<claimrewardevents> {
        return this.claimRewardEventSchemaRepository.create(claimRewardEventSchema);
    }

    @get('/claim-reward-event-schemas/count')
    @response(200, {
        description: 'ClaimRewardEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(claimrewardevents) where?: Where<claimrewardevents>,
    ): Promise<Count> {
        return this.claimRewardEventSchemaRepository.count(where);
    }

    @get('/claim-reward-event-schemas')
    @response(200, {
        description: 'Array of ClaimRewardEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(claimrewardevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(claimrewardevents) filter?: Filter<claimrewardevents>,
    ): Promise<claimrewardevents[]> {
        return this.claimRewardEventSchemaRepository.find(filter);
    }

    @patch('/claim-reward-event-schemas')
    @response(200, {
        description: 'ClaimRewardEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(claimrewardevents, {partial: true}),
                },
            },
        })
            claimRewardEventSchema: claimrewardevents,
        @param.where(claimrewardevents) where?: Where<claimrewardevents>,
    ): Promise<Count> {
        return this.claimRewardEventSchemaRepository.updateAll(claimRewardEventSchema, where);
    }

    @get('/claim-reward-event-schemas/{id}')
    @response(200, {
        description: 'ClaimRewardEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(claimrewardevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(claimrewardevents, {exclude: 'where'}) filter?: FilterExcludingWhere<claimrewardevents>
    ): Promise<claimrewardevents> {
        return this.claimRewardEventSchemaRepository.findById(id, filter);
    }

    @patch('/claim-reward-event-schemas/{id}')
    @response(204, {
        description: 'ClaimRewardEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(claimrewardevents, {partial: true}),
                },
            },
        })
            claimRewardEventSchema: claimrewardevents,
    ): Promise<void> {
        await this.claimRewardEventSchemaRepository.updateById(id, claimRewardEventSchema);
    }

    @put('/claim-reward-event-schemas/{id}')
    @response(204, {
        description: 'ClaimRewardEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() claimRewardEventSchema: claimrewardevents,
    ): Promise<void> {
        await this.claimRewardEventSchemaRepository.replaceById(id, claimRewardEventSchema);
    }

    @del('/claim-reward-event-schemas/{id}')
    @response(204, {
        description: 'ClaimRewardEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.claimRewardEventSchemaRepository.deleteById(id);
    }
}
