import Layout from "./layout/Layout";
import ImageStack from "./components/ImageStack";
import users from "./assets/icons/users-black.svg";
import board from "./assets/icons/board.svg";
import list from "./assets/icons/list-dashes.svg";
import lightning from "./assets/icons/lightning-black.svg";
import plus from "./assets/icons/plus.svg";
import SectionHeading from "./components/SectionHeading";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import AddTaskBtn from "./components/AddTaskBtn";
import useAlertStore from "./store/zustand/alertStore";
import useTasksStore from "./store/zustand/tasksStore";

function App() {
  const tasks = useTasksStore(state => state.tasks)
  const setTasks = useTasksStore(state => state.setTasks)
  const changeTaskProgress = useTasksStore(state => state.changeTaskProgress)

  const setAlert = useAlertStore(state => state.setAlert)

  const progressChangeHandler = (num, id, status) => {
    changeTaskProgress(num,id,status)
  }

  const addMemberhandler = () => {
    setAlert({ type: "warning", message: "Sorry, this feature is not available yet!" })
  }

  const handleViews = () => {
    setAlert({ type: "warning", message: "Sorry, this feature is not available yet!" })
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    
    if (!destination) return

    let newTasks = { ...tasks }
    let changedTask = newTasks[source.droppableId].splice(source.index, 1)[0]
    changedTask.status = destination.droppableId

    if (destination.droppableId === "todo" && changedTask.progress > 0) {
      changedTask.progress = 0
    }

    if (destination.droppableId === "ongoing" && changedTask.progress > 8) {
      changedTask.progress = 8
    }

    if (destination.droppableId === "completed" && changedTask.progress < 9) {
      changedTask.progress = 9
    }

    newTasks[destination.droppableId].splice(destination.index, 0, changedTask)
    
    setTasks(newTasks)
    if (source.droppableId !== destination.droppableId) {
      setAlert({ 
        type: "success",
        message: `Task ${changedTask.taskid} moved to ${destination.droppableId[0].toUpperCase() + destination.droppableId.slice(1)}` 
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <section className="w-full h-full bg-[#FCFBFC]">
          <section className="w-full h-fit bg-white px-5 lg:px-6 xl:px-16 pt-10 pb-6 flex flex-col gap-14 leading-[120%] shadow-topSection">
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 md:items-center justify-between">
              <div className="w-fit flex flex-col gap-1">
                <h1 className="text-black text-[2.375rem] font-semibold tracking-[-0.02em] leading-[120%]">
                  New Campaign Run
                </h1>
                <p className="text-greyText text-[0.875rem] leading-[120%]">
                  A new campaign launch work for brand new feature in May month
                </p>
              </div>
              <button type="button" onClick={ addMemberhandler } className="w-fit bg-black rounded-lg mr-auto md:mr-0 py-3 px-[1.8rem]">
                <span className="text-[0.875rem] leading-[120%]">ADD MEMBERS</span>
              </button>
            </div>
            <div className="w-full flex flex-col md:flex-row items-start lg:flex-col gap-7 xl:flex-row xl:items-center justify-between">
              <div className="w-fit flex flex-col md:flex-row items-start md:items-center gap-3">
                <ImageStack stackProps={{ bigSize: true }} />
                <p className="text-[0.875rem] text-greyText leading-[120%]">8 members</p>
              </div>
              <ul className="w-fit flex flex-col md:flex-row items-start md:items-center gap-[1.125rem]">
                <li>
                  <button onClick={ handleViews } className="w-fit flex items-center gap-1 opacity-60 hover:opacity-100">
                    <img src={ users } alt=""  className="w-[1.125rem]"/>
                    <p className="font-medium text-[0.875rem] leading-[120%] text-black">Participants View</p>
                  </button>
                </li>
                <li>
                  <button onClick={ handleViews } className="w-fit flex items-center gap-1 opacity-60 hover:opacity-100">
                    <img src={ board } alt=""  className="w-[1.125rem]"/>
                    <p className="font-medium text-[0.875rem] leading-[120%] text-black">Board View</p>
                  </button>
                </li>
                <li>
                  <button onClick={ handleViews } className="w-fit flex items-center gap-1 opacity-60 hover:opacity-100">
                    <img src={ list } alt=""  className="w-[1.125rem]"/>
                    <p className="font-medium text-[0.875rem] leading-[120%] text-black">List View</p>
                  </button>
                </li>
                <li>
                  <button onClick={ handleViews } className="w-fit flex items-center gap-1 opacity-60 hover:opacity-100">
                    <img src={ lightning } alt=""  className="w-[1.125rem]"/>
                    <p className="font-medium text-[0.875rem] leading-[120%] text-black">Power View</p>
                  </button>
                </li>
                <li>
                  <button onClick={ handleViews } className="w-fit flex items-center gap-1 opacity-60 hover:opacity-100">
                    <img src={ plus } alt=""  className="w-[1.125rem]"/>
                  </button>
                </li>
              </ul>
            </div>
          </section>
          <section className="w-full h-max bg-[#FCFBFC] px-5 lg:px-6 xl:px-16 pt-16 pb-20">
              <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-4 xl:gap-10">
                <section className="w-full">
                  <SectionHeading headingProps={{ title: "To Do", count: tasks.todo.length }} />
                  <TaskList taskProps={{
                    tasksArray: tasks.todo.map(task => {
                      task.progressChangeHandler = progressChangeHandler
                      return task
                    }),
                    listName: "todo" }}
                  />
                  <AddTaskBtn btnProps={{ status: "todo" }} />
                </section>
                <section>
                  <SectionHeading headingProps={{ title: "In Progress", count: tasks.ongoing.length }} />
                  <TaskList taskProps={{
                    tasksArray: tasks.ongoing.map(task => {
                      task.progressChangeHandler = progressChangeHandler
                      return task
                    }),
                    listName: "ongoing" }} />
                  <AddTaskBtn btnProps={{ status: "ongoing" }} />
                </section>
                <section>
                  <SectionHeading headingProps={{ title: "Completed", count: tasks.completed.length }} />
                  <TaskList taskProps={{
                    tasksArray: tasks.completed.map(task => {
                      task.progressChangeHandler = progressChangeHandler
                      return task
                    }),
                    listName: "completed" }} />
                  <AddTaskBtn btnProps={{ status: "completed" }} />
                </section>
              </div>
          </section>
        </section>
      </Layout>
    </DragDropContext>
  );
}

export default App;
