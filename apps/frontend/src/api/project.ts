import api from '@/config/api';

export const setRootProjectFolder = (payload: { rootProjectPath: string }) =>
  api.project
    .get(`/set-root-project-folder`, {
      params: payload,
    })
    .then((res) => res.data);

export const initProject = (payload: { projectName: string }) =>
  api.project
    .get(`/init-project`, {
      params: payload,
    })
    .then((res) => res.data);

export const setProject = (payload: { projectName: string }) =>
  api.project
    .get(`/set-project`, {
      params: payload,
    })
    .then((res) => res.data);

export const readImage = (payload: { projectName: string; testName: string }) =>
  api.project
    .get(`/read-image`, {
      params: payload,
    })
    .then((res) => res.data);

export const readReport = (payload: {
  projectName: string;
  reportName: string;
}) =>
  api.project
    .get(`/read-image`, {
      params: payload,
    })
    .then((res) => res.data);

export const getProjects = () =>
  api.project.get(`/projects`).then((res) => res.data);

export const getProjectRecordings = (payload: { projectName: string }) =>
  api.project
    .get(`/projects/recordings`, {
      params: payload,
    })
    .then((res) => res.data);

export const getReports = (payload: {
  projectName: string;
  testName: string;
}) => api.project.get(`/projects`, { params: payload }).then((res) => res.data);
