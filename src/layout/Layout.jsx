import plus from "../assets/icons/plus-white.svg";
import lightning from "../assets/icons/lightning-purple.svg";
import dashboard from "../assets/icons/dashboard.svg";
import settings from "../assets/icons/settings.svg";
import lightningWhite from "../assets/icons/lightning-white.svg";
import users from "../assets/icons/users.svg";
import userAdd from "../assets/icons/user-add.svg";
import affiliate from "../assets/icons/affiliate.svg";
import Alert from "../components/Alert";
import Header from "../sections/Header";
import NewTaskModal from "../components/NewTaskModal";
import useModalStore from "../store/zustand/modalStore";
import { useEffect } from "react";

const Layout = (props) => {
    const openModal = useModalStore(state => state.openModal)
    const closeModal = useModalStore(state => state.closeModal)

    const addTaskHandler = () => {
        openModal("todo")
    }
    
    useEffect(() => {
        closeModal()
    }, [closeModal])

    return (
        <div className="w-full h-full lg:h-screen grid lg:grid-cols-[272px_1fr] gap-0 font-inter text-white">
            <Alert />
            <Header />
            <NewTaskModal />

            <aside className="w-full h-full bg-purple text-white py-[2.375rem] px-8 hidden lg:flex flex-col gap-8 justify-between">
                <div className="aside-top w-full">
                    <div className="w-full bg-[#45269C] rounded-lg py-3 flex items-center justify-center gap-2">
                        <img src={ lightning } alt="" className="w-[1.375rem]" />
                        <span className="text-[1rem] leading-[120%]">Welcome Keerthi</span>
                    </div>
                </div>
                <button type="button" onClick={addTaskHandler} className="w-full bg-lightPurple rounded-lg py-4 flex items-center 
                    justify-center gap-2 hover:bg-[#45269C] active:scale-95 transition-all duration-300 ease-in"
                >
                    <img src={ plus } alt="" className="w-[1.375rem]" />
                    <span className="text-[1rem] leading-[120%]">New Task</span>
                </button>
            </aside>
            <main className="w-full lg:h-screen overflow-y-scroll">
                { props.children }
            </main>
        </div>
    )
}

export default Layout