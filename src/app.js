const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const indexRouter = require("./layers/routers");
app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(port, '진행해주세요');
});   