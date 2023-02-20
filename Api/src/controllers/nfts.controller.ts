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
import {nfts} from '../models';
import {NftsSchemaRepository} from '../repositories';

class NftsController {
    constructor(
        @repository(NftsSchemaRepository)
        public nfTsSchemaRepository: NftsSchemaRepository,
    ) {
    }

    @post('/nf-ts-schemas')
    @response(200, {
        description: 'NfTsSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(nfts)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nfts, {
                        title: 'NewNfTsSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            nfTsSchema: Omit<nfts, 'id'>,
    ): Promise<nfts> {
        return this.nfTsSchemaRepository.create(nfTsSchema);
    }

    @get('/nf-ts-schemas/count')
    @response(200, {
        description: 'NfTsSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(nfts) where?: Where<nfts>,
    ): Promise<Count> {
        return this.nfTsSchemaRepository.count(where);
    }

    @get('/nf-ts-schemas')
    @response(200, {
        description: 'Array of NfTsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(nfts, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(nfts) filter?: Filter<nfts>,
    ): Promise<nfts[]> {
        return this.nfTsSchemaRepository.find(filter);
    }

    @patch('/nf-ts-schemas')
    @response(200, {
        description: 'NfTsSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nfts, {partial: true}),
                },
            },
        })
            nfTsSchema: nfts,
        @param.where(nfts) where?: Where<nfts>,
    ): Promise<Count> {
        return this.nfTsSchemaRepository.updateAll(nfTsSchema, where);
    }

    @get('/nf-ts-schemas/{id}')
    @response(200, {
        description: 'NfTsSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(nfts, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(nfts, {exclude: 'where'}) filter?: FilterExcludingWhere<nfts>
    ): Promise<nfts> {
        return this.nfTsSchemaRepository.findById(id, filter);
    }

    @patch('/nf-ts-schemas/{id}')
    @response(204, {
        description: 'NfTsSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(nfts, {partial: true}),
                },
            },
        })
            nfTsSchema: nfts,
    ): Promise<void> {
        await this.nfTsSchemaRepository.updateById(id, nfTsSchema);
    }

    @put('/nf-ts-schemas/{id}')
    @response(204, {
        description: 'NfTsSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() nfTsSchema: nfts,
    ): Promise<void> {
        await this.nfTsSchemaRepository.replaceById(id, nfTsSchema);
    }

    @del('/nf-ts-schemas/{id}')
    @response(204, {
        description: 'NfTsSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.nfTsSchemaRepository.deleteById(id);
    }
}
