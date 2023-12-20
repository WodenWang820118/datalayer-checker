import api from '@/config/api';

export const readTaggingPlan = (payload: { projectName: string }) =>
  api.specParser.get(`/output-gtm-spec`, {
    params: payload,
  });
