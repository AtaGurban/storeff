import Auth from "./pages/Auth";
import FavouritePage from "./pages/FavouritePage";
import Basket from "./pages/Basket";
import { BASKET_ROUTE, CATEGORY_ROUTE, FAVOURITE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PRODUCT_PAGE_ROUTE, ADMIN_ROUTE, ADMIN_DEVICE_ROUTE, ADMIN_SUB_DEVICE_ROUTE } from "./utils/pathConsts";
import Shop from "./pages/Shop";
import Category from "./pages/category/Category";
import ProductPage from "./pages/ProductPage";
import Admin from "./pages/Admin/Admin";
import AdminDevice from "./pages/AdminDevice";
import AdminSubDevice from './pages/AdminSubDevice'

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Element: <Basket/>
    },
    {
        path: FAVOURITE_ROUTE,
        Element: <FavouritePage/>
    },

    {
        path: SHOP_ROUTE,
        Element: <Shop/>
    },
    { 
        path: PRODUCT_PAGE_ROUTE,
        Element: <ProductPage/>
    },
    {
        path: CATEGORY_ROUTE,
        Element: <Category/>
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Element: <Auth/>
    },
    {
        path: SHOP_ROUTE,
        Element: <Shop/>
    },
    {
        path: PRODUCT_PAGE_ROUTE,
        Element: <ProductPage/>
    },
    {
        path: CATEGORY_ROUTE,
        Element: <Category/>
    }
]


export const adminRoutes = [
    {
        path: BASKET_ROUTE,
        Element: <Basket/>
    },
    {
        path: FAVOURITE_ROUTE,
        Element: <FavouritePage/>
    },

    {
        path: SHOP_ROUTE,
        Element: <Shop/>
    },
    { 
        path: PRODUCT_PAGE_ROUTE,
        Element: <ProductPage/>
    },
    {
        path: CATEGORY_ROUTE,
        Element: <Category/>
    },
    {
        path: ADMIN_ROUTE,
        Element: <Admin/>
    },
    {
        path: ADMIN_DEVICE_ROUTE,
        Element: <AdminDevice/>
    },
    {
        path: ADMIN_SUB_DEVICE_ROUTE,
        Element: <AdminSubDevice/>
    }
]