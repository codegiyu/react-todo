import { Draggable } from "react-beautiful-dnd";
import dots from "../assets/icons/dots-vertical.svg";
import list from "../assets/icons/list-checks.svg";
import chat from "../assets/icons/chat.svg";
import link from "../assets/icons/link.svg";
import ImageStack from "./ImageStack";
import useAlertStore from "../store/zustand/alertStore";

const TaskSingle = ({ taskProps }) => {
    const { taskid, index, image, title, desc, progress, messages, links, imageIsActive, progressChangeHandler, handleFocus, status } = taskProps

    const setAlert = useAlertStore(state => state.setAlert)

    const progressColor = progress <= 3 ? "bg-orange" : progress < 9 && progress > 3 ? "bg-lightOrange" : "bg-green"
    const progressWidth = `${progress * 10}%`

    const handleChangeProgress = (e) => {
        const target = e.currentTarget
        const id = target.dataset.id, status = target.dataset.status
        const localX = e.clientX - target.offsetLeft
        const newProgress = Math.round((localX / target.offsetWidth) * 10)

        progressChangeHandler(newProgress, id, status)
    }

    const focusHandler = (e) => {
        handleFocus(e)
    }

    return (
        <Draggable draggableId={String(taskid)} index={index}>
            {
                (provided) => (
                    <div className="w-full bg-white rounded-xl p-4 shadow-taskCard transition-all duration-300 ease"
                        {...provided.draggableProps}
                        { ...provided.dragHandleProps }
                        ref={provided.innerRef}
                    >
                        { imageIsActive ? (
                            <figure className="w-full transition-all duration-300 ease pb-[1.125rem]">
                                <img src={ image } alt="" className="w-full h-[10.5rem] object-cover" />
                            </figure>
                        ) : null }

                        <div onClick={focusHandler} id={taskid} className="w-full flex items-start gap-4 mb-[1.125rem]">
                            <div className="flex flex-col gap-2 flex-1">
                                <h3 className="text-[1rem] leading-[120%] text-black font-semibold">
                                    { title }
                                </h3>
                                <p className="text-[0.875rem] leading-[120%] text-greyText">
                                    { desc }
                                </p>
                            </div>
                            <button onClick={() => setAlert({ type: "warning", message: "Sorry, this feature is not available yet!" })} 
                                className="w-fit"
                            >
                                <img src={ dots } alt="" className="w-6" />
                            </button>
                        </div>

                        <div className="w-full grid gap-2">
                            <div className="w-full flex justify-between">
                                <div className="w-fit flex gap-1 items-center">
                                    <img src={ list } alt="" className="w-[1.125rem]" />
                                    <p className="text-[0.875rem] leading-[120%] text-greyText">Progress</p>
                                </div>
                                <p className="text-[0.875rem] leading-[120%] text-black font-medium">{`${progress}/10`}</p>
                            </div>

                            <div onClick={ handleChangeProgress } data-id={taskid} data-status={status}
                                className="w-full h-2 bg-[#EBEBEB] rounded relative overflow-hidden cursor-pointer"
                            >
                                <span style={{ width: progressWidth }} 
                                    className={`h-full absolute top-0 left-0 ${progressColor} pointer-events-none`}
                                ></span>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <div className="w-fit flex items-center gap-3">
                                    <div className="w-fit flex gap-1 items-center">
                                        <img src={ chat } alt="" className="w-[1.125rem]" />
                                        <p className="text-[0.75rem] leading-[120%] text-greyText">{ messages }</p>
                                    </div>
                                    <div className="w-fit flex gap-1 items-center">
                                        <img src={ link } alt="" className="w-[1.125rem]" />
                                        <p className="text-[0.75rem] leading-[120%] text-greyText">{ links }</p>
                                    </div>
                                </div>
                                <ImageStack stackProps={{ bigSize: false }} />
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default TaskSingle