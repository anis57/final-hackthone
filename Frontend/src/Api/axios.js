import ApiClient from ".";

const getReq = async (path)=>{
    try {
        const response = await ApiClient.get(path)
        return response;
    } catch (error) {
        return error.message;
    }
}

const postReq = async (path, data)=>{
    try {
        const response = await ApiClient.post(path, data)
        return response;
    } catch (error) {
        return error.message;
    }
}

const deleteReq = async (path)=>{
    try {
        const response = await ApiClient.delete(path)
        return response;
    } catch (error) {
        return error.message;
    }
}

const putReq = async (path, data)=>{
    try {
        const response = await ApiClient.put(path, data)
        return response;
    } catch (error) {
        return error.message;
    }
}


export {getReq, postReq, deleteReq, putReq};