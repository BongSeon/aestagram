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
    // CORS 세팅 : 모든 origin에 대해 모두 허용
    response.set('Access-Control-Allow-Origin', '*')

    let posts = []

    db.collection('posts').get().then(snapshot => {
      snapshot.forEach((doc) => {
        posts.push(doc.data())
      });
      response.send(posts)
    })
  })

/*
  listen
*/
// const port = 3000 app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
app.listen(process.env.PORT || 3000)