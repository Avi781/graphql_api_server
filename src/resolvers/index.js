import { GraphQLLong, GraphQLJSON } from 'graphql-scalars';
import Query from './query.js';
import NodeObject from './nodeObject.js';
import { db } from '../data_db.js';

const Action = {
  resourceTemplate: (parent) => parent.resourceTemplateId ? db.idx.resourceTemplate.get(String(parent.resourceTemplateId)) : null,
};

const Trigger = {
  resourceTemplate: (parent) => parent.resourceTemplateId ? db.idx.resourceTemplate.get(String(parent.resourceTemplateId)) : null,
};

const Response = {
  // pass-through; platforms resolved in ResponsePlatform if we need transformation
};

const ResponsePlatform = {
  localeGroups: (parent) => {
    const groups = parent.localeGroups || [];
    return groups.map(g => ({
      localeGroupId: g.localeGroup ?? g.localeGroupId ?? null,
      variations: g.variations || [],
    }));
  },
};

export default {
  Long: GraphQLLong,
  JSON: GraphQLJSON,
  Query,
  NodeObject,
  Action,
  Trigger,
  Response,
  ResponsePlatform,
};
