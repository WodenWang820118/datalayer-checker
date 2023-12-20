import api from '@/config/api';

export const inspectSingleEvent = (payload: {
  gtmUrl: string;
  projectName: string;
  testName: string;
  headless: string;
  path?: string;
  username?: string;
  password?: string;
}) =>
  api.gtm.get(`/single-event`, {
    params: payload,
  });
