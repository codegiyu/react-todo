import { Droppable } from "react-beautiful-dnd";
import TaskSingle from "./TaskSingle";

const TaskList = ({ taskProps }) => {
    const { tasksArray, listName } = taskProps
    console.log(tasksArray)
    return (
        <Droppable droppableId={listName}>
            {
                (provided) => (
                    <div className="w-full grid gap-4 pt-4"
                        ref={provided.innerRef} {...provided.droppableProps}
                    >
                        { tasksArray.length 
                        ?   tasksArray.map((task, idx) => {
                                task.index = idx
                                
                                return <TaskSingle key={task.taskid} taskProps={task} />
                            })
                        : []
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

export default TaskList