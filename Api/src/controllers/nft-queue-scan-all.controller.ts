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
import {nftqueuealls} from '../models';
import {NftQueueScanAllSchemaRepository} from '../repositories';

class NftQueueScanAllController {
    constructor(
        @repository(NftQueueScanAllSchemaRepository)
        public nftQueueScanAllSchemaRepository: NftQueueScanAllSchemaRepository,
    ) {
    }

    @post('/nft-queue-scan-all-schemas')
    @response(200, {
        description: 'NftQueueScanAllSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(nftqueuealls)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nftqueuealls, {
                        title: 'NewNftQueueScanAllSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            nftQueueScanAllSchema: Omit<nftqueuealls, 'id'>,
    ): Promise<nftqueuealls> {
        return this.nftQueueScanAllSchemaRepository.create(nftQueueScanAllSchema);
    }

    @get('/nft-queue-scan-all-schemas/count')
    @response(200, {
        description: 'NftQueueScanAllSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(nftqueuealls) where?: Where<nftqueuealls>,
    ): Promise<Count> {
        return this.nftQueueScanAllSchemaRepository.count(where);
    }

    @get('/nft-queue-scan-all-schemas')
    @response(200, {
        description: 'Array of NftQueueScanAllSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(nftqueuealls, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(nftqueuealls) filter?: Filter<nftqueuealls>,
    ): Promise<nftqueuealls[]> {
        return this.nftQueueScanAllSchemaRepository.find(filter);
    }

    @patch('/nft-queue-scan-all-schemas')
    @response(200, {
        description: 'NftQueueScanAllSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nftqueuealls, {partial: true}),
                },
            },
        })
            nftQueueScanAllSchema: nftqueuealls,
        @param.where(nftqueuealls) where?: Where<nftqueuealls>,
    ): Promise<Count> {
        return this.nftQueueScanAllSchemaRepository.updateAll(nftQueueScanAllSchema, where);
    }

    @get('/nft-queue-scan-all-schemas/{id}')
    @response(200, {
        description: 'NftQueueScanAllSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(nftqueuealls, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(nftqueuealls, {exclude: 'where'}) filter?: FilterExcludingWhere<nftqueuealls>
    ): Promise<nftqueuealls> {
        return this.nftQueueScanAllSchemaRepository.findById(id, filter);
    }

    @patch('/nft-queue-scan-all-schemas/{id}')
    @response(204, {
        description: 'NftQueueScanAllSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nftqueuealls, {partial: true}),
                },
            },
        })
            nftQueueScanAllSchema: nftqueuealls,
    ): Promise<void> {
        await this.nftQueueScanAllSchemaRepository.updateById(id, nftQueueScanAllSchema);
    }

    @put('/nft-queue-scan-all-schemas/{id}')
    @response(204, {
        description: 'NftQueueScanAllSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() nftQueueScanAllSchema: nftqueuealls,
    ): Promise<void> {
        await this.nftQueueScanAllSchemaRepository.replaceById(id, nftQueueScanAllSchema);
    }

    @del('/nft-queue-scan-all-schemas/{id}')
    @response(204, {
        description: 'NftQueueScanAllSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.nftQueueScanAllSchemaRepository.deleteById(id);
    }
}
