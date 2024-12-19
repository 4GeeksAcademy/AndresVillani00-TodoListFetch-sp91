import React, { useEffect, useState } from "react";

export const FetchTodoList = () => {
    const [ form, setForm ] = useState(true);
    const [ tarea, setTarea ] = useState('');
    const [ tareas, setTareas ] = useState([]);
    const [ tareaParaEditar, setTareaParaEditar ] = useState({});
    const [ label, setLabel ] = useState('');
    const [ check, setCheck ] = useState();
    const host = 'https://playground.4geeks.com/todo';
    const user = 'AndresVillani00';

    const handleSubmitTarea = async (event) => {
        event.preventDefault();
        const tareaNueva = {
            label: tarea,
            is_done: false
        };
        const uri = `${host}/todos/${user}`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tareaNueva)
        };
        
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        getTareas();
    }

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        const tareaEditada = {
            label: label,
            is_done: check
        };
        const uri = `${host}/todos/${tareaParaEditar.id}`;
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tareaEditada)
        };
    
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        getTareas();
        setForm(!form);
        setLabel('');
        setCheck(null);
    }

    const handleEdit = (taskEdit) => {
        setForm(!form);
        setTareaParaEditar(taskEdit);
        setLabel(taskEdit.label);
        setCheck(taskEdit.is_done);
    }

    const handleDelete = async (taskDelete) => {
        const uri = `${host}/todos/${taskDelete.id}`;
        const options = {
            method: 'DELETE'
        };
        
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        getTareas();
    }

    const getTareas = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'GET'
        };
        
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        const datos = await response.json();
        setTareas(datos.todos);
    }

    useEffect(() => {
        getTareas();
    }, [])

    return (
        <div className="container my-5 p-5">
            {
                form === true ?
                <form onSubmit={handleSubmitTarea}>
                    <div className="mb-3">
                        <label>Add Task</label>
                        <input onChange={(event) => setTarea(event.target.value)} value={tarea} className="form-control" type="text" />
                    </div>
                </form>
                :
                <form onSubmit={handleSubmitEdit}>
                    <div className="mb-3">
                        <label className="form-control-label" htmlFor="setTask">Edit Task</label>
                        <input onChange={(event) => setLabel(event.target.value)} value={label} className="form-control" type="text" id="setTask" />
                    </div>
                    <div className="form-check mb-3">
                        <input onChange={(event) => setCheck(event.target.checked)} checked={check} className="form-check-input" type="checkbox" id="setCheck" />
                        <label className="form-check-label" htmlFor="setCheck">Completed</label>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button type="reset" onClick={() => setForm(true)} className="btn btn-secondary">Cancel</button>
                </form>
            }
            <div className="list-group my-5">
                <h2 className="text-center">Listado de Tareas</h2>
                <ul className="list-group">
                    {tareas.map((item) => 
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <div>
                                {
                                    item.is_done ?
                                    <span className="text-success me-2">
                                        <i className="fa-solid fa-circle-check"></i>
                                    </span>
                                    :
                                    <span className="text-danger me-2">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </span>
                                }
                                {item.label}
                            </div>
                            <div>
                                <span onClick={() => handleEdit(item)} className="text-primary me-2">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </span>
                                <span onClick={() => handleDelete(item)} className="text-danger">
                                    <i className="fa-solid fa-trash-can"></i>
                                </span>
                            </div>
                        </li>
                    )}
                    <li className="list-group-item text-end">{tareas.length === 0 ? 'No tasks, pleases add a new task' : (tareas.length === 1 ? `1 Task` : `${tareas.length} Tasks`)}</li>
                </ul>
            </div>
        </div>
    );
}