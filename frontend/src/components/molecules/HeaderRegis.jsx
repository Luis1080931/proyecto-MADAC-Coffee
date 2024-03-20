import { ButtonVolver } from "../atoms/ButtonVolver.jsx"

export function HeaderRegis (props) {
    return(
        <div className="bg-[#39A900] w-full h-20 flex items-center">
            <ButtonVolver link={'/resultados'}/>
            <h2 className="text-white text-2xl font-bold ml-auto mr-8">
                {props.title}
            </h2>
        </div>
    )
}