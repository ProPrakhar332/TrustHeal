var apiConfig = {
  //baseUrl: "https://jsplquality.jindalsteel.com/arogya",
  baseUrl: 'http://10.0.2.2:8080',
};

export default apiConfig;

export function fileUpload(formData) {
  return fetch(apiConfig.baseUrl + '/file/system/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      return {error: null, response: response};
    })
    .catch(error => {
      return {error: error.response};
    });
}
