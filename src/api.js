import axios from 'axios';

const base = axios.create({ baseURL: 'https://test-pi2.onrender.com/'});

export const login = async (username, password) => {
    try {
        const response = await base.post('users/login', {username: username, password: password});
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('username', username);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response }
    }
}
export const register = async (username, password) => {
    try {
        const response = await base.post('users/register', {username: username, password: password});
        await login(username, password);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response }
    }
}
export const userRole = async () => {
    try {
        const response = await base.get('users/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        },);
        return response.data.role;
    } catch (error) {
        return error.response;
    }
}
export const fetchLastMesure = async()=>{
    const {data} = await base.get(`mesure/last/last`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    });
    return data
}
export const SendDownlink = async(message)=> {
    try{
        const response = await base.post(`downlink`,{
            message:message
        },{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            }
        });
        return {success: true};
    }catch(error){
        console.log(error);
        return {success:false, error:error.response}
    }
}