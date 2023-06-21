import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TASKS_DATA } from "../../data/props";


const useTasksStore = create(
    persist((set, get) => ({
        tasks: TASKS_DATA,
        nextId: () => {
            let tasks = get().tasks

            return tasks.todo.length + tasks.ongoing.length + tasks.completed.length + 1
        },
        setTasks: (obj) => set(() => (
            { tasks: obj }
        )),
        changeTaskProgress: (num, id, status) => {
            const obj = { ...get().tasks }
            const arr = obj[status]
            const index = arr.findIndex(item => item.taskid === Number(id))
            const newTask = { ...arr[index], progress: num }
            arr[index] = newTask
            
            return set(() => ({ tasks: obj }))
        }
    }),
    {
        name: "tasks-storage",
        storage: createJSONStorage(() => localStorage)
    }
))

export default useTasksStore