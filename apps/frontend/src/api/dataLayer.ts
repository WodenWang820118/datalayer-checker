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
  api.dataLayer.get(`/single-event`, {
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
  api.dataLayer.get(`/project`, {
    params: payload,
  });
