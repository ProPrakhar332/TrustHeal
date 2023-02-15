var apiConfig = {
  //baseUrl: "https://jsplquality.jindalsteel.com/arogya",
  baseUrl: 'http://10.0.2.2:8080',
  //baseUrl: 'http://103.25.174.53:8080',
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
