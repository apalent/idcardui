import AWS from 'aws-sdk';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const downloadAllImagesFromS3 = async () => {
  const S3_BUCKET = 'idcard-react-image-storage';
  const REGION = 'us-west-2';

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ENV_A,
    secretAccessKey: process.env.REACT_APP_ENV_B,
  });

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  try {
    const listObjectsParams = { Bucket: S3_BUCKET };
    const objects = await s3.listObjects(listObjectsParams).promise();

    for (const obj of objects.Contents) {
      // Download each object (image) from S3 here
      const downloadParams = {
        Bucket: S3_BUCKET,
        Key: obj.Key,
      };

      const data = await s3.getObject(downloadParams).promise();

      // Save the downloaded image to the local machine
      saveAs(new Blob([data.Body], { type: data.ContentType }), obj.Key);

      // Handle the downloaded image data as needed (e.g., display it)
      console.log(`Downloaded image: ${obj.Key}`);
    }
  } catch (error) {
    console.error('Error downloading images from S3:', error);
  }
};

export const downloadFileFromS3 = async (filename) => {
  const S3_BUCKET = 'idcard-react-image-storage';
  const REGION = 'us-west-2';

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ENV_A,
    secretAccessKey: process.env.REACT_APP_ENV_B,
  });

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  try {
    const downloadParams = {
      Bucket: S3_BUCKET,
      Key: filename,
    };

    const data = await s3.getObject(downloadParams).promise();

    // Save the downloaded file to the local machine
    saveAs(new Blob([data.Body], { type: data.ContentType }), filename);

    // Handle the downloaded file (image) data as needed (e.g., display it)
    console.log(`Downloaded file: ${filename}`);
  } catch (error) {
    console.error('Error downloading file from S3:', error);
  }
};
 

export  const fetchDataAndSaveToCSV = async () => {
  await fetch('https://c2nksk2xa3.us-east-1.awsapprunner.com/id_card/')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Create a CSV string using PapaParse
    const csv = Papa.unparse(data);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a download link and trigger a click event
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();

    URL.revokeObjectURL(url);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
  };
