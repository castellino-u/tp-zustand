// la idea de esto es poder implementar axios en diferentes funciones las cualas consuman el json server
// todas estas funciones me permiten modificar el json server

import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3000/tareas";

// ponemos que sea asincrono porque tenemos que resolver la promesa
export const getAllTareas = async () => {
    try{
        const response = await axios.get<ITarea[]>(API_URL)   //algo importante de axios, es que nosotros le podemos decir que nos va a devolver
        return response.data
    } catch (error) { 
        console.log(error)
}
};

export const postNuevaTarea = async (nuevaTarea:ITarea) => {
    try{
        const response = await axios.post<ITarea>(API_URL,{
            nuevaTarea,
        });   //algo importante de axios, es que nosotros le podemos decir que nos va a devolver
        return response.data
    } catch (error) { 
        console.log(error)
    }
};

export const editarTarea = async (tareaActualizada:ITarea) => {
    try{
        const response = await axios.put<ITarea>(
            `${API_URL}/${tareaActualizada.id}`, 
            {
            tareaActualizada,
            }
        );   //algo importante de axios, es que nosotros le podemos decir que nos va a devolver
        return response.data
    } catch (error) { 
        console.log(error)
    }
};


export const eliminarTareaPorID = async (idTarea : string) => {
    try{
        const response = await axios.delete<ITarea>(
            `${API_URL}/${idTarea}`);   //algo importante de axios, es que nosotros le podemos decir que nos va a devolver
        return response.data
    } catch (error) { 
        console.log(error)
    }
};


