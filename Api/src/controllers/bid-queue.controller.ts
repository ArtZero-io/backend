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
import {bidqueues} from '../models';
import {BidQueueSchemaRepository} from '../repositories';

class BidQueueController {
    constructor(
        @repository(BidQueueSchemaRepository)
        public bidQueueSchemaRepository: BidQueueSchemaRepository,
    ) {
    }

    @post('/bid-queue-schemas')
    @response(200, {
        description: 'BidQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(bidqueues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bidqueues, {
                        title: 'NewBidQueueSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            bidQueueSchema: Omit<bidqueues, '_id'>,
    ): Promise<bidqueues> {
        return this.bidQueueSchemaRepository.create(bidQueueSchema);
    }

    @get('/bid-queue-schemas/count')
    @response(200, {
        description: 'BidQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(bidqueues) where?: Where<bidqueues>,
    ): Promise<Count> {
        return this.bidQueueSchemaRepository.count(where);
    }

    @get('/bid-queue-schemas')
    @response(200, {
        description: 'Array of BidQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(bidqueues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(bidqueues) filter?: Filter<bidqueues>,
    ): Promise<bidqueues[]> {
        return this.bidQueueSchemaRepository.find(filter);
    }

    @patch('/bid-queue-schemas')
    @response(200, {
        description: 'BidQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bidqueues, {partial: true}),
                },
            },
        })
            bidQueueSchema: bidqueues,
        @param.where(bidqueues) where?: Where<bidqueues>,
    ): Promise<Count> {
        return this.bidQueueSchemaRepository.updateAll(bidQueueSchema, where);
    }

    @get('/bid-queue-schemas/{id}')
    @response(200, {
        description: 'BidQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(bidqueues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(bidqueues, {exclude: 'where'}) filter?: FilterExcludingWhere<bidqueues>
    ): Promise<bidqueues> {
        return this.bidQueueSchemaRepository.findById(id, filter);
    }

    @patch('/bid-queue-schemas/{id}')
    @response(204, {
        description: 'BidQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bidqueues, {partial: true}),
                },
            },
        })
            bidQueueSchema: bidqueues,
    ): Promise<void> {
        await this.bidQueueSchemaRepository.updateById(id, bidQueueSchema);
    }

    @put('/bid-queue-schemas/{id}')
    @response(204, {
        description: 'BidQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() bidQueueSchema: bidqueues,
    ): Promise<void> {
        await this.bidQueueSchemaRepository.replaceById(id, bidQueueSchema);
    }

    @del('/bid-queue-schemas/{id}')
    @response(204, {
        description: 'BidQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.bidQueueSchemaRepository.deleteById(id);
    }
}
