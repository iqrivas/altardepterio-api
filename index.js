const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const petitionAPIRouter = require('./routes/api/petitions');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use("/api/petitions", petitionAPIRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})