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
import {imageremovequeues} from '../models';
import {ImageRemoveQueueSchemaRepository} from '../repositories';

class ImageRemoveQueueController {
    constructor(
        @repository(ImageRemoveQueueSchemaRepository)
        public imageRemoveQueueSchemaRepository: ImageRemoveQueueSchemaRepository,
    ) {
    }

    @post('/image-remove-queue-schemas')
    @response(200, {
        description: 'ImageRemoveQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(imageremovequeues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(imageremovequeues, {
                        title: 'NewImageRemoveQueueSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            imageRemoveQueueSchema: Omit<imageremovequeues, 'id'>,
    ): Promise<imageremovequeues> {
        return this.imageRemoveQueueSchemaRepository.create(imageRemoveQueueSchema);
    }

    @get('/image-remove-queue-schemas/count')
    @response(200, {
        description: 'ImageRemoveQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(imageremovequeues) where?: Where<imageremovequeues>,
    ): Promise<Count> {
        return this.imageRemoveQueueSchemaRepository.count(where);
    }

    @get('/image-remove-queue-schemas')
    @response(200, {
        description: 'Array of ImageRemoveQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(imageremovequeues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(imageremovequeues) filter?: Filter<imageremovequeues>,
    ): Promise<imageremovequeues[]> {
        return this.imageRemoveQueueSchemaRepository.find(filter);
    }

    @patch('/image-remove-queue-schemas')
    @response(200, {
        description: 'ImageRemoveQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(imageremovequeues, {partial: true}),
                },
            },
        })
            imageRemoveQueueSchema: imageremovequeues,
        @param.where(imageremovequeues) where?: Where<imageremovequeues>,
    ): Promise<Count> {
        return this.imageRemoveQueueSchemaRepository.updateAll(imageRemoveQueueSchema, where);
    }

    @get('/image-remove-queue-schemas/{id}')
    @response(200, {
        description: 'ImageRemoveQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(imageremovequeues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(imageremovequeues, {exclude: 'where'}) filter?: FilterExcludingWhere<imageremovequeues>
    ): Promise<imageremovequeues> {
        return this.imageRemoveQueueSchemaRepository.findById(id, filter);
    }

    @patch('/image-remove-queue-schemas/{id}')
    @response(204, {
        description: 'ImageRemoveQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(imageremovequeues, {partial: true}),
                },
            },
        })
            imageRemoveQueueSchema: imageremovequeues,
    ): Promise<void> {
        await this.imageRemoveQueueSchemaRepository.updateById(id, imageRemoveQueueSchema);
    }

    @put('/image-remove-queue-schemas/{id}')
    @response(204, {
        description: 'ImageRemoveQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() imageRemoveQueueSchema: imageremovequeues,
    ): Promise<void> {
        await this.imageRemoveQueueSchemaRepository.replaceById(id, imageRemoveQueueSchema);
    }

    @del('/image-remove-queue-schemas/{id}')
    @response(204, {
        description: 'ImageRemoveQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.imageRemoveQueueSchemaRepository.deleteById(id);
    }
}
