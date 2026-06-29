const axios = require("axios");

const fetchData = async (endpoint, token) => {
  try {
    if (token) {
      const response = await axios.get(endpoint, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    }
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

const postData = async (endpoint, data, token) => {
  try {
    if (token) {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    }
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

const patchData = async (endpoint, data, token) => {
  try {
    if (token) {
      const response = await axios.patch(endpoint, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    }
    const response = await axios.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};


const deleteData = async (endpoint, token) => {
  try {
    if (token) {
      const response = await axios.delete(endpoint, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    }
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};


module.exports = { fetchData, postData, deleteData, patchData };

