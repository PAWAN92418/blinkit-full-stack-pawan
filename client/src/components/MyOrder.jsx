import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await Axios(SummaryApi.getUserOrders);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (err) {
      toast.error('Something went wrong fetching your orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">My Orders</h2>
        <p className="text-gray-600">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="flex gap-4 bg-white p-4 rounded-lg shadow border">
            <div>
                   <img
                   src={order.product_detalis.image[0]}
                   alt={order.product_detalis.name}
                   className="w-24 h-24 object-cover rounded"
                   />
            </div>

            <div>
            {/* <div className="flex items-center mb-2">
              <span className="font-medium">Order ID:</span>

              <span className="text-sm text-gray-500">{order.orderId}</span>
            </div> */}
            <p className="text-sm mb-1">
              <span className="font-medium">Item:</span> {order.product_detalis.name}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Quantity:</span> {order.qty}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Total:</span> ₹{order.totalAmt}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Status:</span> {order.payment_status}
            </p>
            <p className="text-sm">
              <span className="font-medium">Ordered On:</span> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
