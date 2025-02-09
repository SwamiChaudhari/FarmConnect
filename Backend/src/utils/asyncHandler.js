const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    }
}

export default asyncHandler;
// const asyncHandler = (fn) =>  async (req, res, next) => {}