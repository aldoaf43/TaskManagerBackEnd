import type { Document, Model, Mongoose, Types } from 'mongoose';

type User = {
  _id: Types.ObjectId;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
};

const MODEL_NAME = 'User';

export type UserDocument = Document<Types.ObjectId> & User;

export type UserModel = ReturnType<typeof createUsersModel>;

export function createUsersModel(mongoose: Mongoose) {
  const schema = new mongoose.Schema<User>(
    {
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      phone: { type: String, required: true },
      profileImage: { type: String, required: false },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  const model =
    mongoose.models[MODEL_NAME] ?? mongoose.model(MODEL_NAME, schema);

  return model as Model<
    User,
    object,
    object,
    object,
    UserDocument,
    typeof schema
  >;
}
