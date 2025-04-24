import { create } from "zustand";
import { ITarea } from "../types/ITarea";

// aca vamos a empezar a tipar el store

interface ITareaStore {
    tareas: ITarea[]
    tareaActiva: ITarea | null;

    // acá tipamos las funciones
    setTareaActiva: (tareaActiva: ITarea| null)=> void;  //void porque no me retorna nada
    setArrayTareas: (arrayDeTareas:ITarea[])=>void;
    agregarNuevaTarea: (nuevaTarea:ITarea)=>void;
    editarUnaTarea: (tareaActualizada:ITarea)=>void;
    eliminarUnaTarea: (idTarea: string)=> void;

}

// ahora necesito tiparla, por eso le pongo los corchetes angulares y le paso la interfaz
export const tareaStore = create<ITareaStore>((set ) => ({
    // acá adentro vamos a definir las variables las cuales van a permanecer sus estados y sus funciones

    // acá le agregamos los objetos
    tareas:[],  //la store de nuestra tarea nos permite un manejo local de la tarea
    tareaActiva:null,  //nos permite tomar los datos, pasarlas a un modal y poder editarlas

    // la idea es tener funciones modificadoras para el array


    // agregar array de tareas
    setArrayTareas: (arrayDeTareas) => set(()=>({tareas:arrayDeTareas})),


    // agregar una tarea al array
    agregarNuevaTarea:(nuevaTarea)=> 
        set ((state)=> ({tareas: [...state.tareas, nuevaTarea]})), //el state representa el valor de las variables de arriba, las de tarea:[] y de tareaActuva:null
    /**
     * 
     * @param tareaEditada - objeto que representa la nueva tarea a agregar
     * @returns no retorna ningún valor, solo actualiza el estado
     */

    // editar una tarea del array
    editarUnaTarea:(tareaEditada)=>
        set((state)=>{
            const arregloTareas = state.tareas.map((tarea)=> 
                tarea.id === tareaEditada.id ? {...tarea,tareaEditada}: tarea
            ); 
        return {tareas: arregloTareas};
    }),

    // eliminar una tarea del array
    eliminarUnaTarea:(idTarea)=>
        set((state)=>{
            const arregloTareas = state.tareas.filter(
                (tarea)=> tarea.id !== idTarea          //si algo falla acá, es porque puede ser que puse dos igual en vez de uno.
            ); 
        return {tareas: arregloTareas};
    }),

    // settear la tarea activa

    setTareaActiva: (tareaActivaIn) =>
        set(()=> ({tareaActiva:tareaActivaIn}))

}));