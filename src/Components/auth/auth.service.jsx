import { deleteApi, getApi, postApi, putApi } from "../../common/apis";

export const loginUser = (data) => {
    return postApi('auth/login', data);
};

export const registerUser = (data) => {
    return postApi('auth/register', data);
};
export const updateUserSettings=(data)=>{
    return putApi('auth/update', data);
}
export const saveForm = (data) => {
    console.log(data, 'data0')
    return postApi('api/folders', data);
};

export const getForm = ()=>{
    return getApi('api/folders');
}

export const getAnalytics = (userId) => {
    return getApi('api/analytics?userId='+userId);
}
export const deleteForm = (id) => {
    return deleteApi('api/folders/' + id);
}