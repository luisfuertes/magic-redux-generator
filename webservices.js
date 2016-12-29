import axios from 'axios'

export function configureToken(authToken){
  axios.defaults.baseURL = '';
  axios.defaults.headers.common['Authorization'] = authToken;
  axios.defaults.headers.post['Content-type'] = 'application/json';
}

export function fetch (url) {
  return axios.get(url).then((response) => {
    if(response.data)
      return response.data
    else
      throw {code: response.status, msg: "Response error", response: response.data}
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}

export function create (data, url) {
  return axios.post(url, data).then((response) => {
    if(response.data)
      return response.data
    else
      throw {code: response.status, msg: "Response error", response: response.data}
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}

export function update (data, url, ) {
  return axios.put(url, data).then((response) => {
    if(response.data)
      return response.data
    else
      throw {code: response.status, msg: "Response error", response: response.data}
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}

export function remove (url) {
  return axios.delete(url).then((response) => {
    if(response.data)
      return response.data
    else
      throw {code: response.status, msg: "Response error", response: response.data}
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}
