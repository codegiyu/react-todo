

const RangeInput = ({ inputProps }) => {
    const { label, name, value, min, max, changeHandler } = inputProps

    const handleChange = (e) => {
        changeHandler(e)
    }

    return (
        <label className="w-full flex flex-col font-lato mb-4 ">
            <div className="w-full flex justify-between items-baseline">
                <span className="font-semibold text-[#10171B] text-xs leading-[0.875rem] tracking-[0.005rem] mb-2">
                    { label }
                </span>
                <span className="bg-purple text-white text-sm px-3 py-1 rounded">
                    { value }
                </span>
            </div>
            <input type="range" onChange={ handleChange } value={ value } min={ min } required name={ name } max={ max } step={1}
                className={`w-full accent-purple`}
            />
        </label>
    )
}

export default RangeInput