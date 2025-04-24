import { useEffect, useState } from "react";
import { tareaStore } from "../../../../store/tareaStore";
import styles from "./ListTareas.module.css";
import { getAllTareas } from "../../../../http/tareas";
import { CardList } from "../CardList/CardList";
import { ITarea } from "../../../../types/ITarea";
import { Modal } from "../Modal/Modal";

export const ListTareas = () => {
  
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const tareas = tareaStore((state) => state.tareas);
  const setArrayTareas = tareaStore((state) => state.setArrayTareas);
  
  const getTareas = async ()=>{
    const data = await getAllTareas();
    if(data) setArrayTareas(data);
  };

  useEffect(()=> {
    getTareas();
  }, [])

  const [openModalTarea, setOpenModalTarea] = useState(false)

    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false)
        setTareaActiva(null)
    }


  return (
    <>
    <div className={styles.containerPrincipal}>
        
    <div className={styles.containerTitleAndButton}>
        <h2>Lista de tareas</h2>
        <button onClick={() => setOpenModalTarea(true)}>Agregar tarea</button>
    </div>

    <div className={`${styles.containerTasks} ${styles.contenedorScroll}`}>
        {
        tareas.length > 0
        ?
        tareas.map((tarea) => <CardList key={tarea.id} tarea={tarea}  handleOpenModalEdit = {handleOpenModalEdit} />)
        : 
        <div className = {styles.noTasksDiv}>
        <h3>No hay tareas para mostrar</h3>
        </div>
        }
    </div>


    </div>


    {openModalTarea && <Modal handleCloseModal={handleCloseModal}/>}
    
        </>
  );
};
