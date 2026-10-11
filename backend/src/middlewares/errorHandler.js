const errorHandler = (err, req, res, next) => {
  // 1. Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((error) => error.message);

    return res.status(400).json({
      message: "Validation failed",
      errors: messages,
    });
  }

  // 2. Duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];

    return res.status(409).json({
      message: `${field || "Value"} already exists`,
    });
  }

  // 3. Invalid ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  // 4. Unexpected errors
  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};

export default errorHandler;
