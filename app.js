const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single('myImage');

app.use(express.static('./uploads'));

// Root endpoint is index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for uploading images
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send(err);
    } else {
      res.send('File uploaded successfully');
    }
  });
});

// Route for displaying images
app.get('/images/:image', (req, res) => {
  fs.readFile(`./uploads/${req.params.image}`, (err, data) => {
    if (err) res.status(404).send('Not found');
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data);
  });
});

   /* Create manifest
   const manifest = new ManifestBuilder({
    claim_generator: "CAI_Node_Demo/0.1",
    format: 'image/jpeg',
    title: 'Locally signed test image',
    assertions: [
      {
        label: 'c2pa.actions',
        data: {
          actions: [
            {
              action: 'c2pa.created',
            }
          ]
        }
      }
    ]
  });
  */

  /* Read manifest
  async function readManifest(path, mimeType) {
    const buffer = await readFile(path);
    const result = await c2pa.read({ buffer });
  
    if (result) {
      const { active_manifest, manifests, validation_status } = result;
      console.log(active_manifest);
      report = active_manifest;
    } else {
      console.log('No claim found');
    }
  } //readManifest 
  */

  /*  Sign asset
  async function sign(asset, manifest) {  
    const signer = await createTestSigner();
    const c2pa = createC2pa({signer});
    return c2pa.sign({
      asset,
      manifest,
    });
  } // sign
  */

  /* Sign the claim for asset with specified manifest
  const buffer = await readFile( filePath );
  const asset = { buffer, mimeType: 'image/jpeg' }; 
  const { signedAsset, signedManifest } = await sign(asset, manifest);  

  
  // Read the manifest for the signed asset, setting the value of report
 // readManifest(filePath, 'image/jpeg');

  // Send response
  res.set("Content-Type", "image/jpeg");
  res.send(signedAsset.buffer);
  */ 


/*
} catch (err) {
  console.log(err);
  // return errors to the client
  res.status(500).send(err);
}
});
*/

app.listen(port, () =>  {
  console.log(`Server started on port ${port}`); 
  console.log(`To view the app, open http://localhost:${port}`);
});
