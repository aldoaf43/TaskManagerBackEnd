import type { Mongoose } from 'mongoose';

import { createUsers, type UserModel } from './User';

export class Schema {
  users: UserModel;
  constructor(mongoose: Mongoose) {
    this.users = createUsers(mongoose);
  }
}

export class TaskManager extends Schema {}
