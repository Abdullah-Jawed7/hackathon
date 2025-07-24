class ApiError{
    constructor(
        statusCode,
        message="Something went wrong",
        errors= [],
        stack = ''

    ){ 
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success =false;
        this.errors = errors
        this.stack= stack

    }
}


export {ApiError}