const SectionHeading = ({ headingProps }) => {
    const { title, count, background } = headingProps
    
    return (
        <div className="w-full rounded-lg px-4 py-2 flex items-center justify-between" style={{ background }}>
            <h2 className="text-[1rem] leading-[120%] text-[white] font-medium">{ title }</h2>
            <div className="w-[2.1875rem] aspect-square bg-black text-white rounded grid place-items-center">
                <span className="text-[1rem] leading-[120%]">
                    { count }
                </span>
            </div>
        </div>
    )
}

export default SectionHeading