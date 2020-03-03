import { ObjectType } from 'typeorm';

import Paginator, { Order } from './Paginator';

export interface PagingQuery {
  afterCursor?: string;
  beforeCursor?: string;
  limit?: number;
  order?: Order;
}

export interface PagniationOtions<Entity> {
  query: PagingQuery;
  entity: ObjectType<Entity>;
  alias?: string;
  paginationKeys?: Extract<keyof Entity, string>[];
}

export function buildPaginator<Entity>(options: PagniationOtions<Entity>): Paginator<Entity> {
  const {
    query,
    entity,
    alias = entity.name.toLowerCase(),
    paginationKeys = ['id' as any],
  } = options;

  const paginator = new Paginator(entity, paginationKeys);

  paginator.setAlias(alias);

  if (query.afterCursor) {
    paginator.setAfterCursor(query.afterCursor);
  }

  if (query.beforeCursor) {
    paginator.setBeforeCursor(query.beforeCursor);
  }

  if (query.limit) {
    paginator.setLimit(query.limit);
  }

  if (query.order) {
    paginator.setOrder(query.order);
  }

  return paginator;
}
