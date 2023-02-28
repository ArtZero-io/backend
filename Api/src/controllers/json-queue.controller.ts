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
import {jsonqueues} from '../models';
import {JsonQueueSchemaRepository} from '../repositories';

class JsonQueueController {
    constructor(
        @repository(JsonQueueSchemaRepository)
        public jsonQueueSchemaRepository: JsonQueueSchemaRepository,
    ) {
    }

    @post('/json-queue-schemas')
    @response(200, {
        description: 'JsonQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(jsonqueues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(jsonqueues, {
                        title: 'NewJsonQueueSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            jsonQueueSchema: Omit<jsonqueues, '_id'>,
    ): Promise<jsonqueues> {
        return this.jsonQueueSchemaRepository.create(jsonQueueSchema);
    }

    @get('/json-queue-schemas/count')
    @response(200, {
        description: 'JsonQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(jsonqueues) where?: Where<jsonqueues>,
    ): Promise<Count> {
        return this.jsonQueueSchemaRepository.count(where);
    }

    @get('/json-queue-schemas')
    @response(200, {
        description: 'Array of JsonQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(jsonqueues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(jsonqueues) filter?: Filter<jsonqueues>,
    ): Promise<jsonqueues[]> {
        return this.jsonQueueSchemaRepository.find(filter);
    }

    @patch('/json-queue-schemas')
    @response(200, {
        description: 'JsonQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(jsonqueues, {partial: true}),
                },
            },
        })
            jsonQueueSchema: jsonqueues,
        @param.where(jsonqueues) where?: Where<jsonqueues>,
    ): Promise<Count> {
        return this.jsonQueueSchemaRepository.updateAll(jsonQueueSchema, where);
    }

    @get('/json-queue-schemas/{id}')
    @response(200, {
        description: 'JsonQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(jsonqueues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(jsonqueues, {exclude: 'where'}) filter?: FilterExcludingWhere<jsonqueues>
    ): Promise<jsonqueues> {
        return this.jsonQueueSchemaRepository.findById(id, filter);
    }

    @patch('/json-queue-schemas/{id}')
    @response(204, {
        description: 'JsonQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(jsonqueues, {partial: true}),
                },
            },
        })
            jsonQueueSchema: jsonqueues,
    ): Promise<void> {
        await this.jsonQueueSchemaRepository.updateById(id, jsonQueueSchema);
    }

    @put('/json-queue-schemas/{id}')
    @response(204, {
        description: 'JsonQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() jsonQueueSchema: jsonqueues,
    ): Promise<void> {
        await this.jsonQueueSchemaRepository.replaceById(id, jsonQueueSchema);
    }

    @del('/json-queue-schemas/{id}')
    @response(204, {
        description: 'JsonQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.jsonQueueSchemaRepository.deleteById(id);
    }
}
