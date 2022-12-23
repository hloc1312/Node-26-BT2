class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// err: instance của AppError => const err = new AppError(500, "message")
const handleErrors = (err, req, res, next) => {
  // Kiếm tra xem err có phải là instance của AppError hay không ?
  // Nếu err là instance của AppError, nghĩa là err là mình đã biết và xử lý
  // Nếu là những lỗi không phải là instance của AppError, thì có thể vì 1 lý do nào đó nó bị lỗi mà mình chưa biết được
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Internal Server");
  }

  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message: message,
  });

  // Nếu có các middleware phía sau, gọi next để đi tới các middleware phía sau
  next();
};

module.exports = {
  AppError,
  handleErrors,
};
