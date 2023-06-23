import { Draggable } from "react-beautiful-dnd";
import dots from "../assets/icons/dots-vertical.svg";
import useAlertStore from "../store/zustand/alertStore";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { RiTodoLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import helpers from "../helpers";
import useTasksStore from "../store/zustand/tasksStore";

const TaskSingle = ({ taskProps }) => {
    const { taskid, index, title, datetime, status } = taskProps

    const setAlert = useAlertStore(state => state.setAlert)

    const changeTotalTasks = useTasksStore(state => state.changeTotalTasks)

    const [optionsOpen, setOptionsOpen] = useState(false)

    const markTodo = () => {
        let newTasks = { ...JSON.parse(localStorage.getItem("tasks-storage")) }
        let id = newTasks.completed.findIndex(item => item.taskid === taskid)
        let changedTask = newTasks["completed"].splice(id, 1)[0]
        changedTask.status = "todo"

        newTasks["todo"].splice(newTasks.todo.length, 0, changedTask)
        console.log("set to todo")
        
        helpers.setTasks(newTasks)
        changeTotalTasks()

        setAlert({ 
            type: "success",
            message: `Task ${taskid} moved to Todo` 
        })
    }

    const markCompleted = () => {
        let newTasks = { ...JSON.parse(localStorage.getItem("tasks-storage")) }
        let id = newTasks.todo.findIndex(item => item.taskid === taskid)
        let changedTask = newTasks["todo"].splice(id, 1)[0]
        changedTask.status = "completed"

        newTasks["completed"].splice(newTasks.completed.length, 0, changedTask)
        console.log("set to completed")
        
        helpers.setTasks(newTasks)
        changeTotalTasks()

        setAlert({ 
            type: "success",
            message: `Task ${taskid} moved to Completed` 
        })
    }

    const deleteTask = () => {
        let newTasks = { ...JSON.parse(localStorage.getItem("tasks-storage")) }
        let id = newTasks[status].findIndex(item => item.taskid === taskid)
        newTasks[status].splice(id, 1)
        console.log("delete")
        helpers.setTasks(newTasks)
        changeTotalTasks()

        setAlert({ 
            type: "success",
            message: `Task ${taskid} deleted successfully` 
        })
    }

    return (
        <Draggable draggableId={String(taskid)} index={index}>
            {
                (provided) => (
                    <div 
                        className={`w-full rounded-xl p-4 shadow-taskCard transition-all duration-300 ease 
                        ${ status === "todo" ? "bg-[#0000FF15]" : "bg-[#FF000015]" } relative`}
                        {...provided.draggableProps}
                        { ...provided.dragHandleProps }
                        ref={provided.innerRef}
                    >
                        <div id={taskid} className="w-full flex items-start gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <h3 className="text-[1rem] leading-[120%] text-black font-semibold">
                                    { title }
                                </h3>
                                <p className="text-[0.875rem] leading-[120%] text-greyText">
                                    { datetime }
                                </p>
                            </div>
                            <button onClick={ () => setOptionsOpen(prevState => !prevState) } 
                                className="w-fit rounded-md"
                            >
                                <img src={ dots } alt="" className="w-6" />
                            </button>
                        </div>
                        <div className={`${optionsOpen ? "flex" : "hidden"} w-max grid bg-white shadow px-4 py-0 absolute 
                            top-10 right-0 gap-2 rounded-lg z-[3]`}>
                            {status === "todo" ? (
                                    <div 
                                        onClick={markCompleted} 
                                        role="button" 
                                        className={`flex items-center gap-2 pt-4 text-black text-base`}
                                    >
                                        <TiTick className="text-[30px] bg-transparent text-green"/>
                                        <span>Mark as completed</span>
                                    </div>
                                ) : (
                                    <div 
                                        onClick={markTodo} 
                                        role="button" 
                                        className={`flex items-center gap-2 pt-4 text-black text-base`}
                                    >
                                        <RiTodoLine className="text-[25px] bg-transparent text-yellow-500"/>
                                        <span>Mark as todo</span>
                                    </div>
                                )
                            }
                            <div className="w-full h-[0.75px] bg-[#B8B9BD55]"></div>
                            <div 
                                onClick={deleteTask} 
                                role="button" 
                                className={`flex items-center gap-2 pb-4 text-black text-base`}
                            >
                                <HiOutlineTrash className="text-[25px] bg-transparent text-[#FF0000]"/>
                                <span>Delete task</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default TaskSingle