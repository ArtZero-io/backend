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
import {images} from '../models';
import {ImagesSchemaRepository} from '../repositories';

class ImagesController {
    constructor(
        @repository(ImagesSchemaRepository)
        public imagesSchemaRepository: ImagesSchemaRepository,
    ) {
    }

    @post('/images-schemas')
    @response(200, {
        description: 'ImagesSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(images)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(images, {
                        title: 'NewImagesSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            imagesSchema: Omit<images, 'id'>,
    ): Promise<images> {
        return this.imagesSchemaRepository.create(imagesSchema);
    }

    @get('/images-schemas/count')
    @response(200, {
        description: 'ImagesSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(images) where?: Where<images>,
    ): Promise<Count> {
        return this.imagesSchemaRepository.count(where);
    }

    @get('/images-schemas')
    @response(200, {
        description: 'Array of ImagesSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(images, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(images) filter?: Filter<images>,
    ): Promise<images[]> {
        return this.imagesSchemaRepository.find(filter);
    }

    @patch('/images-schemas')
    @response(200, {
        description: 'ImagesSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(images, {partial: true}),
                },
            },
        })
            imagesSchema: images,
        @param.where(images) where?: Where<images>,
    ): Promise<Count> {
        return this.imagesSchemaRepository.updateAll(imagesSchema, where);
    }

    @get('/images-schemas/{id}')
    @response(200, {
        description: 'ImagesSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(images, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(images, {exclude: 'where'}) filter?: FilterExcludingWhere<images>
    ): Promise<images> {
        return this.imagesSchemaRepository.findById(id, filter);
    }

    @patch('/images-schemas/{id}')
    @response(204, {
        description: 'ImagesSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(images, {partial: true}),
                },
            },
        })
            imagesSchema: images,
    ): Promise<void> {
        await this.imagesSchemaRepository.updateById(id, imagesSchema);
    }

    @put('/images-schemas/{id}')
    @response(204, {
        description: 'ImagesSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() imagesSchema: images,
    ): Promise<void> {
        await this.imagesSchemaRepository.replaceById(id, imagesSchema);
    }

    @del('/images-schemas/{id}')
    @response(204, {
        description: 'ImagesSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.imagesSchemaRepository.deleteById(id);
    }
}
