import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const useModalStore = create(
    persist((set) => ({
        modalIsActive: false,
        modalType: null,
        openModal: (str) => {
            if(["todo", "ongoing", "completed"].includes(str)) {
                set(() => ( { modalIsActive: true, modalType: str } ))
            }
        },
        closeModal: () => set(() => (
            { modalIsActive: false, modalType: null }
        ))
    }),
    {
        name: "modal-storage",
        storage: createJSONStorage(() => sessionStorage)
    }
))

export default useModalStore