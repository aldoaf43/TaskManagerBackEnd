import { Types } from 'mongoose';

import type { ApolloContext } from '@/models';
import type { UserDocument } from '@/models/appModels/User';

export default {
  async user(
    _parent: never,
    _args: { id: string },
    context: ApolloContext
  ): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(_args.id)) {
      throw new Error('Invalid User ID');
    }

    return context.db.users.findById(_args.id);
  },

  async users(
    _parent: never,
    _args: never,
    context: ApolloContext
  ): Promise<UserDocument[]> {
    return context.db.users.find();
  },
};
