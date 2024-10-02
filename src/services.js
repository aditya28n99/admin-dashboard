import axios from 'axios';

const baseURL = 'http://localhost:5000';  // Backend URL

export const signup = async (signupData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, signupData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error during signup');
  }
};

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, loginData);  // Ensure baseURL is correct
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Login endpoint not found (404). Check if the backend URL is correct.');
    }
    throw new Error(error.response?.data?.message || 'Error during login');
  }
};

export const fetchAdmin = async () => {
  try {
    const response = await axios.get(`${baseURL}/admin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin data:', error);
    throw error;
  }
};

export const updateAdmin = async (adminData) => {
  try {
    const response = await axios.put(`${baseURL}/admin`, adminData);
    console.log("admin", adminData);
    console.log("admin resp", response);
    console.log("admin resp data", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating admin data:', error);
    throw error;
  }
};
