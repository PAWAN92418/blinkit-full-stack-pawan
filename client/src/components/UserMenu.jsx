import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import SummaryApi from '../common/SummaryApi'
import { logoutUser } from '../Store/userSlice'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import { FaEdit } from "react-icons/fa";
import isAdmin from '../utils/isAdmin'


const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {


    try {
      const response = await Axios({
        ...SummaryApi.Logout
      });

      if (response.data.success) {
        if (close) {
          close()

        }
        dispatch(logoutUser());
        localStorage.clear();
        toast.success(response.data.message)
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
  };

  const handleClose = () => {
    if (close) {
      close()
    }
  }
  return (
    <div>
      <div className='font-semibold'>
        My Account
      </div>
      <div className='text-sm flex items-center gap-1 '> <span>{user.name || user.mobile}</span> <span className='text-xs text-red-600 font-semibold'>{user.role==='ADMIN' ?"(Admin)" :""}</span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'><FaEdit /></Link>
      </div>
      <Divider />
      <div className='text-sm grid gap-1.5'>
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/category" className="px-2 hover:bg-orange-100 py-1">Category</Link>

          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/sub-category" className="px-2 hover:bg-orange-100 py-1">Sub Category</Link>

          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/upload-product" className="px-2 hover:bg-orange-100 py-1">Upload Product</Link>

          )
        }
        {
          isAdmin(user.role) && (
            <Link onClick={handleClose} to="/dashboard/product" className="px-2 hover:bg-orange-100 py-1">Product</Link>

          )
        }

        <Link onClick={handleClose} to="/dashboard/my-order" className="px-2 hover:bg-orange-100 py-1">My Orders</Link>
        <Link onClick={handleClose} to="/dashboard/address" className="px-2 hover:bg-orange-100 py-1">Address</Link>
        <button onClick={handleLogout} className='text-left hover:bg-red-300 px-2 py-1 '>Log Out</button>
      </div>
    </div>
  )
}

export default UserMenu
