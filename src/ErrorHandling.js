const ErrorHandling = (error) => {
    const errorResponse = error.response;
    const {status, data} = errorResponse;
    console.log(status, data);
    const errorObject = {};
    switch (status) {
        case 400:
            if (data instanceof Array) {
                data.forEach(err => {
                    errorObject[err.field] = err.message;
                });
            }
            return errorObject;
        case 500:
            break;
    
        default:
            break;
    }
};
export default ErrorHandling;