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
import {imagequeues} from '../models';
import {ImageQueueSchemaRepository} from '../repositories';

class ImageQueueController {
    constructor(
        @repository(ImageQueueSchemaRepository)
        public imageQueueSchemaRepository: ImageQueueSchemaRepository,
    ) {
    }

    @post('/image-queue-schemas')
    @response(200, {
        description: 'ImageQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(imagequeues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(imagequeues, {
                        title: 'NewImageQueueSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            imageQueueSchema: Omit<imagequeues, '_id'>,
    ): Promise<imagequeues> {
        return this.imageQueueSchemaRepository.create(imageQueueSchema);
    }

    @get('/image-queue-schemas/count')
    @response(200, {
        description: 'ImageQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(imagequeues) where?: Where<imagequeues>,
    ): Promise<Count> {
        return this.imageQueueSchemaRepository.count(where);
    }

    @get('/image-queue-schemas')
    @response(200, {
        description: 'Array of ImageQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(imagequeues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(imagequeues) filter?: Filter<imagequeues>,
    ): Promise<imagequeues[]> {
        return this.imageQueueSchemaRepository.find(filter);
    }

    @patch('/image-queue-schemas')
    @response(200, {
        description: 'ImageQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(imagequeues, {partial: true}),
                },
            },
        })
            imageQueueSchema: imagequeues,
        @param.where(imagequeues) where?: Where<imagequeues>,
    ): Promise<Count> {
        return this.imageQueueSchemaRepository.updateAll(imageQueueSchema, where);
    }

    @get('/image-queue-schemas/{id}')
    @response(200, {
        description: 'ImageQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(imagequeues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(imagequeues, {exclude: 'where'}) filter?: FilterExcludingWhere<imagequeues>
    ): Promise<imagequeues> {
        return this.imageQueueSchemaRepository.findById(id, filter);
    }

    @patch('/image-queue-schemas/{id}')
    @response(204, {
        description: 'ImageQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(imagequeues, {partial: true}),
                },
            },
        })
            imageQueueSchema: imagequeues,
    ): Promise<void> {
        await this.imageQueueSchemaRepository.updateById(id, imageQueueSchema);
    }

    @put('/image-queue-schemas/{id}')
    @response(204, {
        description: 'ImageQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() imageQueueSchema: imagequeues,
    ): Promise<void> {
        await this.imageQueueSchemaRepository.replaceById(id, imageQueueSchema);
    }

    @del('/image-queue-schemas/{id}')
    @response(204, {
        description: 'ImageQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.imageQueueSchemaRepository.deleteById(id);
    }
}
