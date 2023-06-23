import useAlertStore from "../store/zustand/alertStore";
import { IoClose } from "react-icons/io5";
import useModalStore from "../store/zustand/modalStore";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { Zoom } from "react-reveal";
import helpers from "../helpers";
import useTasksStore from "../store/zustand/tasksStore";

const NewTaskModal = () => {
    const modalIsActive = useModalStore(state => state.modalIsActive)
    const modalType = useModalStore(state => state.modalType)
    const closeModal = useModalStore(state => state.closeModal)

    const setAlert = useAlertStore(state => state.setAlert)

    const changeTotalTasks = useTasksStore(state => state.changeTotalTasks)

    const nextID = helpers.nextId
    const defaultTasksStore = {todo:[],completed:[]}
    const stringifiedDefaultTasksStore = JSON.stringify(defaultTasksStore)
    const tasks = JSON.parse(localStorage.getItem("tasks-storage") || stringifiedDefaultTasksStore)
    const setTasks = helpers.setTasks

    const formRef = useRef(null)

    const [modalBgOpen, setModalBgOpen] = useState(false)
    const [formIsOpen, setFormIsOpen] = useState(false)
    const [formValues, setFormValues] = useState({ title: "", datetime: "" })
    const [formErrors, setFormErrors] = useState({ title: false, datetime: false })
    const [disabled, setDisabled] = useState(false)

    const handleAddTask = (e) => {
        e.preventDefault()

        const { title, datetime } = formValues

        if (formValues.title === "" || formValues.datetime === "" || formErrors.datetime || formErrors.title) {
            setAlert({ type: "error", message: "Please fill all fields correctly!" })
            return
        }

        let allTasks = { ...tasks }

        let newTask = {
            taskid: nextID(),
            title,
            datetime: new Date(datetime).getTime(),
            status: modalType
        }
        
        let id = 0;

        for (id; id < allTasks[modalType].length; id++) {
            console.log(id, allTasks[modalType][id])
            if (allTasks[modalType][id].datetime > newTask.datetime) {
                break;
            }
        }

        allTasks[modalType].splice(id, 0, newTask)
        formRef.current.reset()
        setFormValues({ title: "", datetime: "" })
        setTasks(allTasks)
        changeTotalTasks()
        setFormErrors({ title: false, datetime: false })
        setAlert({ type: "success", message: "Task created successfully!" })
        closeModal()
    }

    const handleCloseModal = () => {
        formRef.current.reset()
        setFormValues({ title: "", datetime: "" })
        setFormErrors({ title: false, datetime: false })
        
        closeModal()
    }

    const handleOutsideFormClick = (e) => {
        if (e.target.contains(formRef.current)) {
            formRef.current.reset()
            setFormValues({ title: "", datetime: "" })
            setFormErrors({ title: false, datetime: false })
            closeModal()
        }
    }

    const changeHandler = (e) => {
        let name = e.target.name, value = e.target.value
        
        setFormValues((prevState) => {
            return { ...prevState, [name]: value }
        })

        setFormErrors((prevState) => {
            return { ...prevState, [name]: false }
        })
    }

    const blurHandler = (e) => {
        let name = e.target.name, value = e.target.value

        try {
            if (["title"].includes(name)) {
                if (!/^.{3,}$/.test(value)) {
                    throw new Error("Title should have at least 3 characters")
                }
            }
        } catch (error) {
            setAlert({ type: "error", message: error.message })
            setFormErrors((prevState) => {
                return { ...prevState, [name]: true }
            })
        }
    }

    useEffect(() => {
        if (formValues.title === "" || formValues.datetime === "" || formErrors.datetime || formErrors.title) {
            setDisabled(true)
        } else setDisabled(false)
    }, [formValues, disabled, formErrors])

    useEffect(() => {
        if (modalIsActive) {
            setModalBgOpen(true)
            setFormIsOpen(true)
        } else {
            setFormIsOpen(false)
            setTimeout(() => setModalBgOpen(false), 350)
        }
    }, [modalIsActive])

    const titleInputProps = {
        label: "Title",
        type: "text",
        placeholder: "Enter task title",
        name: "title",
        value: formValues.title,
        changeHandler,
        blurHandler,
        hasError: formErrors.title
    }

    const datetimeInputProps = {
        label: "Expected Completion DateTime",
        type: "datetime-local",
        placeholder: "",
        name: "datetime",
        value: formValues.datetime,
        changeHandler,
        blurHandler,
        hasError: formErrors.datetime
    }

    if (!modalIsActive && !modalBgOpen) return null
    return (
        <section 
            onClick={ handleOutsideFormClick } 
            className="w-full h-screen fixed z-[80] top-0 left-0 bg-[#00000099] p-5 grid place-items-center"
        >
            <Zoom when={formIsOpen}>
                <div>
                    <form
                        onSubmit={ handleAddTask }
                        ref={ formRef }
                        className="w-full md:w-[600px] bg-white pt-4 pb-8 px-6 md:px-8 rounded-2xl font-inter"
                    >
                        <div className="w-full flex justify-between items-center mb-6">
                            <h2 className="text-black text-xl font-semibold">Add New Task</h2>
                            <button onClick={ handleCloseModal } className="bg-transparent">
                                <IoClose className="text-[#EB1414] text-3xl" />
                            </button>
                        </div>
                        <fieldset className="w-full flex flex-col gap-2 border-none">
                            <Input inputProps={ titleInputProps } />
                            <Input inputProps={ datetimeInputProps } />
                        </fieldset>
                        <div className="w-full flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={ disabled }
                                className="bg-purple rounded-lg py-3 px-8 hover:bg-[#45269C]
                                active:scale-95 transition-all duration-300 ease-in disabled:opacity-50"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </Zoom>
        </section>
    )
}

export default NewTaskModal