var apiConfig = {
  baseUrl: 'http://10.0.2.2:8080', //local
  // baseUrl: 'http://trustheal.in:11001', //server
  zegoCloudAppId: 40130663,
  zegoCloudAppSign:
    'e6b0c9cafc50e47d9f9dfd56abd1765e0f0efdf7595b32cefceed2770dc2bffb',
};

export default apiConfig;

export function fileUpload(formData) {
  return fetch(apiConfig.baseUrl + '/file/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      // console.log(':::::::::Log 1::::', response);

      return response.json();
    })
    .then(response => {
      //console.log(':::::::Log 2::::', response);
      return {error: null, response: response};
    })
    .catch(error => {
      return {error: error.response};
    });
}
