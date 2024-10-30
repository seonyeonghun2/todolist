const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const todos = [];
/* HTTP 요청 : GET, POST, PUT, DELETE, PATCH */
app.get('/todos', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})