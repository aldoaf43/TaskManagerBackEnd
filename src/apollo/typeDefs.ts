import { rateLimitDirective } from 'graphql-rate-limit-directive';

import defaultTypeDefs from './typeDef.graphql';
import { typeDefs as userTypeDefs } from './User';

const { rateLimitDirectiveTypeDefs } = rateLimitDirective();

const typeDefs = [defaultTypeDefs, rateLimitDirectiveTypeDefs, userTypeDefs];

export default typeDefs;
