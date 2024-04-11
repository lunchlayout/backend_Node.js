class APIError extends Error {
    constructor (public status: number, message: string, public errors: string[] = []) {
        super(message)
    }
    static NotFound(errors?: string[]) {
        return new APIError(404, 'Not Found', errors)
    }
    static BadRequest(errors?: string[]) {
        return new APIError(400, 'Bad Request', errors)
    }
}

export {APIError}