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
import {bids} from '../models';
import {BidsSchemaRepository} from '../repositories';

class BidsController {
    constructor(
        @repository(BidsSchemaRepository)
        public bidsSchemaRepository: BidsSchemaRepository,
    ) {
    }

    @post('/bids-schemas')
    @response(200, {
        description: 'BidsSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(bids)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bids, {
                        title: 'NewBidsSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            bidsSchema: Omit<bids, 'id'>,
    ): Promise<bids> {
        return this.bidsSchemaRepository.create(bidsSchema);
    }

    @get('/bids-schemas/count')
    @response(200, {
        description: 'BidsSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(bids) where?: Where<bids>,
    ): Promise<Count> {
        return this.bidsSchemaRepository.count(where);
    }

    @get('/bids-schemas')
    @response(200, {
        description: 'Array of BidsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(bids, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(bids) filter?: Filter<bids>,
    ): Promise<bids[]> {
        return this.bidsSchemaRepository.find(filter);
    }

    @patch('/bids-schemas')
    @response(200, {
        description: 'BidsSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bids, {partial: true}),
                },
            },
        })
            bidsSchema: bids,
        @param.where(bids) where?: Where<bids>,
    ): Promise<Count> {
        return this.bidsSchemaRepository.updateAll(bidsSchema, where);
    }

    @get('/bids-schemas/{id}')
    @response(200, {
        description: 'BidsSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(bids, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(bids, {exclude: 'where'}) filter?: FilterExcludingWhere<bids>
    ): Promise<bids> {
        return this.bidsSchemaRepository.findById(id, filter);
    }

    @patch('/bids-schemas/{id}')
    @response(204, {
        description: 'BidsSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bids, {partial: true}),
                },
            },
        })
            bidsSchema: bids,
    ): Promise<void> {
        await this.bidsSchemaRepository.updateById(id, bidsSchema);
    }

    @put('/bids-schemas/{id}')
    @response(204, {
        description: 'BidsSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() bidsSchema: bids,
    ): Promise<void> {
        await this.bidsSchemaRepository.replaceById(id, bidsSchema);
    }

    @del('/bids-schemas/{id}')
    @response(204, {
        description: 'BidsSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.bidsSchemaRepository.deleteById(id);
    }
}
