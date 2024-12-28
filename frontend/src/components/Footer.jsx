import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Footer = () => {

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <footer className='bg-gray-100 py-4 relative flex'>
      <div className='mx-auto px-4 text-center'>
        <p>&copy; 2024 violent ujjwal. All rights reserved</p>
      </div>
      <div className='mr-4'>
        <p onClick={() => {
          if(isAuthenticated){
            navigate("admin-dashboard")
          }else{
            navigate("admin-login")
          }
        }} className=' hover:underline cursor-not-allowed'>ADMIN LOGIN</p>
      </div>
    </footer>
  )
}

export default Footer
