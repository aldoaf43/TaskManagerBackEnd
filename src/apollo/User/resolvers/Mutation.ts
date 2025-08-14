import type {
  MutationUpdateUserArgs,
  MutationUserArgs,
} from '@/generated/graphql';
import type { ApolloContext } from '@/models';
import type { UserDocument } from '@/models/appModels/User';

export default {
  async user(
    _: never,
    _args: MutationUserArgs,
    context: ApolloContext
  ): Promise<UserDocument> {
    const user = new context.db.users({ ..._args.input });
    await user.save();
    return user;
  },

  async updateUser(
    _: unknown,
    _args: MutationUpdateUserArgs,
    context: ApolloContext
  ): Promise<UserDocument> {
    const { id, input } = _args;
    const user = await context.db.users.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
};
