export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (process.env.MODE === "DEV") {
    console.error(err);
  } else {
    console.error(err.message);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 && process.env.MODE !== "DEV"
        ? "Something went wrong"
        : err.message,
  });
};
