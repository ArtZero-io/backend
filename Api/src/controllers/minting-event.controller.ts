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
import {mintingevents} from '../models';
import {MintingEventSchemaRepository} from '../repositories';

class MintingEventController {
    constructor(
        @repository(MintingEventSchemaRepository)
        public mintingEventSchemaRepository: MintingEventSchemaRepository,
    ) {
    }

    @post('/minting-event-schemas')
    @response(200, {
        description: 'MintingEventSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(mintingevents)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(mintingevents, {
                        title: 'NewMintingEventSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            mintingEventSchema: Omit<mintingevents, 'id'>,
    ): Promise<mintingevents> {
        return this.mintingEventSchemaRepository.create(mintingEventSchema);
    }

    @get('/minting-event-schemas/count')
    @response(200, {
        description: 'MintingEventSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(mintingevents) where?: Where<mintingevents>,
    ): Promise<Count> {
        return this.mintingEventSchemaRepository.count(where);
    }

    @get('/minting-event-schemas')
    @response(200, {
        description: 'Array of MintingEventSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(mintingevents, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(mintingevents) filter?: Filter<mintingevents>,
    ): Promise<mintingevents[]> {
        return this.mintingEventSchemaRepository.find(filter);
    }

    @patch('/minting-event-schemas')
    @response(200, {
        description: 'MintingEventSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(mintingevents, {partial: true}),
                },
            },
        })
            mintingEventSchema: mintingevents,
        @param.where(mintingevents) where?: Where<mintingevents>,
    ): Promise<Count> {
        return this.mintingEventSchemaRepository.updateAll(mintingEventSchema, where);
    }

    @get('/minting-event-schemas/{id}')
    @response(200, {
        description: 'MintingEventSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(mintingevents, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(mintingevents, {exclude: 'where'}) filter?: FilterExcludingWhere<mintingevents>
    ): Promise<mintingevents> {
        return this.mintingEventSchemaRepository.findById(id, filter);
    }

    @patch('/minting-event-schemas/{id}')
    @response(204, {
        description: 'MintingEventSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(mintingevents, {partial: true}),
                },
            },
        })
            mintingEventSchema: mintingevents,
    ): Promise<void> {
        await this.mintingEventSchemaRepository.updateById(id, mintingEventSchema);
    }

    @put('/minting-event-schemas/{id}')
    @response(204, {
        description: 'MintingEventSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() mintingEventSchema: mintingevents,
    ): Promise<void> {
        await this.mintingEventSchemaRepository.replaceById(id, mintingEventSchema);
    }

    @del('/minting-event-schemas/{id}')
    @response(204, {
        description: 'MintingEventSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.mintingEventSchemaRepository.deleteById(id);
    }
}
