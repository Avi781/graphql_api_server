import { GraphQLError } from 'graphql';
import { getNodeByAnyId } from '../data_db.js';

export default {
  node: async (_parent, args, ctx) => {
    if (!ctx.user) {
      throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHENTICATED' } });
    }
    const { nodeId } = args;
    const node = getNodeByAnyId(nodeId);
    if (!node) return null;
    return node;
  },
};
