import plus from "../assets/icons/plus-grey.svg"
import useModalStore from "../store/zustand/modalStore"

const AddTaskBtn = ({ btnProps }) => {
    const openModal = useModalStore(state => state.openModal)

    const { status } = btnProps

    const addTaskHandler = () => openModal(status)

    return (
        <button type="button" onClick={ addTaskHandler } className="w-full flex gap-3 py-3 items-center justify-center bg-[#F2F4F5] 
            border border-dashed border-[#D5D5D5] rounded-xl mt-4">
            <img src={ plus } alt="" className="w-6" />
            <span className="text-[1rem] leading-[120%] text-grey font-medium">Add Task</span>
        </button>
    )
}

export default AddTaskBtn