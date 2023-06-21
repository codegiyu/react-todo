import uuid from "react-uuid";
import RadioInput from "./RadioInput";
import React from "react";

const RadioGroup = ({ radioProps }) => {
    const { options, label, name, changeHandler, radioValue } = radioProps

    return (
        <div className="w-full flex flex-col gap-3 mb-4">
            <span className="font-semibold text-[#10171B] text-xs leading-[0.875rem] tracking-[0.005rem] mb-2">
                { label }
            </span>
            <fieldset className="w-full grid gap-5">
                { options.map(item => {
                    let props = Object.assign(item, { name, changeHandler, isChecked: item.value === radioValue })
                    return <RadioInput key={uuid()} componentProps={props} />
                })}
            </fieldset>
        </div>
    )
}

export default RadioGroup