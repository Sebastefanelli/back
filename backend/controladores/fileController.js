const s3 = require('../config');

// Subir un archivo a S3
exports.uploadFile = (req, res) => {
  const folder = req.body.folder || 'facultad';
  const fileContent = Buffer.from(req.file.buffer, 'binary');
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${req.file.originalname}`,
    Body: fileContent
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded to S3!');
  });
};

// Obtener la lista de archivos desde S3
exports.getFiles = (req, res) => {
  const folder = req.params.folder || 'facultad';
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: folder + '/'
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    const files = data.Contents.map(item => item.Key);
    res.send(files);
  });
};
