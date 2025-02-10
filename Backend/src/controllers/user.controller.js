import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
    
    const {fullname , email, password} = req.body;
    console.log(fullname, email, password);
});


export { registerUser };    