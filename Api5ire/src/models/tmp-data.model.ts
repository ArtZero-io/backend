import {Entity, model, property} from '@loopback/repository';

@model()
export class TmpData extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  nftName?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'number',
  })
  listed_date?: number;

  @property({
    type: 'number',
  })
  tokenID?: number;

  @property({
    type: 'string',
    required: true,
  })
  nftContractAddress: string;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;
  constructor(data?: Partial<TmpData>) {
    super(data);
  }
}

export interface TmpDataRelations {
  // describe navigational properties here
}

export type TmpDataWithRelations = TmpData & TmpDataRelations;
