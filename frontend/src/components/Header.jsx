import { space } from "postcss/lib/list";
import { FaAlignJustify } from "react-icons/fa6";
import { Sidebar } from "./Sidebar";
import { SideBarUser } from "./SideBarUser.jsx";

export function Header (props) {
    return(
        <div className="bg-[#39A900] w-full h-20 flex items-center justify-between">
            <Sidebar />
            <h2 className="text-white text-2xl font-bold">
                    {props.title}
                </h2>
                <SideBarUser />
            
        </div>
    )
}