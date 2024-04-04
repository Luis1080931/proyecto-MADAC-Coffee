import { space } from "postcss/lib/list";
import { FaAlignJustify } from "react-icons/fa6";
import { Sidebar } from "./Sidebar";

export function Header (props) {
    return(
        <div className="bg-[#39A900] w-full h-20 flex items-center">
            <Sidebar />
            <h2 className="text-white text-2xl font-bold justify-between ml-10">
                {props.title}
            </h2>
            <FaAlignJustify size={30} className="flex ml-auto mr-3 cursor-pointer"/>
        </div>
    )
}