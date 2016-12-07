import axios from 'axios'

export function configureToken(authToken){
  axios.defaults.baseURL = '';
  axios.defaults.headers.common['Authorization'] = authToken;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetch (url, responseType) {
  return axios.get(url).then((response) => {
    if(responseType && response.data && response.data[responseType]){
      return response.data
    }else if(responseType && !response.data[responseType])
      throw {code: response.status, msg: "Response error", response: response.data}
    else
      return response.data
  }).catch((error) => {
    if (error.response) {
      throw {code: response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}

export function create (data, url, responseType) {
  return axios.post(url, data).then((response) => {
    if(responseType && response.data[responseType])
      return response.data
    else if(responseType && !response.data[responseType])
      throw {code: response.status, msg: "Response error", response: response.data}
    else
      return response.data
  }).catch((error) => {
    if (error.response) {
      throw {code: response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}

export function update (data, url, responseType) {
  return axios.put(url, data).then((response) => {
    if(responseType && response.data[responseType])
      return response.data
    else if(responseType && !response.data[responseType])
      throw {code: response.status, msg: "Response error", response: response.data}
    else
      return response.data
  }).catch((error) => {
    if (error.response) {
      throw {code: response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}

export function remove (url, responseType) {
  return axios.delete(url).then((response) => {
    if(responseType && response.data[responseType])
      return response.data
    else if(responseType && !response.data[responseType])
      throw {code: response.status, msg: "Response error", response: response.data}
    else
      return response.data
  }).catch((error) => {
    if (error.response) {
      throw {code: response.status, msg: "Petition error", error: error.response.data, headers: error.response.headers}
    } else {
      throw {code: 500, msg: "Server error", error: error}
    }
  });
}
