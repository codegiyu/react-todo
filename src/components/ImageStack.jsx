import member from "../assets/images/member.png";

const ImageStack = ({ stackProps }) => {
    const { bigSize } = stackProps

    const width = bigSize ? "w-8" : "w-6"
    const overlap = bigSize ? "-ml-2" : "-ml-[0.375rem]"

    return (
        <figure className="w-fit flex">
            <img src={ member } alt="" className={`${width} aspect-square border-2 border-white rounded-full`} />
            <img src={ member } alt="" className={`${width} aspect-square border-2 border-white rounded-full ${overlap}`} />
            <img src={ member } alt="" className={`${width} aspect-square border-2 border-white rounded-full ${overlap}`} />
        </figure>
    )
}

export default ImageStack