import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useGlobleContext } from '../provider/GlobleProvider'
import { useNavigate } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa";


const DisplayCartItem = ({ close }) => {
    const { notDiscountPrice, totalPrice,totalDiscount } = useGlobleContext()
    const navigate = useNavigate()

    // const handleClose = () => {
    //     close()
    //     navigate('/')  
    // }

    return (
        <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-50 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center p-2 lg:p-5 shadow-md gap-3 justify-between '>
                    <h2 className='font-semibold text-lg'>Cart</h2>

                    {/* Mobile Close & Navigate */}
                    <button onClick={()=>navigate('/') } className='lg:hidden'>
                        <IoClose size={20} />
                    </button>

                    {/* Desktop Close */}
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25} />
                    </button>  
                </div>

                <div className='min-h-[83vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50'>
                    {/* display cart items here */}
                <div className='p-2 text-sm'>
                    <div className='flex justify-between bg-blue-200 px-2 py-2 rounded-2xl'>
                        <p className='font-semibold text-blue-500'>Your total savings</p>
                        <p className='font-semibold text-blue-500'>₹{totalDiscount}</p>
                    </div>
                </div>
               
                </div>

                <div className="p-2 ">
                    <div className='flex justify-between bg-green-700 py-2 w-full text-white p-2 rounded font-medium'>
                        <p className="font-semibold">Total: ₹{totalPrice}</p>
                        <button className="flex items-center gap-1">
                            Proceed <FaAngleRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DisplayCartItem
