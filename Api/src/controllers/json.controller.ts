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
import {jsons} from '../models';
import {JsonSchemaRepository} from '../repositories';

class JsonController {
    constructor(
        @repository(JsonSchemaRepository)
        public jsonSchemaRepository: JsonSchemaRepository,
    ) {
    }

    @post('/json-schemas')
    @response(200, {
        description: 'JsonSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(jsons)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(jsons, {
                        title: 'NewJsonSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            jsonSchema: Omit<jsons, 'id'>,
    ): Promise<jsons> {
        return this.jsonSchemaRepository.create(jsonSchema);
    }

    @get('/json-schemas/count')
    @response(200, {
        description: 'JsonSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(jsons) where?: Where<jsons>,
    ): Promise<Count> {
        return this.jsonSchemaRepository.count(where);
    }

    @get('/json-schemas')
    @response(200, {
        description: 'Array of JsonSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(jsons, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(jsons) filter?: Filter<jsons>,
    ): Promise<jsons[]> {
        return this.jsonSchemaRepository.find(filter);
    }

    @patch('/json-schemas')
    @response(200, {
        description: 'JsonSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(jsons, {partial: true}),
                },
            },
        })
            jsonSchema: jsons,
        @param.where(jsons) where?: Where<jsons>,
    ): Promise<Count> {
        return this.jsonSchemaRepository.updateAll(jsonSchema, where);
    }

    @get('/json-schemas/{id}')
    @response(200, {
        description: 'JsonSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(jsons, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(jsons, {exclude: 'where'}) filter?: FilterExcludingWhere<jsons>
    ): Promise<jsons> {
        return this.jsonSchemaRepository.findById(id, filter);
    }

    @patch('/json-schemas/{id}')
    @response(204, {
        description: 'JsonSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(jsons, {partial: true}),
                },
            },
        })
            jsonSchema: jsons,
    ): Promise<void> {
        await this.jsonSchemaRepository.updateById(id, jsonSchema);
    }

    @put('/json-schemas/{id}')
    @response(204, {
        description: 'JsonSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() jsonSchema: jsons,
    ): Promise<void> {
        await this.jsonSchemaRepository.replaceById(id, jsonSchema);
    }

    @del('/json-schemas/{id}')
    @response(204, {
        description: 'JsonSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.jsonSchemaRepository.deleteById(id);
    }
}
