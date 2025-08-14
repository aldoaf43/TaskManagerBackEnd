import type { Response } from 'express';

import type { TaskManager } from '@/models';

export type ApolloContext = {
  db: TaskManager;
  res: Response;
};
