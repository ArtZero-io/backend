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
import {collections} from '../models';
import {CollectionsSchemaRepository} from '../repositories';

class CollectionsController {
    constructor(
        @repository(CollectionsSchemaRepository)
        public collectionsSchemaRepository: CollectionsSchemaRepository,
    ) {
    }

    @post('/collections-schemas')
    @response(200, {
        description: 'CollectionsSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(collections)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collections, {
                        title: 'NewCollectionsSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            collectionsSchema: Omit<collections, 'id'>,
    ): Promise<collections> {
        return this.collectionsSchemaRepository.create(collectionsSchema);
    }

    @get('/collections-schemas/count')
    @response(200, {
        description: 'CollectionsSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(collections) where?: Where<collections>,
    ): Promise<Count> {
        return this.collectionsSchemaRepository.count(where);
    }

    @get('/collections-schemas')
    @response(200, {
        description: 'Array of CollectionsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(collections, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(collections) filter?: Filter<collections>,
    ): Promise<collections[]> {
        return this.collectionsSchemaRepository.find(filter);
    }

    @patch('/collections-schemas')
    @response(200, {
        description: 'CollectionsSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collections, {partial: true}),
                },
            },
        })
            collectionsSchema: collections,
        @param.where(collections) where?: Where<collections>,
    ): Promise<Count> {
        return this.collectionsSchemaRepository.updateAll(collectionsSchema, where);
    }

    @get('/collections-schemas/{id}')
    @response(200, {
        description: 'CollectionsSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(collections, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(collections, {exclude: 'where'}) filter?: FilterExcludingWhere<collections>
    ): Promise<collections> {
        return this.collectionsSchemaRepository.findById(id, filter);
    }

    @patch('/collections-schemas/{id}')
    @response(204, {
        description: 'CollectionsSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(collections, {partial: true}),
                },
            },
        })
            collectionsSchema: collections,
    ): Promise<void> {
        await this.collectionsSchemaRepository.updateById(id, collectionsSchema);
    }

    @put('/collections-schemas/{id}')
    @response(204, {
        description: 'CollectionsSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() collectionsSchema: collections,
    ): Promise<void> {
        await this.collectionsSchemaRepository.replaceById(id, collectionsSchema);
    }

    @del('/collections-schemas/{id}')
    @response(204, {
        description: 'CollectionsSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.collectionsSchemaRepository.deleteById(id);
    }
}
