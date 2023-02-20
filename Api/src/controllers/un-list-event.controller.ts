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
import {unlistevents} from '../models';
import {UnListEventSchemaRepository} from '../repositories';

class UnListEventController {
    constructor(
        @repository(UnListEventSchemaRepository)
        public unListEventSchemaRepository: UnListEventSchemaRepository,
    ) {
    }

    @post('/un-list-event-schemas')
    @response(200, {
        description: 'UnListEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(unlistevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(unlistevents, {
                        title: 'NewUnListEventSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            unListEventSchema: Omit<unlistevents, 'id'>,
    ): Promise<unlistevents> {
        return this.unListEventSchemaRepository.create(unListEventSchema);
    }

    @get('/un-list-event-schemas/count')
    @response(200, {
        description: 'UnListEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(unlistevents) where?: Where<unlistevents>,
    ): Promise<Count> {
        return this.unListEventSchemaRepository.count(where);
    }

    @get('/un-list-event-schemas')
    @response(200, {
        description: 'Array of UnListEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(unlistevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(unlistevents) filter?: Filter<unlistevents>,
    ): Promise<unlistevents[]> {
        return this.unListEventSchemaRepository.find(filter);
    }

    @patch('/un-list-event-schemas')
    @response(200, {
        description: 'UnListEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(unlistevents, {partial: true}),
                },
            },
        })
            unListEventSchema: unlistevents,
        @param.where(unlistevents) where?: Where<unlistevents>,
    ): Promise<Count> {
        return this.unListEventSchemaRepository.updateAll(unListEventSchema, where);
    }

    @get('/un-list-event-schemas/{id}')
    @response(200, {
        description: 'UnListEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(unlistevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(unlistevents, {exclude: 'where'}) filter?: FilterExcludingWhere<unlistevents>
    ): Promise<unlistevents> {
        return this.unListEventSchemaRepository.findById(id, filter);
    }

    @patch('/un-list-event-schemas/{id}')
    @response(204, {
        description: 'UnListEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(unlistevents, {partial: true}),
                },
            },
        })
            unListEventSchema: unlistevents,
    ): Promise<void> {
        await this.unListEventSchemaRepository.updateById(id, unListEventSchema);
    }

    @put('/un-list-event-schemas/{id}')
    @response(204, {
        description: 'UnListEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() unListEventSchema: unlistevents,
    ): Promise<void> {
        await this.unListEventSchemaRepository.replaceById(id, unListEventSchema);
    }

    @del('/un-list-event-schemas/{id}')
    @response(204, {
        description: 'UnListEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.unListEventSchemaRepository.deleteById(id);
    }
}
