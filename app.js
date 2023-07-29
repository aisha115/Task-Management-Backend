const express = require('express')
const app = express();
require('express-async-errors')
const routes = require('./routes/task')
const connectDB = require("./db/connect");

const cors = require("cors");

app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
  res.json({res:"Success"})
})

app.use('/api/v1/tasks/',routes)

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3003, () =>
      console.log(`Server is listening on port 3003...`)
    );
  } catch (error) {
    console.log(error);
  }
};


start()