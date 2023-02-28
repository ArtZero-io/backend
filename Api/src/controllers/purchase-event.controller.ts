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
import {purchaseevents} from '../models';
import {PurchaseEventSchemaRepository} from '../repositories';

class PurchaseEventController {
    constructor(
        @repository(PurchaseEventSchemaRepository)
        public purchaseEventSchemaRepository: PurchaseEventSchemaRepository,
    ) {
    }

    @post('/purchase-event-schemas')
    @response(200, {
        description: 'PurchaseEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(purchaseevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(purchaseevents, {
                        title: 'NewPurchaseEventSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            purchaseEventSchema: Omit<purchaseevents, '_id'>,
    ): Promise<purchaseevents> {
        return this.purchaseEventSchemaRepository.create(purchaseEventSchema);
    }

    @get('/purchase-event-schemas/count')
    @response(200, {
        description: 'PurchaseEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(purchaseevents) where?: Where<purchaseevents>,
    ): Promise<Count> {
        return this.purchaseEventSchemaRepository.count(where);
    }

    @get('/purchase-event-schemas')
    @response(200, {
        description: 'Array of PurchaseEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(purchaseevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(purchaseevents) filter?: Filter<purchaseevents>,
    ): Promise<purchaseevents[]> {
        return this.purchaseEventSchemaRepository.find(filter);
    }

    @patch('/purchase-event-schemas')
    @response(200, {
        description: 'PurchaseEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(purchaseevents, {partial: true}),
                },
            },
        })
            purchaseEventSchema: purchaseevents,
        @param.where(purchaseevents) where?: Where<purchaseevents>,
    ): Promise<Count> {
        return this.purchaseEventSchemaRepository.updateAll(purchaseEventSchema, where);
    }

    @get('/purchase-event-schemas/{id}')
    @response(200, {
        description: 'PurchaseEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(purchaseevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(purchaseevents, {exclude: 'where'}) filter?: FilterExcludingWhere<purchaseevents>
    ): Promise<purchaseevents> {
        return this.purchaseEventSchemaRepository.findById(id, filter);
    }

    @patch('/purchase-event-schemas/{id}')
    @response(204, {
        description: 'PurchaseEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(purchaseevents, {partial: true}),
                },
            },
        })
            purchaseEventSchema: purchaseevents,
    ): Promise<void> {
        await this.purchaseEventSchemaRepository.updateById(id, purchaseEventSchema);
    }

    @put('/purchase-event-schemas/{id}')
    @response(204, {
        description: 'PurchaseEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() purchaseEventSchema: purchaseevents,
    ): Promise<void> {
        await this.purchaseEventSchemaRepository.replaceById(id, purchaseEventSchema);
    }

    @del('/purchase-event-schemas/{id}')
    @response(204, {
        description: 'PurchaseEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.purchaseEventSchemaRepository.deleteById(id);
    }
}
