export function handleNetworkError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
            case 400:
                return 'Bad Request: Please check your input.';
            case 401:
                return 'Unauthorized: Please log in to continue.';
            case 403:
                return 'Forbidden: You do not have permission to perform this action.';
            case 404:
                return 'Not Found: The requested resource could not be found.';
            case 500:
                return 'Internal Server Error: Please try again later.';
            case 503:
                return 'Service Unavailable: The server is temporarily down.';
            default:
                return `An error occurred: ${error.response.statusText}`;
        }
    } else if (error.request) {
        // The request was made but no response was received
        return 'Network error: Unable to reach the server.';
    } else {
        // Something happened in setting up the request that triggered an Error
        return `Error: ${error.message}`;
    }
}
