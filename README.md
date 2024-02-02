# my-c2pa-node-example

A simple Node.js app using Express and Multer for handling file uploads. This app will save the uploaded images in a directory named uploads and then display them.

To run this app, install the required packages by entering this command:

```
npm install express multer
```

Then, start the server with:

```
node app.js
```

NOTE: This is a very basic implementation and doesn’t include error handling or security measures, so it’s not suitable for a production environment. Always ensure you handle file uploads securely when building real-world applications.

The HTML file contains a form for uploading images and a script for fetching and displaying the images. The images are fetched from the `/images` endpoint and displayed in the images `div`. The `/images` endpoint in the Node.js app returns a list of the uploaded images. 
