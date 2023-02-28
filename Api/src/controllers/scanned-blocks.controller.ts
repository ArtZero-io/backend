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
import {scannedblocks} from '../models';
import {ScannedBlocksSchemaRepository} from '../repositories';

class ScannedBlocksController {
    constructor(
        @repository(ScannedBlocksSchemaRepository)
        public scannedBlocksSchemaRepository: ScannedBlocksSchemaRepository,
    ) {
    }

    @post('/scanned-blocks-schemas')
    @response(200, {
        description: 'ScannedBlocksSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(scannedblocks)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(scannedblocks, {
                        title: 'NewScannedBlocksSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            scannedBlocksSchema: Omit<scannedblocks, '_id'>,
    ): Promise<scannedblocks> {
        return this.scannedBlocksSchemaRepository.create(scannedBlocksSchema);
    }

    @get('/scanned-blocks-schemas/count')
    @response(200, {
        description: 'ScannedBlocksSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(scannedblocks) where?: Where<scannedblocks>,
    ): Promise<Count> {
        return this.scannedBlocksSchemaRepository.count(where);
    }

    @get('/scanned-blocks-schemas')
    @response(200, {
        description: 'Array of ScannedBlocksSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(scannedblocks, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(scannedblocks) filter?: Filter<scannedblocks>,
    ): Promise<scannedblocks[]> {
        return this.scannedBlocksSchemaRepository.find(filter);
    }

    @patch('/scanned-blocks-schemas')
    @response(200, {
        description: 'ScannedBlocksSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(scannedblocks, {partial: true}),
                },
            },
        })
            scannedBlocksSchema: scannedblocks,
        @param.where(scannedblocks) where?: Where<scannedblocks>,
    ): Promise<Count> {
        return this.scannedBlocksSchemaRepository.updateAll(scannedBlocksSchema, where);
    }

    @get('/scanned-blocks-schemas/{id}')
    @response(200, {
        description: 'ScannedBlocksSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(scannedblocks, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(scannedblocks, {exclude: 'where'}) filter?: FilterExcludingWhere<scannedblocks>
    ): Promise<scannedblocks> {
        return this.scannedBlocksSchemaRepository.findById(id, filter);
    }

    @patch('/scanned-blocks-schemas/{id}')
    @response(204, {
        description: 'ScannedBlocksSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(scannedblocks, {partial: true}),
                },
            },
        })
            scannedBlocksSchema: scannedblocks,
    ): Promise<void> {
        await this.scannedBlocksSchemaRepository.updateById(id, scannedBlocksSchema);
    }

    @put('/scanned-blocks-schemas/{id}')
    @response(204, {
        description: 'ScannedBlocksSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() scannedBlocksSchema: scannedblocks,
    ): Promise<void> {
        await this.scannedBlocksSchemaRepository.replaceById(id, scannedBlocksSchema);
    }

    @del('/scanned-blocks-schemas/{id}')
    @response(204, {
        description: 'ScannedBlocksSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.scannedBlocksSchemaRepository.deleteById(id);
    }
}
