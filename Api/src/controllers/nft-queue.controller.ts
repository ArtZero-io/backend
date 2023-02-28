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
import {nftqueues} from '../models';
import {NftQueueSchemaRepository} from '../repositories';

class NftQueueController {
    constructor(
        @repository(NftQueueSchemaRepository)
        public nftQueueSchemaRepository: NftQueueSchemaRepository,
    ) {
    }

    @post('/nft-queue-schemas')
    @response(200, {
        description: 'NftQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(nftqueues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nftqueues, {
                        title: 'NewNftQueueSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            nftQueueSchema: Omit<nftqueues, '_id'>,
    ): Promise<nftqueues> {
        return this.nftQueueSchemaRepository.create(nftQueueSchema);
    }

    @get('/nft-queue-schemas/count')
    @response(200, {
        description: 'NftQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(nftqueues) where?: Where<nftqueues>,
    ): Promise<Count> {
        return this.nftQueueSchemaRepository.count(where);
    }

    @get('/nft-queue-schemas')
    @response(200, {
        description: 'Array of NftQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(nftqueues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(nftqueues) filter?: Filter<nftqueues>,
    ): Promise<nftqueues[]> {
        return this.nftQueueSchemaRepository.find(filter);
    }

    @patch('/nft-queue-schemas')
    @response(200, {
        description: 'NftQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nftqueues, {partial: true}),
                },
            },
        })
            nftQueueSchema: nftqueues,
        @param.where(nftqueues) where?: Where<nftqueues>,
    ): Promise<Count> {
        return this.nftQueueSchemaRepository.updateAll(nftQueueSchema, where);
    }

    @get('/nft-queue-schemas/{id}')
    @response(200, {
        description: 'NftQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(nftqueues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(nftqueues, {exclude: 'where'}) filter?: FilterExcludingWhere<nftqueues>
    ): Promise<nftqueues> {
        return this.nftQueueSchemaRepository.findById(id, filter);
    }

    @patch('/nft-queue-schemas/{id}')
    @response(204, {
        description: 'NftQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nftqueues, {partial: true}),
                },
            },
        })
            nftQueueSchema: nftqueues,
    ): Promise<void> {
        await this.nftQueueSchemaRepository.updateById(id, nftQueueSchema);
    }

    @put('/nft-queue-schemas/{id}')
    @response(204, {
        description: 'NftQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() nftQueueSchema: nftqueues,
    ): Promise<void> {
        await this.nftQueueSchemaRepository.replaceById(id, nftQueueSchema);
    }

    @del('/nft-queue-schemas/{id}')
    @response(204, {
        description: 'NftQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.nftQueueSchemaRepository.deleteById(id);
    }
}
