import LogoHeader from './../../assets/icons/Logosimbolo-SENA-PRINCIPAL.png'

export function HeaderLogin (props) {
    return(
        <div className="bg-[#B7CFDC] w-full h-20 flex items-center justify-between">
            <h2 className="text-black text-2xl font-bold justify-between ml-10">
                {props.title}
            </h2>
            <img src={LogoHeader} alt="" className='w-28 h-28' />
        </div>
    )
}