import type { Document, Model, Mongoose, Types } from 'mongoose';

export type Task = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  user: Types.ObjectId;
  dueDate?: Date;
  recurrent?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    interval: number;
  };
  reminders?: Date[];
};

const MODEL_NAME = 'Task';

export type TaskDocument = Document<Types.ObjectId> & Task;

export type TaskModel = ReturnType<typeof createTasksModel>;

export function createTasksModel(mongoose: Mongoose) {
  const schema = new mongoose.Schema<Task>(
    {
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      dueDate: { type: Date },
      recurrent: {
        frequency: {
          type: String,
          enum: ['daily', 'weekly', 'monthly', 'custom'],
        },
        interval: { type: Number, default: 1 },
      },
      reminders: [{ type: Date }],
    },
    { timestamps: true }
  );

  const model =
    mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema);

  return model as Model<
    Task,
    object,
    object,
    object,
    TaskDocument,
    typeof schema
  >;
}
