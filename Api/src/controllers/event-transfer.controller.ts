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
import {EventTransfer} from '../models';
import {EventTransferRepository} from '../repositories';

export class EventTransferController {
  constructor(
    @repository(EventTransferRepository)
    public eventTransferRepository : EventTransferRepository,
  ) {}

  @post('/event-transfers')
  @response(200, {
    description: 'EventTransfer model instance',
    content: {'application/json': {schema: getModelSchemaRef(EventTransfer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: "array",
            items: getModelSchemaRef(EventTransfer, {
              title: 'NewEventTransfer',
              exclude: ['_id'],
            })
          },
        },
      },
    })
    eventTransfer: [Omit<EventTransfer, 'id'>],
  ): Promise<EventTransfer[]> {
    return await this.eventTransferRepository.createAll(eventTransfer);
  }

  @get('/event-transfers/count')
  @response(200, {
    description: 'EventTransfer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EventTransfer) where?: Where<EventTransfer>,
  ): Promise<Count> {
    return this.eventTransferRepository.count(where);
  }

  @get('/event-transfers')
  @response(200, {
    description: 'Array of EventTransfer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EventTransfer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EventTransfer) filter?: Filter<EventTransfer>,
  ): Promise<EventTransfer[]> {
    return this.eventTransferRepository.find(filter);
  }

  @patch('/event-transfers')
  @response(200, {
    description: 'EventTransfer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventTransfer, {partial: true}),
        },
      },
    })
    eventTransfer: EventTransfer,
    @param.where(EventTransfer) where?: Where<EventTransfer>,
  ): Promise<Count> {
    return this.eventTransferRepository.updateAll(eventTransfer, where);
  }

  @get('/event-transfers/{id}')
  @response(200, {
    description: 'EventTransfer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EventTransfer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EventTransfer, {exclude: 'where'}) filter?: FilterExcludingWhere<EventTransfer>
  ): Promise<EventTransfer> {
    return this.eventTransferRepository.findById(id, filter);
  }

  @patch('/event-transfers/{id}')
  @response(204, {
    description: 'EventTransfer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventTransfer, {partial: true}),
        },
      },
    })
    eventTransfer: EventTransfer,
  ): Promise<void> {
    await this.eventTransferRepository.updateById(id, eventTransfer);
  }

  @put('/event-transfers/{id}')
  @response(204, {
    description: 'EventTransfer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() eventTransfer: EventTransfer,
  ): Promise<void> {
    await this.eventTransferRepository.replaceById(id, eventTransfer);
  }

  @del('/event-transfers/{id}')
  @response(204, {
    description: 'EventTransfer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventTransferRepository.deleteById(id);
  }
}
