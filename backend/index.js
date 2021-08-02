/*
  dependencies
*/

  const express = require('express')
  const admin = require('firebase-admin')
  let inspect = require('util').inspect
  let Busboy = require('busboy')

/*
  config - express
*/

  const app = express()

/*
  config - firebase
  
*/

  const serviceAccount = require('./serviceAccountKey.json')
    
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore()

/*
  endpoint - posts
*/
  app.get('/posts', (request, response) => {
    // CORS 세팅 : 모든 origin에 대해 모두 허용
    response.set('Access-Control-Allow-Origin', '*')

    let posts = []

    db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
      snapshot.forEach((doc) => {
        posts.push(doc.data())
      });
      response.send(posts)
    })
  })

/*
  endpoint - createPost
*/
  app.post('/createPost', (request, response) => {
    // CORS 세팅 : 모든 origin에 대해 모두 허용
    response.set('Access-Control-Allow-Origin', '*')
    
    var busboy = new Busboy({ headers: request.headers })

    let fields = {}

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      })
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished')
      })
    })

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      fields[fieldname] = val
    })

    busboy.on('finish', function() {
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/aestagram-kwak.appspot.com/o/dog2.jpg?alt=media&token=7b17d815-7aa8-4053-87f1-bd42796b9fb6'
      })
      response.send('Done parsing form!')
    })

    request.pipe(busboy)
  })

/*
  listen
*/
// const port = 3000 app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
app.listen(process.env.PORT || 3000)