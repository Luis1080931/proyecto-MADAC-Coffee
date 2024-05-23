import { Sidebar } from "../organisms/Sidebar.jsx";
import { SideBarUser } from "../organisms/SideBarUser.jsx";

export function Header (props) {
    return(
        <div className="bg-[#3E4749] w-full h-20 flex justify-between shadow-xl border-b-2 border-gray-300">
            <Sidebar />
            <h2 className="text-white text-2xl font-bold flex items-center">
                {props.title}
            </h2>
            <SideBarUser />
        </div>
    )
}