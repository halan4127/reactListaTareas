import axios from 'axios';
import {
    ADD_NOTES_SUCCESS,
    ADD_NOTES_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_ERROR,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_ERROR,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_ERROR
} from './actionTypes';

const networkError = "NETWORK ERROR";

const baseUrl = "http://localhost:3000/usuarios/";
const baseUrl1 = "http://localhost:3000/tareas/"

export const deleteNotesSuccess = (data) => {
    return {
        type: DELETE_NOTES_SUCCESS,
        payload: data
    };
};
export const deleteNotesError = (data) => {
    return {
        type: DELETE_NOTES_ERROR,
        payload: data || networkError
    };
};

export const updateNotesSuccess = (data) => {
    return {
        type: UPDATE_NOTES_SUCCESS,
        payload: data
    };
};
export const updateNotesError = (data) => {
    return {
        type: UPDATE_NOTES_ERROR,
        payload: data || networkError
    };
};

export const fetchNotesSuccess = (data) => {
    return {
        type: FETCH_NOTES_SUCCESS,
        payload: data
    };
};
export const fetchNotesError = (data) => {
    return {
        type: FETCH_NOTES_ERROR,
        payload: data
    };
};

export const addNotesSuccess = (data) => {
    return {
        type: ADD_NOTES_SUCCESS,
        payload: data
    };
};
export const addNotesError = (data) => {
    return {
        type: ADD_NOTES_ERROR,
        payload: data || networkError
    };
};

export const signUpSuccess = (data) =>{
    return {
        type: SIGNUP_SUCCESS,
        payload: data
    };
}

export const signUpError = (data) =>{
    return {
        type: SIGNUP_ERROR,
        payload: data
    };
}

export const loginSuccess = (data) =>{
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}

export const loginError = (data) =>{
    return {
        type: LOGIN_ERROR,
        payload: data || networkError
    };
}

export const signUp = (obj) =>{
    return dispatch =>{
    return axios.post(`${baseUrl}sign-up`, obj).then((res)=>{
        console.log("Res => ", res)
        if(res.status === 200){
            localStorage.setItem('token',res.data.data.token);
            dispatch(signUpSuccess({success:true, data:res.data.data}))
        }
        else{
            localStorage.setItem('token','');
            dispatch(signUpError({success: false, data: null}))
        }
    }).catch((e)=>{
        console.log(e.response.data)
        if (e.response.status === 400) {
        dispatch(signUpError({success: false,data: null, message: e.response.data.message}))
        }
        else dispatch(signUpError({success: false,data: null, message: e.message}))
    })
}
}

export const login = (obj) =>{
    return dispatch =>{
        return axios.post(`${baseUrl}login`, obj).then((res)=>{
            if(res.status === 200 && res.data){
                console.log("res ", res);
                localStorage.setItem('token',res.data.data.token);
                dispatch(loginSuccess({success:true, data: res.data.data}))
            }
            else{
                const response = {
                    message: "Usuario o contraseña invalida",
                    data: null
                }
                dispatch(loginError({success: false,  ...response}))
            }
        }).catch((e)=>{
            console.log("Error", e)
            const response = {
                data: null,
                message: "Usuario o contraseña invalida"
            }
            dispatch(loginError({success: false ,...response}))
        })
    }
}

export const addNotes = (obj) =>{
    const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}agregar`, obj,
        {
            headers: {
                Authorization: `JWT ${token}`,
            }
        }
        ).then((res)=>{
            if(res.status === 200){
                dispatch(addNotesSuccess({success: true, message: "Nota agregada"}))
            }
            else{
                dispatch(addNotesError({success: false, message: "Error al agregar"}))
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(addNotesError({success: false, message: "Error agregar"}))
        })
    }
}

export const fetchNotes = () =>{
    const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.get(`${baseUrl1}mostrar`, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        }).then((res)=>{
            console.log("Response => ", res)
            if(res.status === 200 && res.data.data.length > 0){
                dispatch(fetchNotesSuccess({success: true, data: res.data.data, message: "Encontrado"}))
            }
            else{
                  dispatch(fetchNotesSuccess({ success: false, data: [], message: "No"}));
            }
        }).catch((e)=>{
            if (e.response.status !== 401) {
                dispatch(fetchNotesError({success: false, data: [], message: e.message}))
            }
        })
    }
}

export const updateNotes = (obj) =>{
    const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}actualizar`, obj,
        {
            headers: {
                Authorization: `JWT ${token}`,
            }
        }
        ).then((res)=>{
            if(res.status === 200){
                dispatch(updateNotesSuccess({success: true, message: 'Actualizado'}))
            }
            else{
                dispatch(updateNotesError({success: false, message: 'Error'}));
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(updateNotesError({success: false, message: 'Error'}))
        })
    }
}

export const deleteNotes = (obj) =>{
    const token = localStorage.getItem('token');
    return dispatch =>{
        return axios.post(`${baseUrl1}eliminar`, obj,
        {
            headers: {
                Authorization: `JWT ${token}`,
            }
        }
        ).then((res)=>{
            if(res.status === 200 && res.data){
                dispatch(deleteNotesSuccess({success: true, message: "Eliminado"}))
            }
            else{
                dispatch(deleteNotesError({success: false,  message: "Error"}));
            }
        }).catch((e)=>{
            console.log(e)
            dispatch(deleteNotesError({success: false, message: e.message}))
        })
    }
}

