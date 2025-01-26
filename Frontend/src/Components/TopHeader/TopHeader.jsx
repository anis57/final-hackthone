import { FaRegEnvelope } from "react-icons/fa";
import { TopHeaderData } from "./TopHeaderData";
import { NavLink } from "react-router-dom";

const TopHeader = () => {
  return (
    <div className='bg-[#eeeeee] p-3'>
        <div className="w-[90%] m-auto">
            <ul className="flex justify-start items-center gap-5">
                {TopHeaderData.map((item, index)=>{
                    const {LinkIcon} = item;
                    return(
                        <li>
                            <NavLink className="flex justify-start gap-6 items-center" to={item.path}>
                                {LinkIcon.map((item, index)=>{
                                    return(
                                        <img className="h-[20px] w-[20px] object-contain" src={item} alt="" />
                                    )
                                })}
                                <span className="text-gray-500 text-[16px] font-semibold">{item.LinkName}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  )
}

export default TopHeader