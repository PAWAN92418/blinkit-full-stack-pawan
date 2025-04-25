
import AddressModel from "../models/Address.model.js";

// GET all addresses of a user
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await AddressModel.find({ user: userId, status: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch addresses", error });
  }
};

// ADD a new address
export const addUserAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, mobile } = req.body;

    const newAddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      mobile,
      user: userId,
    });

    await newAddress.save();
    res.status(201).json({ success: true, message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add address", error });
  }
};
