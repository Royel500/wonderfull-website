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
import { TipsProvider } from './Components/Context/TipsContext.jsx';

// import Gardeners from './Components/Gardeners.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
      {
        index:true ,
        loader: () => fetch('http://localhost:4000/users'),
        element:<Home></Home>
      },
      {
    path:'/plants',
    element:<AddPlant></AddPlant>
      },
{
  path: '/update/:id',
   loader: ({ params }) => fetch(`http://localhost:4000/plants/${params.id}`),
  element: <Update />
},
{
  path: '/details/:id',
  loader: ({ params }) => fetch(`http://localhost:4000/plants/${params.id}`),
  element: <Details />
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
            loader: () => fetch('http://localhost:4000/plants'),
      element:<BrowserTips></BrowserTips>

    },
  {
    path:'/explore' ,
          loader: () => fetch('http://localhost:4000/users'),
    element:<Gardeners></Gardeners>
  }
   
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
  <TipsProvider>
     <RouterProvider router={router}>
   </RouterProvider>
   </TipsProvider>
</AuthProvider>
  </StrictMode>,
)
