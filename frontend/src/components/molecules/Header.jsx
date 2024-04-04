import { space } from "postcss/lib/list";
import { FaAlignJustify } from "react-icons/fa6";

export function Header (props) {
    return(
        <div className="bg-[#39A900] w-full h-16 flex items-center">
            <FaAlignJustify size={30} className="ml-3 cursor-pointer" />
            <h2 className="text-white text-2xl font-bold justify-between ml-10">
                {props.title}
            </h2>
            <FaAlignJustify size={30} className="flex ml-auto mr-3 cursor-pointer"/>
        </div>
    )
}