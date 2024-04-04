import { FaAlignJustify } from "react-icons/fa6";

export function HeaderRegis (props) {
    return(
        <div className="bg-[#39A900] w-full h-16 flex items-center">
            <button className='bg-white text-black rounded-lg p-2 font-bold ml-8 w-24' type="button"> Volver </button>
            <h2 className="text-white text-2xl font-bold ml-auto mr-8">
                {props.title}
            </h2>
        </div>
    )
}