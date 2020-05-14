import { PostInfo } from '../Main';

const BACKEND_URL = "http://localhost:4001/";

type FetchOptions = {
  method: string
};

export async function getPastQueries(submissionID: string): Promise<PostInfo[]> {
  const resp = await makeRequest(`submissions/${submissionID}/`, {method: "GET"});
  if (!resp || !resp.ok) {
    return [];
  }
  const postsInfo: PostInfo[] = await resp.json();
  return postsInfo;
}

export async function postQuery(submissionID: string): Promise<PostInfo | null> {
  const resp = await makeRequest(`submissions/${submissionID}/`, {method: "POST"});
  if (!resp || !resp.ok) {
    return null;
  }
  const postInfo = await resp.json();
  return postInfo;
}

async function makeRequest(fetchPath: string, options: FetchOptions) {
  const resp = await fetch(`${BACKEND_URL}${fetchPath}`, options);
  return resp
}