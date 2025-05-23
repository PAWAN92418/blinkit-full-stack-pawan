import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-2'>
        <button  className=" text-neutral-800 block w-fit ml-auto" onClick={()=>window.history.back()}>
        <IoClose size={20}/>
        </button>
        <div className='container mx-auto px-3 pb-5'>
        <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile
