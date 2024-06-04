import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import PrivateRoutes from './routes/PrivateRoutes'
import Home from './component/Home'
import Navbar from './common/Navbar'
import PaymentSuccess from './payment/PaymentSuccess'
import ForgotPassword from './auth/ForgotPassword'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element :  <><Navbar></Navbar><Home></Home></>,
    },
     {
       path: '/dashboard',
       element : <PrivateRoutes element={<><Navbar></Navbar><Dashboard /></>} />,
     },
     {
      path : 'login',
      element :  <Login></Login>
     },
     {
      path : 'signup',
      element :  <SignUp></SignUp>
     },
     {
      path : 'payment-success',
      element :  <PaymentSuccess></PaymentSuccess>
     },
     {
      path : 'forgot-password',
      element :  <ForgotPassword></ForgotPassword>
     },
  ])

  return (
    <>
     
      <RouterProvider router={router}></RouterProvider>

 
    </>
  )
}

export default App
