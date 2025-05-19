import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children:[
      {
        index:true ,
        element:<Home></Home>
      },
      {

        path:'/signIn' ,
        element: <SignIn></SignIn>
      },
      {
        path:'/signUp' ,
        element: <SignUp></SignUp>
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
   <RouterProvider router={router}>
     <App/>
   </RouterProvider>
  </StrictMode>,
)
