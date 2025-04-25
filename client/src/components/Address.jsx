import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    mobile: '',
  });

  const fetchAddresses = async () => {
    try {
      const res = await Axios(SummaryApi.getUserAddresses);
      if (res.data.success) {
        setAddresses(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load addresses");
    }
  };

  const handleAddAddress = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.addUserAddress,
        data: form,
      });
      
      if (res.data.success) {
        toast.success('Address added');
        fetchAddresses();
        setIsAdding(false);
        setForm({
          address_line: '',
          city: '',
          state: '',
          pincode: '',
          mobile: '',
        });
      }
    } catch (err) {
      toast.error("Failed to add address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className='p-4 bg-gray-50 min-h-[79vh]'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Your Addresses</h2>
        <button
          onClick={() => setIsAdding(true)}
          className='bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition'
        >
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className='text-gray-600'>No addresses found.</p>
      ) : (
        <div className='grid gap-4'>
          {addresses.map((address) => (
            <div
              key={address._id}
              className='bg-white p-4 rounded shadow border'
            >
              <p>{address.address_line}</p>
              <p>{address.city}, {address.state}, {address.pincode}</p>
              <p>Mobile: {address.mobile}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup */}
      {isAdding && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative'>
            <h3 className='text-lg font-semibold mb-4'>Add New Address</h3>
            <input placeholder='Address Line' value={form.address_line} onChange={(e) => setForm({ ...form, address_line: e.target.value })} className='block w-full mb-2 border p-2 rounded' />
            <input placeholder='City' value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className='block w-full mb-2 border p-2 rounded' />
            <input placeholder='State' value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className='block w-full mb-2 border p-2 rounded' />
            <input placeholder='Pincode' value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className='block w-full mb-2 border p-2 rounded' />
            <input placeholder='Mobile' value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className='block w-full mb-4 border p-2 rounded' />

            <div className='flex justify-end'>
              <button onClick={handleAddAddress} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2'>Save</button>
              <button onClick={() => setIsAdding(false)} className='text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 hover:text-red-600 transition'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
