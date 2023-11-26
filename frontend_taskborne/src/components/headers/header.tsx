import { NavLink } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

export function Header() {


    return (
        <nav className=" flex flex-wrap items-center justify-between px-2 py-3  ">


            <div className="flex items-center md:order-2 gap-2">
                <h1 className="font-mountains-of-christmas text-white text-xl flex items-center text-gray-900">
                    
                   
                </h1>



                
            </div>
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'>

            </div>

        </nav>
    )
}