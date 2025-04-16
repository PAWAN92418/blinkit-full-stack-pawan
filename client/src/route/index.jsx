import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../pages/Dashboard";
import Profile from "../components/Profile";
import MyOrder from "../components/MyOrder";
import Address from "../components/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../pages/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../components/ProductDisplayPage";
import MobileCart from "../components/MobileCart";
// import App from "../App";
// import Home from "../Pages/Home";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import ForgotPassword from "../Pages/ForgotPassword";
// import OtpVerification from "../Pages/OtpVerification";
// // import Profile from "../Components/Profile";
// // import Dashboard from "../Pages/Dashboard";
// // import MyOrder from "../Components/MyOrder";
// // import Address from "../Components/Address";
// // import AdminHome from "../admin/AdminHome.";
// // import Categories from "../admin/Categories";
// // import Subcategories from "../admin/Subcategories";
// // import UploadProduct from "../admin/UploadProduct";
// // import Product from "../admin/Product";
// // import ShowSubCategories from "../admin/ShowSubCategory";
// // import ShowCategories from "../admin/ShowCategories";
// // import ViewProduct from "../Pages/ViewProduct";


const routerpage = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "/search",
                element: <SearchPage />
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "otp-verification",
                element: <OtpVerification></OtpVerification>
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    {
                        path: "profile",
                        element: <Profile/>
                    },
                    {
                        path: "my-order",
                        element: <MyOrder/>
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "category",
                        element:<AdminPermission> <Category/></AdminPermission>
                    },
                    {
                        path: "sub-category",
                        element: <AdminPermission> <SubCategory/></AdminPermission>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermission><UploadProduct/></AdminPermission>
                    },
                    {
                        path: "product",
                        element: <AdminPermission><ProductAdmin /></AdminPermission>
                    },
                ]
            },
            {
                path:':category',
                children:[
                    {
                        path:':subCategory',
                        element:<ProductListPage/>
                    }
                ]
            },{
                path:"product/:product",
                element:<ProductDisplayPage/>
            },{
                path:"cart",
                element:<MobileCart/>
            }
            //             // {
            //             //    path:"/categories/:categoryId",
            //             //     element:<ShowSubCategories/>

            //             // },
            //             // {
            //             //     path:"/categories",
            //             //     element:<ShowCategories/>

            //             // },
            //             // {
            //             //     path:"/categories/:categoryId/subcategories/:subcategoryId",
            //             //     element:<ShowSubCategories/>
            //             // },
            //             // {
            //             //     path:"/product/:id",
            //             //     element:<ViewProduct/>
            //             // },
        ],
        //     },

        //     // {
        //     //     path:"admin",
        //     //     element:<AdminHome/>,
        //     //     children:[
        //     //     {
        //     //         path:"categories",
        //     //         element:<Categories/>
        //     //     },
        //     //     {
        //     //         path:"Subcategories",
        //     //         element:<Subcategories/>
        //     //     },
        //     //     {
        //     //         path:"upload-product",
        //     //         element:<UploadProduct/>
        //     //     },
        //     //     {
        //     //         path:"products",
        //     //         element:<Product/>
        //     //     },
        //     //     ]
    }
]);

export default routerpage;