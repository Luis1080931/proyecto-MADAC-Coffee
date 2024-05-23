import LogoHeader from './../../assets/icons/Logosimbolo-SENA-PRINCIPAL.png'

export function HeaderLogin (props) {
    return(
        <div className="bg-[#3E4749] w-full h-20 flex items-center justify-between shadow-2xl">
            <h2 className="text-white text-2xl font-bold justify-between ml-10">
                {props.title}
            </h2>
            <img src={LogoHeader} alt="" className='w-28 h-28' />
        </div>
    )
}