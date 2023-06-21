import image1 from "../assets/images/card-image-1.png";
import useAlertStore from "../store/zustand/alertStore";
import { IoClose } from "react-icons/io5";
import useModalStore from "../store/zustand/modalStore";
import { useEffect, useRef, useState } from "react";
import useTasksStore from "../store/zustand/tasksStore";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import { imageRadioOptions } from "../data/props";
import RangeInput from "./RangeInput";

const NewTaskModal = () => {
    const modalIsActive = useModalStore(state => state.modalIsActive)
    const modalType = useModalStore(state => state.modalType)
    const closeModal = useModalStore(state => state.closeModal)

    const setAlert = useAlertStore(state => state.setAlert)

    const nextID = useTasksStore(state => state.nextId)
    const tasks = useTasksStore(state => state.tasks)
    const setTasks = useTasksStore(state => state.setTasks)

    const formRef = useRef(null)

    const [formValues, setFormValues] = useState({ image: image1, title: "", desc: "", progress: 0 })
    const [formErrors, setFormErrors] = useState({ title: false, desc: false })
    const [disabled, setDisabled] = useState(false)

    const handleAddTask = (e) => {
        e.preventDefault()

        const { image, title, desc, progress } = formValues

        if (formValues.title === "" || formValues.desc === "" || formErrors.desc || formErrors.title) {
            setAlert({ type: "error", message: "Please fill all fields correctly!" })
            return
        }

        let allTasks = { ...tasks }

        let newTask = {
            taskid: nextID(),
            image,
            title,
            desc,
            progress,
            messages: 0,
            links: 0,
            status: modalType
        }
        
        allTasks[modalType].push(newTask)
        setTasks(allTasks)
        setFormValues({ image: image1, title: "", desc: "", progress: modalType === "completed" ? 9 : 0 })
        setAlert({ type: "success", message: "Task created successfully!" })
        closeModal()
    }

    const handleCloseModal = () => {
        setFormValues({ image: image1, title: "", desc: "", progress: modalType === "completed" ? 9 : 0 })
        
        closeModal()
    }

    const handleOutsideFormClick = (e) => {
        if (!formRef.current.contains(e.target)) {
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
            if (["title", "desc"].includes(name)) {
                console.log("ya")
                if (!/^.{3,}$/.test(value)) {
                    throw new Error("Input should have at least 3 characters")
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
        if (formValues.title === "" || formValues.desc === "" || formErrors.desc || formErrors.title) {
            setDisabled(true)
        } else setDisabled(false)
    }, [formValues, disabled, formErrors])

    useEffect(() => {
        setFormValues({ image: image1, title: "", desc: "", progress: modalType === "completed" ? 9 : 0 })
    }, [modalType])

    const imageProps = {
        options: imageRadioOptions,
        label: "Select an image",
        name: "image",
        changeHandler,
        radioValue: formValues.image
    }

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

    const descInputProps = {
        label: "Description",
        type: "text",
        placeholder: "Enter task description",
        name: "desc",
        value: formValues.desc,
        changeHandler,
        blurHandler,
        hasError: formErrors.desc
    }

    const progressInputProps = {
        label: "Set a progress value",
        name: "progress",
        value: formValues.progress,
        min: modalType === "completed" ? 9 : 0,
        max: modalType === "completed" ? 10 : modalType === "ongoing" ? 8 : 3,
        changeHandler
    }

    if (!modalIsActive) return <></>

    return (
        <section onClick={ handleOutsideFormClick } className="w-full h-screen fixed z-[80] top-0 left-0 bg-[#00000099] p-5 grid place-items-center">
            <form onSubmit={ handleAddTask } ref={ formRef } className="w-full md:w-[600px] bg-white pt-4 pb-8 px-6 md:px-8 rounded-2xl font-inter">
                <div className="w-full flex justify-between items-center mb-6">
                    <h2 className="text-black text-xl font-semibold">Add New Task</h2>
                    <button onClick={ handleCloseModal } className="bg-transparent">
                        <IoClose className="text-[#EB1414] text-3xl" />
                    </button>
                </div>

                <fieldset className="w-full flex flex-col gap-2 border-none">
                    <RadioGroup radioProps={ imageProps } />
                    <Input inputProps={ titleInputProps } />
                    <Input inputProps={ descInputProps } />
                    <RangeInput inputProps={ progressInputProps } />
                </fieldset>

                <div className="w-full flex justify-center mt-8">
                    <button type="button" disabled={ disabled } className="bg-purple rounded-lg py-3 px-8 hover:bg-[#45269C] 
                        active:scale-95 transition-all duration-300 ease-in disabled:opacity-50"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    )
}

export default NewTaskModal