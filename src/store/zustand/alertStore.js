import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const useAlertStore = create(
    persist((set) => ({
        alertExists: false,
        alert: { message: "", type: ""},
        setAlert: (obj) => set(() => (
            { alertExists: true, alert: obj }
        )),
        clearAlert: () => set(() => (
            { alertExists: false, alert: { message: "", type: null } }
        ))
    }),
    {
        name: "alert-storage",
        storage: createJSONStorage(() => sessionStorage)
    }
))

export default useAlertStore