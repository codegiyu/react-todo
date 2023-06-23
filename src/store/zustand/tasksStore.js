import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const useTasksStore = create(
    persist((set, get) => ({
        totalTasks: 0,
        changeTotalTasks: () => {
            let total = get().totalTasks
            set(() => ({ totalTasks: ++total }))
        }
    }),
    {
        name: "tasks-total-manager",
        storage: createJSONStorage(() => localStorage)
    }
))

export default useTasksStore