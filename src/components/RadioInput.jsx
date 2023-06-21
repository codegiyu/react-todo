const RadioInput = ({ componentProps }) => {
    const { label, value, name, changeHandler, isChecked } = componentProps

    const background = isChecked ? "bg-purple" : "bg-transparent"

    return (
        <label className="w-full flex gap-3 items-center">
            <div className="w-fit h-5 relative">
                <input type="radio" value={ value } name={ name } onChange={ (e) => changeHandler(e) } checked={ isChecked }
                    className={`appearance-none w-5 h-5 rounded-full bg-transparent border border-purple z-[2]`}
                />
                <div className="w-5 h-5 absolute top-0 left-0 z-[1] grid place-items-center rounded-full">
                    <span className={`w-3 h-3 rounded-full ${background}`}></span>
                </div>
            </div>
            
            <span className="font-lato text-base text-black ">{ label }</span>
        </label>
    )
}

export default RadioInput