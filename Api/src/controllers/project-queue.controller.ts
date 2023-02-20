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
import {projectqueues} from '../models';
import {ProjectQueueSchemaRepository, ProjectsSchemaRepository} from '../repositories';

class ProjectQueueController {
    constructor(
        @repository(ProjectQueueSchemaRepository)
        public projectQueueSchemaRepository: ProjectQueueSchemaRepository,
    ) {
    }

    @post('/project-queue-schemas')
    @response(200, {
        description: 'ProjectQueueSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(projectqueues)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(projectqueues, {
                        title: 'NewProjectQueueSchema',
                        exclude: ['id'],
                    }),
                },
            },
        })
            projectQueueSchema: Omit<projectqueues, 'id'>,
    ): Promise<projectqueues> {
        return this.projectQueueSchemaRepository.create(projectQueueSchema);
    }

    @get('/project-queue-schemas/count')
    @response(200, {
        description: 'ProjectQueueSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(projectqueues) where?: Where<projectqueues>,
    ): Promise<Count> {
        return this.projectQueueSchemaRepository.count(where);
    }

    @get('/project-queue-schemas')
    @response(200, {
        description: 'Array of ProjectQueueSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(projectqueues, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(projectqueues) filter?: Filter<projectqueues>,
    ): Promise<projectqueues[]> {
        return this.projectQueueSchemaRepository.find(filter);
    }

    @patch('/project-queue-schemas')
    @response(200, {
        description: 'ProjectQueueSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(projectqueues, {partial: true}),
                },
            },
        })
            projectQueueSchema: projectqueues,
        @param.where(projectqueues) where?: Where<projectqueues>,
    ): Promise<Count> {
        return this.projectQueueSchemaRepository.updateAll(projectQueueSchema, where);
    }

    @get('/project-queue-schemas/{id}')
    @response(200, {
        description: 'ProjectQueueSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(projectqueues, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(projectqueues, {exclude: 'where'}) filter?: FilterExcludingWhere<projectqueues>
    ): Promise<projectqueues> {
        return this.projectQueueSchemaRepository.findById(id, filter);
    }

    @patch('/project-queue-schemas/{id}')
    @response(204, {
        description: 'ProjectQueueSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(projectqueues, {partial: true}),
                },
            },
        })
            projectQueueSchema: projectqueues,
    ): Promise<void> {
        await this.projectQueueSchemaRepository.updateById(id, projectQueueSchema);
    }

    @put('/project-queue-schemas/{id}')
    @response(204, {
        description: 'ProjectQueueSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() projectQueueSchema: projectqueues,
    ): Promise<void> {
        await this.projectQueueSchemaRepository.replaceById(id, projectQueueSchema);
    }

    @del('/project-queue-schemas/{id}')
    @response(204, {
        description: 'ProjectQueueSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.projectQueueSchemaRepository.deleteById(id);
    }
}
