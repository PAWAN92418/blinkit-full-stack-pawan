export const baseURL = import.meta.env.VITE_API_URL

// /api/user/
const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post'
    },

    login: {
        url: "/api/user/login",
        method: 'post'
    },
    forgotpassword: {
        url: "/api/user/forgot-password",
        method: "put"
    },
    verifyOtp: {
        url: "/api/user/verify-forgot-password-otp",
        method: "put"
    },
    reset_password: {
        url: "/api/user/reset-password",
        method: "put"
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "post"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "get"
    },
    Logout: {
        url: "/api/user/logout",
        method: "get"
    },
    UploadAvatar: {
        url: "/api/user/upload-avtar",
        method: "put"
    },
    updateUserDetails: {
        url: "/api/user/update-profile",
        method: "put"
    },
    addCategory: {
        url: "/api/user/add-categorirs",
        method: "post"
    },
    uploadImage: {
        url: "/file/upload",
        method: "post"
    },
    getcetogry: {
        url: "/api/user/get",
        method: "get"
    },
    updateCategory: {
        url: "/api/user/update-category",
        method: "put"
    },
    deleteCategory: {
        url: "/api/user/category-delete",
        method: "delete"
    },
    AddSubcategory: {
        url: "/api/user/add-subcategory",
        method: "post"
    },
    getSubcategory: {
        url: "/api/user/get-subcategory",
        method: "post"
    },
    CreateProduct: {
        url: "/api/user/create-product",
        method: "post"
    },
    getProduct: {
        url: "/api/user/get-product",
        method: "get"
    },
    getProductByCategroy: {
        url: "/api/user/get-product-by-category",
        method: "post"
    },
    getProductByCategroyandSubcategory: {
        url: "/api/user/get-Product-by-Category-and-subcategory",
        method: "post"
    },
    getProductDetails: {
        url: "/api/user/get-product-details",
        method: "post"
    },
    // this is panding 
    SearchProduct: {
        url: "/api/user/search-product",
        method: "post"
    },
    AddToCart: {
        url: "/api/user/create",
        method: "post"
    },
    getCartItem:{
        url: "/api/user/get-cartProduct",
        method: "get"
    },
     updateQty:{
        url: "/api/user/update-qty",
        method: "put"
    },
    deleteQty:{
       url: "/api/user/delete-cartItem",
       method: "delete"
   },
   getUserAddresses:{
    url: "/api/user/user-addresses",
    method: "get"
  },
  addUserAddress:{
    url: "/api/user/add-address",
    method: "post"
  },
//   createOrder:{
//     url: "/api/user/order/create",
//     method: "post"
//   },
  getUserOrders: {
    method: 'GET',
    url: '/api/user/user-orders',
  },
CashOnDelivery:{
    url: "/api/user/order/create",
    method: "post"
  },
  stripeSession: {
    url: '/api/user/stripe-session',
    method: 'post'
  },




}
export default SummaryApi 