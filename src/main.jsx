import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"

import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Components/Home.jsx';
import MainLayOut from './LayOut/MainLayOut.jsx';
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp';
import Error from './Components/Error.jsx';
import AuthProvider from './Components/Context/AuthProvider.jsx';
import AddPlant from './Components/AddPlant.jsx';
import Update from './Components/Update.jsx';
import Details from './Components/Details.jsx';
import BannerSlider from './Components/BannerSlider.jsx';
// import Explore from './Components/Explore.jsx';
import Gardeners from './Components/Gardeners.jsx';
import BrowserTips from './Components/BrowserTips.jsx';
import MyTips from './Components/Mytips.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Loading from './Components/Loading.jsx';
import DashboardLayout from './DashboardLayout/DashboardLayout.jsx';
import DashboardHome from './DashboardLayout/DashboardHome.jsx';
// import { TipsProvider } from './Components/Context/TipsContext.jsx';

// import Gardeners from './Components/Gardeners.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement:<Error></Error>,
    children:[
      {
        index:true ,
        loader: () => fetch('https://a10server.vercel.app/users'),
         hydrateFallbackElement:<Loading></Loading>,
        element:<Home></Home>
      },
   
{
  path: '/update/:id',
   loader: ({ params }) => fetch(`https://a10server.vercel.app/plants/${params.id}`),
   hydrateFallbackElement:<Loading></Loading>,
  element: <PrivateRoute> <Update /> </PrivateRoute>
},
{
  path: '/details/:id',
  loader: ({ params }) => fetch(`https://a10server.vercel.app/plants/${params.id}`),
   hydrateFallbackElement:<Loading></Loading>,
  element: <PrivateRoute>
     <Details />
  </PrivateRoute>
},
 {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
     errorElement:<Error></Error>,
    children: [
      { index: true, element: <DashboardHome /> },
       {
    path:'explore' ,
          loader: () => fetch('https://a10server.vercel.app/users'),
           hydrateFallbackElement:<Loading></Loading>,
    element:<Gardeners></Gardeners>
  },
       {
    path:'plants',
    element:<AddPlant></AddPlant>
      },
        {
      path:'my-tips',
     loader: () => fetch('https://a10server.vercel.app/plants'),
      hydrateFallbackElement:<Loading></Loading>,
     element: <MyTips></MyTips>
    },
    ]
  },
      {

        path:'/signIn' ,
        element: <SignIn></SignIn>
      },
         {
        path:'/signUp' ,
        element: <SignUp></SignUp>
      },
      {
     path:'/slider',
     element:<BannerSlider></BannerSlider>
      },
    {
      path:'/tips' ,
            loader: () => fetch('https://a10server.vercel.app/plants'),
             hydrateFallbackElement:<Loading></Loading>,
      element:<BrowserTips></BrowserTips>

    },
  

   
    ]

  },
  {
        
        path:'/*',
        element:<Error></Error>
   
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
