import axios from 'axios'

const apiService = axios.create({
    baseURL: 'http://localhost:3000/api'
})
export const insertUsuario = payload => apiService.post(`/usuario`, payload);
export const getAllUsuarios = () => apiService.get(`/usuarios`);
export const updateUsuarioById = (id, payload) => apiService.put(`/usuario/${id}`, payload);
export const deleteUsuarioById = id => apiService.delete(`/usuario/${id}`);
export const getUsuarioById = id => apiService.get(`/usuario/${id}`);
export const authenticateUsuario = payload => apiService.post('/authenticate', payload);

export const insertProcesso = payload => apiService.post(`/processo`, payload);
export const getAllProcessos = () => apiService.get(`/processos`);
export const updateProcessoById = (id, payload) => apiService.put(`/processo/${id}`, payload);
export const deleteProcessoById = id => apiService.delete(`/processo/${id}`);
export const getProcessoById = id => apiService.get(`/processo/${id}`);

const api = {
    insertUsuario,
    getAllUsuarios,
    updateUsuarioById,
    deleteUsuarioById,
    getUsuarioById,
    authenticateUsuario,
    insertProcesso,
    getAllProcessos,
    updateProcessoById,
    deleteProcessoById,
    getProcessoById,
    
}

export default api