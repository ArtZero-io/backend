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
import {collectionevents} from '../models';
import {CollectionEventSchemaRepository} from '../repositories';

class CollectionEventController {
    constructor(
        @repository(CollectionEventSchemaRepository)
        public collectionEventSchemaRepository: CollectionEventSchemaRepository,
    ) {
    }

    @post('/collection-event-schemas')
    @response(200, {
        description: 'CollectionEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(collectionevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collectionevents, {
                        title: 'NewCollectionEventSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            collectionEventSchema: Omit<collectionevents, 'id'>,
    ): Promise<collectionevents> {
        return this.collectionEventSchemaRepository.create(collectionEventSchema);
    }

    @get('/collection-event-schemas/count')
    @response(200, {
        description: 'CollectionEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(collectionevents) where?: Where<collectionevents>,
    ): Promise<Count> {
        return this.collectionEventSchemaRepository.count(where);
    }

    @get('/collection-event-schemas')
    @response(200, {
        description: 'Array of CollectionEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(collectionevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(collectionevents) filter?: Filter<collectionevents>,
    ): Promise<collectionevents[]> {
        return this.collectionEventSchemaRepository.find(filter);
    }

    @patch('/collection-event-schemas')
    @response(200, {
        description: 'CollectionEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collectionevents, {partial: true}),
                },
            },
        })
            collectionEventSchema: collectionevents,
        @param.where(collectionevents) where?: Where<collectionevents>,
    ): Promise<Count> {
        return this.collectionEventSchemaRepository.updateAll(collectionEventSchema, where);
    }

    @get('/collection-event-schemas/{id}')
    @response(200, {
        description: 'CollectionEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(collectionevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(collectionevents, {exclude: 'where'}) filter?: FilterExcludingWhere<collectionevents>
    ): Promise<collectionevents> {
        return this.collectionEventSchemaRepository.findById(id, filter);
    }

    @patch('/collection-event-schemas/{id}')
    @response(204, {
        description: 'CollectionEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collectionevents, {partial: true}),
                },
            },
        })
            collectionEventSchema: collectionevents,
    ): Promise<void> {
        await this.collectionEventSchemaRepository.updateById(id, collectionEventSchema);
    }

    @put('/collection-event-schemas/{id}')
    @response(204, {
        description: 'CollectionEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() collectionEventSchema: collectionevents,
    ): Promise<void> {
        await this.collectionEventSchemaRepository.replaceById(id, collectionEventSchema);
    }

    @del('/collection-event-schemas/{id}')
    @response(204, {
        description: 'CollectionEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.collectionEventSchemaRepository.deleteById(id);
    }
}
