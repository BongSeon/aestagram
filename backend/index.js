/*
  dependencies
*/

  const express = require('express')

/*
  config - express
*/

  const app = express()

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
app.listen(3000)