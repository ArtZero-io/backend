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
import {projects} from '../models';
import {ProjectsSchemaRepository} from '../repositories';

class ProjectsController {
    constructor(
        @repository(ProjectsSchemaRepository)
        public projectsSchemaRepository: ProjectsSchemaRepository,
    ) {
    }

    @post('/projects-schemas')
    @response(200, {
        description: 'ProjectsSchema model instance',
        content: {'application/json': {schema: getModelSchemaRef(projects)}},
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(projects, {
                        title: 'NewProjectsSchema',
                        exclude: ['_id'],
                    }),
                },
            },
        })
            projectsSchema: Omit<projects, '_id'>,
    ): Promise<projects> {
        return this.projectsSchemaRepository.create(projectsSchema);
    }

    @get('/projects-schemas/count')
    @response(200, {
        description: 'ProjectsSchema model count',
        content: {'application/json': {schema: CountSchema}},
    })
    async count(
        @param.where(projects) where?: Where<projects>,
    ): Promise<Count> {
        return this.projectsSchemaRepository.count(where);
    }

    @get('/projects-schemas')
    @response(200, {
        description: 'Array of ProjectsSchema model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(projects, {includeRelations: true}),
                },
            },
        },
    })
    async find(
        @param.filter(projects) filter?: Filter<projects>,
    ): Promise<projects[]> {
        return this.projectsSchemaRepository.find(filter);
    }

    @patch('/projects-schemas')
    @response(200, {
        description: 'ProjectsSchema PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(projects, {partial: true}),
                },
            },
        })
            projectsSchema: projects,
        @param.where(projects) where?: Where<projects>,
    ): Promise<Count> {
        return this.projectsSchemaRepository.updateAll(projectsSchema, where);
    }

    @get('/projects-schemas/{id}')
    @response(200, {
        description: 'ProjectsSchema model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(projects, {includeRelations: true}),
            },
        },
    })
    async findById(
        @param.path.string('id') id: string,
        @param.filter(projects, {exclude: 'where'}) filter?: FilterExcludingWhere<projects>
    ): Promise<projects> {
        return this.projectsSchemaRepository.findById(id, filter);
    }

    @patch('/projects-schemas/{id}')
    @response(204, {
        description: 'ProjectsSchema PATCH success',
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(projects, {partial: true}),
                },
            },
        })
            projectsSchema: projects,
    ): Promise<void> {
        await this.projectsSchemaRepository.updateById(id, projectsSchema);
    }

    @put('/projects-schemas/{id}')
    @response(204, {
        description: 'ProjectsSchema PUT success',
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() projectsSchema: projects,
    ): Promise<void> {
        await this.projectsSchemaRepository.replaceById(id, projectsSchema);
    }

    @del('/projects-schemas/{id}')
    @response(204, {
        description: 'ProjectsSchema DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.projectsSchemaRepository.deleteById(id);
    }
}
