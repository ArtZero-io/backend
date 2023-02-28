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
import {collectionqueues} from '../models';
import {CollectionQueueSchemaRepository} from '../repositories';

class CollectionQueueController {
    constructor(
        @repository(CollectionQueueSchemaRepository)
        public collectionQueueSchemaRepository: CollectionQueueSchemaRepository,
    ) {
    }

    @post('/collection-queue-schemas')
    @response(200, {
        description: 'CollectionQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(collectionqueues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collectionqueues, {
                        title: 'NewCollectionQueueSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            collectionQueueSchema: Omit<collectionqueues, '_id'>,
    ): Promise<collectionqueues> {
        return this.collectionQueueSchemaRepository.create(collectionQueueSchema);
    }

    @get('/collection-queue-schemas/count')
    @response(200, {
        description: 'CollectionQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(collectionqueues) where?: Where<collectionqueues>,
    ): Promise<Count> {
        return this.collectionQueueSchemaRepository.count(where);
    }

    @get('/collection-queue-schemas')
    @response(200, {
        description: 'Array of CollectionQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(collectionqueues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(collectionqueues) filter?: Filter<collectionqueues>,
    ): Promise<collectionqueues[]> {
        return this.collectionQueueSchemaRepository.find(filter);
    }

    @patch('/collection-queue-schemas')
    @response(200, {
        description: 'CollectionQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collectionqueues, {partial: true}),
                },
            },
        })
            collectionQueueSchema: collectionqueues,
        @param.where(collectionqueues) where?: Where<collectionqueues>,
    ): Promise<Count> {
        return this.collectionQueueSchemaRepository.updateAll(collectionQueueSchema, where);
    }

    @get('/collection-queue-schemas/{id}')
    @response(200, {
        description: 'CollectionQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(collectionqueues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(collectionqueues, {exclude: 'where'}) filter?: FilterExcludingWhere<collectionqueues>
    ): Promise<collectionqueues> {
        return this.collectionQueueSchemaRepository.findById(id, filter);
    }

    @patch('/collection-queue-schemas/{id}')
    @response(204, {
        description: 'CollectionQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collectionqueues, {partial: true}),
                },
            },
        })
            collectionQueueSchema: collectionqueues,
    ): Promise<void> {
        await this.collectionQueueSchemaRepository.updateById(id, collectionQueueSchema);
    }

    @put('/collection-queue-schemas/{id}')
    @response(204, {
        description: 'CollectionQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() collectionQueueSchema: collectionqueues,
    ): Promise<void> {
        await this.collectionQueueSchemaRepository.replaceById(id, collectionQueueSchema);
    }

    @del('/collection-queue-schemas/{id}')
    @response(204, {
        description: 'CollectionQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.collectionQueueSchemaRepository.deleteById(id);
    }
}
