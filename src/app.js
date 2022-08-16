const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const app = express();
const port = 3000;

// const whitelist = ["http://127.0.0.1"];
// const corsOptions = {
//     origin : function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1){
//         callback(null, true);
//       } else {
//         callback(new Error("Not Allowed Origin!"));
//       }
//     }
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db connect seccess");
  })
  .catch((err) => {
    console.error(err);
  });
const indexRouter = require("./layers/routers");
app.use("/api", indexRouter);

app.listen(port, () => {
  console.log(port, "진행해주세요");
});
