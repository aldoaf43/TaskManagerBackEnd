import deepMerge from 'lodash.merge';

import { resolvers as userResolver } from './User';

const resolvers = deepMerge(userResolver);

export default resolvers;
