const validate = (request, response, next) => {
    const validationResult = validator.validationResult(request);
    if (!validationResult.isEmpty()) {
        return response.status(422).json({ error: 'Invalid request' });
    }
    request.validated = validator.matchedData(request);
    next();
};

export default validate;
