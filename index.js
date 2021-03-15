const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const path = require('path');
const petitionAPIRouter = require('./routes/api/petitions');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//CORS
const allowedOrigins = ['http://localhost:3000',
                      'https://iqrivas.github.io'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use("/api/petitions", petitionAPIRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})