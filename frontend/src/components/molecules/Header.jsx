import { Sidebar } from "../organisms/Sidebar.jsx";
import { SideBarUser } from "../organisms/SideBarUser.jsx";

export function Header (props) {
    return(
        <div className="bg-[#336699]/75 w-full h-20 flex justify-between">
            <Sidebar />
            <h2 className="text-white text-2xl font-bold flex items-center">
                {props.title}
            </h2>
            <SideBarUser />
        </div>
    )
}