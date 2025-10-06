const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  POSTS: `${API_BASE_URL}/posts/`,
  MY_POSTS: `${API_BASE_URL}/my-posts/`,

  COMMENTS: `${API_BASE_URL}/comments/`,
  MY_COMMENTS: `${API_BASE_URL}/my-comments/`,

  USERS: `${API_BASE_URL}/users/`,

  PROFILE: `${API_BASE_URL}/edit-profile/`,
  MY_PROFILE: `${API_BASE_URL}/my-profile/`,

  LOGIN: `${API_BASE_URL}/token/`,
  CREATE_ACCOUNT: `${API_BASE_URL}/create-account/`,
};

export default API;
