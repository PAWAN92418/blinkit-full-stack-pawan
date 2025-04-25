import { Router } from "express";
import { 
    forgotPasswordController, loginController, logoutController, 
    refreshToken, 
    resetPassword, 
    resisterUsercontroller,  updateUserDetails, uploadAvtar, 
    UserDetails, 
    verifiyEmailcontroller, verifyforgotPasswordController 
} from "../controllers/user.controllers.js";
import auth from "../midelware/auth.js";
import upload from "../midelware/multer.js"; 
import { AddcategorieController, DeleteCategorie, getcategories, UpdateCategoryController } from "../controllers/categories.controllers.js";
import { addSubcategories, CategoryShowById,  EditSubCategorie, getSubcategories } from "../controllers/subcategories.controllers.js";
import { createProductController, getProductByCategoryAndSubCategory, getProductDetails, GetProducts,getProductsBySubcategory, searchProduct } from "../controllers/Product.controller.js";
import { addToCart, deleteCartItmeQtyController, getCartItemContorller, updateCartItemQtyController } from "../controllers/cart.controller.js";
import { getUserAddresses,addUserAddress } from "../controllers/Address.controller.js";
import { CashOnDeliveryController,getUserOrdersController,createStripeSession} from "../controllers/Order.controller.js";





const userouter = Router();

userouter.post('/register', resisterUsercontroller);
userouter.post('/verify-email', verifiyEmailcontroller);
userouter.post('/login', loginController);
userouter.get('/logout', auth, logoutController);
userouter.put('/upload-avtar', auth, upload.single('avtar'), uploadAvtar);
userouter.put('/update-profile',auth,updateUserDetails );
userouter.put('/forgot-password', forgotPasswordController);
userouter.put('/verify-forgot-password-otp', verifyforgotPasswordController );
userouter.put('/reset-password',resetPassword );
userouter.post('/refresh-token',refreshToken)
userouter.get('/user-details', auth,UserDetails );

// Admin Routes Category , subcategory , product 

// category
userouter.post('/add-categorirs',auth,AddcategorieController)
userouter.get('/get',getcategories)
userouter.put('/update-category',auth,UpdateCategoryController)
userouter.delete('/category-delete',auth,DeleteCategorie)
// subcategories
userouter.post('/add-subcategory',auth,addSubcategories)
userouter.post('/get-subcategory',getSubcategories)

// product
userouter.post('/create-product',auth,createProductController)
userouter.get('/get-product',GetProducts)
userouter.post('/get-product-by-category',getProductsBySubcategory)
userouter.post('/get-Product-by-Category-and-subcategory',getProductByCategoryAndSubCategory)
userouter.post('/get-product-details',getProductDetails)
userouter.post('/search-product',searchProduct)

// add to cart
userouter.post('/create',auth,addToCart)
userouter.get('/get-cartProduct',auth,getCartItemContorller)
userouter.put('/update-qty',auth,updateCartItemQtyController)
userouter.delete('/delete-cartItem',auth,deleteCartItmeQtyController)

// address
userouter.get("/user-addresses", auth, getUserAddresses);
userouter.post("/add-address", auth, addUserAddress);

// Order
// userouter.post('/order/create', auth, createOrderController);
// userouter.get('/user-orders', auth, getUserOrdersController);
userouter.post('/order/create', auth, CashOnDeliveryController);
userouter.get('/user-orders', auth, getUserOrdersController);

// userouter.post('/razorpay', auth, createRazorpayOrder);
// userouter.post('/verify', auth, verifyPaymentAndCreateOrder);
userouter.post('/stripe-session', auth, createStripeSession);






export default userouter;
