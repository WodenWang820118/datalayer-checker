import axios from 'axios';

export const baseUrl = `http://localhost:8000/api`;

export const project = axios.create({ baseURL: baseUrl + '/waiter-project' });
export const qa = axios.create({ baseURL: baseUrl + '/waiter-qa' });
export const dataLayer = axios.create({
  baseURL: baseUrl + '/waiter-datalayer',
});
export const gtm = axios.create({
  baseURL: baseUrl + '/waiter-gtm-operator',
});
export const specParser = axios.create({
  baseURL: baseUrl + '/waiter-spec-parser',
});

export default {
  project,
  qa,
  dataLayer,
  gtm,
  specParser,
};
