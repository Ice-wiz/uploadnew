import { useState } from 'react';
import Axios from 'axios';

const uploadFileToS3 = (url, file) => {
  if (!file) {
    return;
  }
  var options = {
    headers: {
      'Content-Type': file.type,
      'Content-Disposition': 'attachment' 
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.info(percentCompleted) 
    }
  };

  Axios.put(url, file, options).then(response => {
    // upload completed
    console.log('File uploaded successfully!');
      console.log('Response:', response.data);
  }).catch(error => {
    // error occurred.
    console.error('Error uploading file:', error);
  });
}

function App() {
  const [file, setFile] = useState();

  const onChangeFile = (e) => {
    if (!(e && e.target.files && e.target.files[0])) {
      return;
    }
    let fileObj = e.target.files[0];
    setFile(fileObj);
  }

  const getSignedUrl = () => {
    if (!file) {
      return;
    }
    let queryParams = {
      fileName: file.name,
      fileType: file.type
    }
    Axios.get("http://localhost:8000/signed-url", {
      params: queryParams
    }).then(result => {
      const signedURI = result.signedRequest;
      console.log(signedURI);
      uploadFileToS3(signedURI, file);
    }).catch(error => {
      console.error('Error getting signed URL:', error);
    });
  }

  return (
    <section>
      <div>Upload File</div>
      <input type="file" onChange={onChangeFile} />
      <button onClick={getSignedUrl}>Upload</button>
    </section>
  );
}

export default App;
