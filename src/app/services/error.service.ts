export class ErrorFormattingService {

  formatError(err: any) {
    // Check if the error is a mongoose error
    console.log("error name => ", err.name)
    if (err.name === "ValidationError") {
      const errors: any = {};

      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      const message = "Validation Error";
      return {
        errors,
        type: message,
        statusCode: 400,
      };
    }
    if (err.code) {
      const { message, code } = err;
      switch (code) {
        case 11000:
          const errors: any = {};

          const key = Object.keys(err.keyValue)[0];
          errors[key] = `The ${key} already exists`;
          const message = "Validation Error";
          return {
            errors,
            type: message,
            statusCode: 400,
          };
        default:
          return {
            errors: [{ message: err.message }],
            statusCode: 400,
            type: "db",
          };
      }
    }

    // Check if the error is a custom error
    if (err.message === "Invalid credentials") {
      return {
        statusCode: 401,
        message: [err.message],
      };
    }
    
    if (err.message === "Not Found") {
      return {
        statusCode: 404,
        message: ["Not Found"],
      };
    }
    
    if (err.message === "No changes") {
      return {
        statusCode: 400,
        type: "db",
        message: ["No changes were detected"],
      };
    }
    
    if (err.message === "This page does not exists") {
      return {
        statusCode: 400,
        type: "db",
        message: [err.message],
      };
    }

    // Check if the error is a custom error
    if (err.message === "forbidden") {
      return {
        statusCode: 403,
        message: ["Your are not authorized to access this route"],
      };
    }

    // Check if the error is a custom error
    if (err.message === "401") {
      return {
        statusCode: 401,
        message: ["Your are not signed in"],
      };
    }

    // Check if the error is a custom error
    if (err.message === "jwt expired") {
      return {
        statusCode: 401,
        message: ["Your are not signed in"],
      };
    }

    return {
      statusCode: 500,
      message: ["Internal server error"],
    };
  }
}
