import { NavLink } from "react-router-dom"
import { MainHeaderData } from "./MainHeaderData"

const MainHeader = () => {
  return (
    <div className="h-[100px] box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;">
        <div className="h-[100px] w-[90%] m-auto flex justify-between items-center">
            <NavLink to='/'><img className="h-[100px] object-cover" src="../assets/images/saylani_logo.png" alt="" /></NavLink>

            <ul className="flex justify-center items-center gap-6">
                {MainHeaderData.map((item, index)=>{
                    return(
                        <li>
                            <NavLink className="text-gray-500 text-[16px] font-semibold" to={item.path}>{item.text}</NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  )
}

export default MainHeader