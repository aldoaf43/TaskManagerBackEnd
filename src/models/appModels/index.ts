import type { Mongoose } from 'mongoose';

import { createTasksModel, type TaskModel } from './Task';
import { createUsersModel, type UserModel } from './User';

export class Schema {
  users: UserModel;
  tasks: TaskModel;
  constructor(mongoose: Mongoose) {
    this.users = createUsersModel(mongoose);
    this.tasks = createTasksModel(mongoose);
  }
}

export class TaskManager extends Schema {}
