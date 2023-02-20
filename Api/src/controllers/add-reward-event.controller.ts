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
import {addrewardevents} from '../models';
import {AddRewardEventSchemaRepository} from '../repositories';

class AddRewardEventController {
    constructor(
        @repository(AddRewardEventSchemaRepository)
        public addRewardEventSchemaRepository: AddRewardEventSchemaRepository,
    ) {
    }

    @post('/add-reward-event-schemas')
    @response(200, {
        description: 'AddRewardEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(addrewardevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(addrewardevents, {
                        title: 'NewAddRewardEventSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            addRewardEventSchema: Omit<addrewardevents, 'id'>,
    ): Promise<addrewardevents> {
        return this.addRewardEventSchemaRepository.create(addRewardEventSchema);
    }

    @get('/add-reward-event-schemas/count')
    @response(200, {
        description: 'AddRewardEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(addrewardevents) where?: Where<addrewardevents>,
    ): Promise<Count> {
        return this.addRewardEventSchemaRepository.count(where);
    }

    @get('/add-reward-event-schemas')
    @response(200, {
        description: 'Array of AddRewardEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(addrewardevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(addrewardevents) filter?: Filter<addrewardevents>,
    ): Promise<addrewardevents[]> {
        return this.addRewardEventSchemaRepository.find(filter);
    }

    @patch('/add-reward-event-schemas')
    @response(200, {
        description: 'AddRewardEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(addrewardevents, {partial: true}),
                },
            },
        })
            addRewardEventSchema: addrewardevents,
        @param.where(addrewardevents) where?: Where<addrewardevents>,
    ): Promise<Count> {
        return this.addRewardEventSchemaRepository.updateAll(addRewardEventSchema, where);
    }

    @get('/add-reward-event-schemas/{id}')
    @response(200, {
        description: 'AddRewardEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(addrewardevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(addrewardevents, {exclude: 'where'}) filter?: FilterExcludingWhere<addrewardevents>
    ): Promise<addrewardevents> {
        return this.addRewardEventSchemaRepository.findById(id, filter);
    }

    @patch('/add-reward-event-schemas/{id}')
    @response(204, {
        description: 'AddRewardEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(addrewardevents, {partial: true}),
                },
            },
        })
            addRewardEventSchema: addrewardevents,
    ): Promise<void> {
        await this.addRewardEventSchemaRepository.updateById(id, addRewardEventSchema);
    }

    @put('/add-reward-event-schemas/{id}')
    @response(204, {
        description: 'AddRewardEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() addRewardEventSchema: addrewardevents,
    ): Promise<void> {
        await this.addRewardEventSchemaRepository.replaceById(id, addRewardEventSchema);
    }

    @del('/add-reward-event-schemas/{id}')
    @response(204, {
        description: 'AddRewardEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.addRewardEventSchemaRepository.deleteById(id);
    }
}
