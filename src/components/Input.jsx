import { useState } from "react"

const Input = ({ inputProps }) => {
    const { label, type, placeholder, name, value, changeHandler, blurHandler, hasError } = inputProps

    const [isFocused, setIsFocused] = useState(false)

    let borderColor = hasError ? "border-[#EB1414]" : isFocused ? "border-purple" : "border-grey"

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e) => {
        blurHandler(e)
        setIsFocused(false)
    }
    const handleChange = (e) => {
        changeHandler(e)
    }

    return (
        <label className="w-full flex flex-col font-lato mb-4">
            <span className="font-semibold text-[#10171B] text-xs leading-[0.875rem] tracking-[0.005rem] mb-2">
                { label }
            </span>
            <input type={ type } onChange={ handleChange } value={ value } placeholder={ placeholder }
                onFocus={ handleFocus } onBlur={ handleBlur } onMouseEnter={ handleFocus }
                onMouseLeave={() => setIsFocused(false) } required={ true } name={ name }
                className={`w-full border ${borderColor} text-base text-black placeholder:text-[#666]
                px-[1.625rem] py-4 bg-transparent outline-none rounded-[0.5rem]`}
            />
        </label>
    )
}

export default Input