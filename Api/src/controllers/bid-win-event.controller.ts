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
import {bidwinevents} from '../models';
import {BidWinEventSchemaRepository} from '../repositories';

class BidWinEventController {
    constructor(
        @repository(BidWinEventSchemaRepository)
        public bidWinEventSchemaRepository: BidWinEventSchemaRepository,
    ) {
    }

    @post('/bid-win-event-schemas')
    @response(200, {
        description: 'BidWinEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(bidwinevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bidwinevents, {
                        title: 'NewBidWinEventSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            bidWinEventSchema: Omit<bidwinevents, 'id'>,
    ): Promise<bidwinevents> {
        return this.bidWinEventSchemaRepository.create(bidWinEventSchema);
    }

    @get('/bid-win-event-schemas/count')
    @response(200, {
        description: 'BidWinEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(bidwinevents) where?: Where<bidwinevents>,
    ): Promise<Count> {
        return this.bidWinEventSchemaRepository.count(where);
    }

    @get('/bid-win-event-schemas')
    @response(200, {
        description: 'Array of BidWinEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(bidwinevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(bidwinevents) filter?: Filter<bidwinevents>,
    ): Promise<bidwinevents[]> {
        return this.bidWinEventSchemaRepository.find(filter);
    }

    @patch('/bid-win-event-schemas')
    @response(200, {
        description: 'BidWinEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bidwinevents, {partial: true}),
                },
            },
        })
            bidWinEventSchema: bidwinevents,
        @param.where(bidwinevents) where?: Where<bidwinevents>,
    ): Promise<Count> {
        return this.bidWinEventSchemaRepository.updateAll(bidWinEventSchema, where);
    }

    @get('/bid-win-event-schemas/{id}')
    @response(200, {
        description: 'BidWinEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(bidwinevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(bidwinevents, {exclude: 'where'}) filter?: FilterExcludingWhere<bidwinevents>
    ): Promise<bidwinevents> {
        return this.bidWinEventSchemaRepository.findById(id, filter);
    }

    @patch('/bid-win-event-schemas/{id}')
    @response(204, {
        description: 'BidWinEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(bidwinevents, {partial: true}),
                },
            },
        })
            bidWinEventSchema: bidwinevents,
    ): Promise<void> {
        await this.bidWinEventSchemaRepository.updateById(id, bidWinEventSchema);
    }

    @put('/bid-win-event-schemas/{id}')
    @response(204, {
        description: 'BidWinEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() bidWinEventSchema: bidwinevents,
    ): Promise<void> {
        await this.bidWinEventSchemaRepository.replaceById(id, bidWinEventSchema);
    }

    @del('/bid-win-event-schemas/{id}')
    @response(204, {
        description: 'BidWinEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.bidWinEventSchemaRepository.deleteById(id);
    }
}
