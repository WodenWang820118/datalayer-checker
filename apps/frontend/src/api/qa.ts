import api from '@/config/api';

export const inspectSingleEvent = (payload: {
  projectName: string;
  testName: string;
  headless: string;
  measurementId?: string;
  path?: string;
  username?: string;
  password?: string;
}) =>
  api.qa.get(`/single-event`, {
    params: payload,
  });

export const inspectProject = (payload: {
  projectName: string;
  headless: string;
  measurementId: string;
  path: string;
  args: string[];
  username: string;
  password: string;
  concurrency: string;
}) =>
  api.qa.get(`/project`, {
    params: payload,
  });
