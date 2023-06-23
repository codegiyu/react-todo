const defaultTasksStore = {todo:[],completed:[]}
const stringifiedDefaultTasksStore = JSON.stringify(defaultTasksStore)

export const nextId = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks-storage") || stringifiedDefaultTasksStore)

    return tasks.todo.length + tasks.completed.length + 1
}

export const setTasks = (obj) => localStorage.setItem("tasks-storage", JSON.stringify(obj))

export const resetTasks = () => localStorage.setItem("tasks-storage", stringifiedDefaultTasksStore)