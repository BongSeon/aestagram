/*
  dependencies
*/

  const express = require('express')

/*
  config - express
*/

  const app = express()

/*
  endpoint
*/
  app.get('/', (request, response) => {
    response.send('I love Mihye SO hard!')
    console.log('Our endpoint is working')
  })

/*
  listen
*/
// const port = 3000 app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)})
app.listen(3000)