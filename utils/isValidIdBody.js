import mongoose from "mongoose";

function isValidIdBody(ids) {
    if (typeof ids==="string"){
        return mongoose.Types.ObjectId.isValid(ids)
    }
    return ids.every(id => mongoose.Types.ObjectId.isValid(id))
}

export default isValidIdBody