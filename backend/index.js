const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const dbConnect = require("./config/db")
dbConnect();

const todoRouter = require("./routes/todoRouter")

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use("/todos", todoRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});