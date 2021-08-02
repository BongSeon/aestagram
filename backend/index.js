/*
  dependencies
*/

  const express = require('express')
  const admin = require('firebase-admin')
  let inspect = require('util').inspect
  let Busboy = require('busboy')
  let path = require('path') // path 사용
  let os = require('os') // temp 폴더 접근 
  let fs = require('fs') // temp 폴더에 파일을 실제로 write
  let UUID = require('uuid-v4')

/*
  config - express
*/

  const app = express()

/*
  config - firebase
  
*/

  const serviceAccount = require('./serviceAccountKey.json')
    
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'aestagram-kwak.appspot.com'
  });

  const db = admin.firestore()
  let bucket = admin.storage().bucket()

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
    
    let uuid = UUID()

    var busboy = new Busboy({ headers: request.headers })

    let fields = {}
    let fileData = {}

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
      // /tmp/423423-23423.png
      let filepath = path.join(os.tmpdir(), filename)
      file.pipe(fs.createWriteStream(filepath))
      fileData = { filepath, mimetype }
    })

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      fields[fieldname] = val
    })

    busboy.on('finish', function() {
      // 1. fileUpload
      bucket.upload(
        fileData.filepath,
        {
          uploadType: 'midea',
          metadata: { // for the upload 
            metadata: { // for the file 
              contentType: fileData.mimetype,
              firebaseStorageDownloadTokens: uuid
            }
          }
        },
        (err, uploadedFile) => {
          if (!err) {
            // 2. collection에 doc(데이터) 추가
            createDocument(uploadedFile)
          }
        }
      )
      
      function createDocument(uploadedFile) {
        db.collection('posts').doc(fields.id).set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
        }).then(() => {
          response.send('Post added: ' + fields.id)
        })
      }
    })

    request.pipe(busboy)
  })

/*
  listen
*/
// const port = 3000 app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
app.listen(process.env.PORT || 3000)