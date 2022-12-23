const express = require("express");
const { handleErrors, AppError } = require("./helpers/error");
const { sequelize } = require("./models");
const app = express();
const v1 = require("./routers/v1");

app.use(express.json());

// Sync cái model của sequelize với DB
sequelize.sync({ alter: true });

app.use("/api/v1", v1);

// Demo handle error
app.get("/error", (req, res, next) => {
  // Cách 1
  throw new AppError(500, "Internal Server");
  // Cách 2
  //   next(new AppError(500, "Internal Server"));
});

// Đây là middle ware dùng để bắt và xử lý trả lỗi ra cho client
// Phải được đặt bên dưới các router
app.use(handleErrors);
const port = 4000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
