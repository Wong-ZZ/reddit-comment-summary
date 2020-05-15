import { SubmissionInfo } from '../components/searchDisplay/Main';

const BACKEND_URL = "http://localhost:8000/";

type FetchOptions = {
  method: string
};

export async function getPastQueries(submissionID: string): Promise<SubmissionInfo[]> {
  const resp = await makeRequest(`submissions/${submissionID}/`, {method: "GET"});
  if (!resp || !resp.ok) {
    return [];
  }
  const submissionsInfo: SubmissionInfo[] = await resp.json();
  return submissionsInfo;
}

// export async function getIndividualQuery(queryID: number): Promise<any | null> {
//   const resp = await makeRequest(`query/${queryID}/`, {method: "GET"});
//   if (!resp || !resp.ok) {
//     return null;
//   }
//   const queryInfo = await resp.json();
//   return queryInfo;
// }

export async function postQuery(submissionID: string): Promise<SubmissionInfo | null> {
  const resp = await makeRequest(`submissions/${submissionID}/`, {method: "POST"});
  if (!resp || !resp.ok) {
    return null;
  }
  const submissionInfo = await resp.json();
  return submissionInfo;
}

async function makeRequest(fetchPath: string, options: FetchOptions) {
  const resp = await fetch(`${BACKEND_URL}${fetchPath}`, options);
  return resp
}