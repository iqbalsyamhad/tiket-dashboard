import axios from 'axios';

// Set config defaults when creating the instance
export const APIDream = axios.create({
  baseURL: `http://api.dreamtour.co/api/`,
});

// // Alter defaults after instance has been created
// export const setAuthToken = (token) => {
//   API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };
