import Layout from "./layout/Layout";
import SectionHeading from "./components/SectionHeading";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import AddTaskBtn from "./components/AddTaskBtn";
import useAlertStore from "./store/zustand/alertStore";
import helpers from "./helpers";
import { useState } from "react";
import useTasksStore from "./store/zustand/tasksStore";
import { useEffect } from "react";

function App() {
  const defaultTasksStore = {todo:[],completed:[]}
  const stringifiedDefaultTasksStore = JSON.stringify(defaultTasksStore)

  const [tasks, setAppTasks] = useState(JSON.parse(localStorage.getItem("tasks-storage") || stringifiedDefaultTasksStore))
  const [todoTabActive, setTodoTabActive] = useState(true)
  const setTasks = helpers.setTasks
  const resetTasks = helpers.resetTasks

  const setAlert = useAlertStore(state => state.setAlert)

  const totalTasks = useTasksStore(state => state.totalTasks)
  console.log(localStorage.getItem("tasks-storage"), totalTasks)

  const resetTodos = () => {
    resetTasks()
    setAppTasks(JSON.parse(localStorage.getItem("tasks-storage") || stringifiedDefaultTasksStore))
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    
    if (!destination) return

    let newTasks = { ...tasks }
    let changedTask = newTasks[source.droppableId].splice(source.index, 1)[0]
    changedTask.status = destination.droppableId

    if (source.droppableId === "completed" && destination.droppableId === "todo") {
      let id = 0;

      for (id; id < newTasks["todo"].length; id++) {
          console.log(id, newTasks["todo"][id])
          if (newTasks["todo"][id].datetime > changedTask.datetime) {
              break;
          }
      }

      newTasks["todo"].splice(id, 0, changedTask)
    } else {
      newTasks[destination.droppableId].splice(destination.index, 0, changedTask)  
    }
    setTasks(newTasks)
    setAppTasks(JSON.parse(localStorage.getItem("tasks-storage") || stringifiedDefaultTasksStore))

    if (source.droppableId !== destination.droppableId) {
      setAlert({ 
        type: "success",
        message: `Task ${changedTask.taskid} moved to ${destination.droppableId[0].toUpperCase() + destination.droppableId.slice(1)}` 
      })
    }
  }

  useEffect(() => {
    setAppTasks(JSON.parse(localStorage.getItem("tasks-storage") || stringifiedDefaultTasksStore))
  }, [totalTasks, stringifiedDefaultTasksStore])
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <section className="w-full h-full bg-[#FCFBFC]">
          <section className="w-full h-fit bg-white px-5 lg:px-6 xl:px-16 pt-10 pb-6 flex flex-col gap-14 leading-[120%] shadow-topSection">
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 md:items-center justify-between">
              <div className="w-fit flex flex-col gap-1">
                <h1 className="text-black text-[2.375rem] font-semibold tracking-[-0.02em] leading-[120%]">
                  Todos
                </h1>
                <p className="text-greyText text-[0.875rem] leading-[120%]">
                  Create and manage your tasks for the day
                </p>
              </div>
              <button 
                type="button" 
                onClick={ resetTodos } 
                className="w-fit bg-black hover:bg-[#FF0000] hover:scale-105 rounded-lg mr-auto md:mr-0 py-3 px-[1.8rem] active:scale-95"
              >
                <span className="text-[0.875rem] leading-[120%]">Reset Todos</span>
              </button>
            </div>
          </section>
          <section className="w-full h-max bg-[#FCFBFC] px-5 lg:px-6 xl:px-16 pt-16 pb-20">
              <section className={`w-full flex lg:hidden shadow-xl rounded-lg overflow-hidden mb-16`}>
                <button 
                  onClick={() => setTodoTabActive(true)}
                  className={`w-1/2 p-4 bg-[#0000FF] font-semibold ${todoTabActive ? "" : "shadow-inner opacity-20"}`}>
                  Todo
                </button>
                <button
                  onClick={() => setTodoTabActive(false)} 
                  className={`w-1/2 p-4 bg-[#FF0000] font-semibold ${todoTabActive ? "shadow-inner opacity-20" : ""}`}>
                  Completed
                </button>
              </section>

              <div className="w-full flex lg:hidden gap-5 lg:gap-4 xl:gap-10 relative">
                  <section className={`w-full flex-none lg:flex-1 ${todoTabActive ? "" : "hidden"}`}>
                    <SectionHeading headingProps={{ title: "To Do", count: tasks.todo?.length || 0, background: "#0000FF" }} />
                    <TaskList taskProps={{ tasksArray: tasks.todo, listName: "todo" }} />
                    <AddTaskBtn btnProps={{ status: "todo" }} />
                  </section>
                  <section className={`w-full flex-none lg:flex-1 ${!todoTabActive ? "" : "hidden"} `}>
                    <SectionHeading headingProps={{ title: "Completed", count: tasks.completed?.length || 0, background: "#FF0000" }} />
                    <TaskList taskProps={{ tasksArray: tasks.completed, listName: "completed" }} />
                  </section>
              </div>

              <div className="w-full hidden lg:grid grid-cols-2 gap-5 lg:gap-4 xl:gap-10">
                <section className="w-full flex-none lg:flex-1">
                  <SectionHeading headingProps={{ title: "To Do", count: tasks.todo?.length || 0, background: "#0000FF" }} />
                  <TaskList taskProps={{ tasksArray: tasks.todo, listName: "todo" }} />
                  <AddTaskBtn btnProps={{ status: "todo" }} />
                </section>
                <section className="w-full flex-none lg:flex-1">
                  <SectionHeading headingProps={{ title: "Completed", count: tasks.completed?.length || 0, background: "#FF0000" }} />
                  <TaskList taskProps={{ tasksArray: tasks.completed, listName: "completed" }} />
                </section>
              </div>
          </section>
        </section>
      </Layout>
    </DragDropContext>
  );
}

export default App;
