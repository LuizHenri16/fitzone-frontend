import api from "../api";

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await api.post('/login', { 
            username, 
            password 
        });
        
        return response.data; 
        
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user'); 
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const isAuthenticated = () => {
    return !!getAccessToken(); 
};