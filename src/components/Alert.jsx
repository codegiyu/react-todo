import React, { useCallback, useEffect, useRef, useState } from "react";
import useAlertStore from "../store/zustand/alertStore";
import { IoClose } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";


const Alert = () => {
    let alertExists = useAlertStore(state => state.alertExists)
    let alert = useAlertStore(state => state.alert)
    const clearAlert = useAlertStore(state => state.clearAlert)

    let [timeElapsed, setTimeElapsed] = useState(0)

    const FULL_ALERT_DURATION = 3000
    const ALERT_LINE_RECALIBRATION_INTERVAL = 10
    const FULL_PERCENT = 100

    const closeAlert = () => {
        clearAlert()
        stopTimer()
    }

    let newTimeElapsed = useRef(null)

    const startTimer = () => {
        if (newTimeElapsed.current !== null) {
            return;
        }

        newTimeElapsed.current = setInterval(() => {
            setTimeElapsed(prevState => prevState + ALERT_LINE_RECALIBRATION_INTERVAL)
        }, ALERT_LINE_RECALIBRATION_INTERVAL)
    }

    const stopTimer = useCallback(() => {
        if (newTimeElapsed.current) {
            clearInterval(newTimeElapsed.current)
            setTimeElapsed(0)
            clearAlert()
            newTimeElapsed.current = null
        }
    }, [clearAlert])

    let alertBg = alert.type === "success" 
        ? "#23AC00" : alert.type === "info"
        ? "#213F7D" : alert.type === "warning"
        ? "#FAD200" : "#EB1414"

    let timeDifference = timeElapsed > FULL_ALERT_DURATION ? 0 : timeElapsed

    let lineWidth = FULL_PERCENT - ((timeDifference / FULL_ALERT_DURATION) * FULL_PERCENT)
        
    useEffect(() => {

        return () => {
            if (newTimeElapsed.current !== null) {
                clearInterval(newTimeElapsed.current)
            }
        }
    }, [])

    useEffect(() => {
        if (alert.message) {
            startTimer()
        }
    }, [alert.message])

    useEffect(() => {
        if (alertExists && alert.message) {
            setTimeElapsed(0)
        }
    }, [alertExists, alert])

    useEffect(() => {
        if (timeElapsed >= FULL_ALERT_DURATION) {
            stopTimer()
        }
        
    }, [timeElapsed, stopTimer])


    
    if (!alertExists) return <></>
    return (
        <div className="w-[95%] md:w-[500px] fixed top-[70px] md:top-[100px] lg:top-[70px] left-[50%] translate-x-[-50%] z-[90] shadow-alert">
            <div className="h-[2px] float-right" style={{width: `${lineWidth}%`, background: alertBg }}></div>
            <div className="w-full h-[50px] bg-white flex items-stretch">
                <div style={{ background: alertBg }} className="w-[15%] md:w-[10%] flex-none flex items-center justify-center">
                    <span className="text-white w-full aspect-square flex items-center justify-center">
                        {
                            alert.type === "success" ? (
                                <BsCheck2Circle className="text-[30px] bg-transparent text-white" />
                            ) : alert.type === "info" ? (
                                <MdOutlineNoteAlt className="text-[30px] bg-transparent text-white" />
                            ) : alert.type === "warning" ? (
                                <RiErrorWarningLine className="text-[30px] bg-transparent text-white" />
                            ) : <BiError className="text-[30px] bg-transparent text-white" />
                        }
                    </span>
                </div>
                <div className="flex-1 h-full text-[13px] leading-4 lg:text-sm font-inter text-black flex items-center py-0 px-[10px] lg:p-[15px]">
                    <p>{ alert.message }</p>
                </div>
                <div className="w-auto h-full flex-none flex items-center py-0 px-[10px]">
                    <span onClick={closeAlert} className="w-full h-full text-[#EB1414] flex items-center justify-center">
                        <IoClose className="text-[30px] lg:text-[20px] transition-all duration-200 hover:scale-125 focus:scale-125 active:scale-90" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Alert