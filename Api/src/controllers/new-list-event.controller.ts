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
import {newlistevents} from '../models';
import {NewListEventSchemaRepository} from '../repositories';

class NewListEventController {
    constructor(
        @repository(NewListEventSchemaRepository)
        public newListEventSchemaRepository: NewListEventSchemaRepository,
    ) {
    }

    @post('/new-list-event-schemas')
    @response(200, {
        description: 'NewListEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(newlistevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(newlistevents, {
                        title: 'NewNewListEventSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            newListEventSchema: Omit<newlistevents, 'id'>,
    ): Promise<newlistevents> {
        return this.newListEventSchemaRepository.create(newListEventSchema);
    }

    @get('/new-list-event-schemas/count')
    @response(200, {
        description: 'NewListEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(newlistevents) where?: Where<newlistevents>,
    ): Promise<Count> {
        return this.newListEventSchemaRepository.count(where);
    }

    @get('/new-list-event-schemas')
    @response(200, {
        description: 'Array of NewListEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(newlistevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(newlistevents) filter?: Filter<newlistevents>,
    ): Promise<newlistevents[]> {
        return this.newListEventSchemaRepository.find(filter);
    }

    @patch('/new-list-event-schemas')
    @response(200, {
        description: 'NewListEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(newlistevents, {partial: true}),
                },
            },
        })
            newListEventSchema: newlistevents,
        @param.where(newlistevents) where?: Where<newlistevents>,
    ): Promise<Count> {
        return this.newListEventSchemaRepository.updateAll(newListEventSchema, where);
    }

    @get('/new-list-event-schemas/{id}')
    @response(200, {
        description: 'NewListEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(newlistevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(newlistevents, {exclude: 'where'}) filter?: FilterExcludingWhere<newlistevents>
    ): Promise<newlistevents> {
        return this.newListEventSchemaRepository.findById(id, filter);
    }

    @patch('/new-list-event-schemas/{id}')
    @response(204, {
        description: 'NewListEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(newlistevents, {partial: true}),
                },
            },
        })
            newListEventSchema: newlistevents,
    ): Promise<void> {
        await this.newListEventSchemaRepository.updateById(id, newListEventSchema);
    }

    @put('/new-list-event-schemas/{id}')
    @response(204, {
        description: 'NewListEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() newListEventSchema: newlistevents,
    ): Promise<void> {
        await this.newListEventSchemaRepository.replaceById(id, newListEventSchema);
    }

    @del('/new-list-event-schemas/{id}')
    @response(204, {
        description: 'NewListEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.newListEventSchemaRepository.deleteById(id);
    }
}
