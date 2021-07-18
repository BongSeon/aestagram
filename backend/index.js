/*
  dependencies
*/

  const express = require('express')
  const admin = require('firebase-admin');

/*
  config - express
*/

  const app = express()

/*
  config - firebase
  
*/

  const serviceAccount = require('./serviceAccountKey.json');
    
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

/*
  endpoint - posts
*/
  app.get('/posts', (request, response) => {
    let posts = [
      {
        caption: 'Golden Gate Bridge',
        location: 'San Francisco'
      },
      {
        caption: 'London Eye',
        location: 'Londom'
      }
    ]
    response.send(posts)
  })

/*
  listen
*/
// const port = 3000 app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
app.listen(process.env.PORT || 3000)