import React, { useEffect, useState } from 'react';
import Testimonials from "../components/Admin/Testimonials";
import ContactUs from '../components/Admin/ContactUs';
import PortfolioDashboard from '../components/Admin/PortfolioData';
import ProfileManagement from '../components/Admin/ProfileManagement';
import { userServices } from '../services/userServices ';
import { useAdmin } from '../Context/AdminContext';
import MenuBar from '../components/Admin/MenuBar';
import LoadingPage from '../components/LoadingPage';

const AdminPage = () => {

  const {storeAdminData, adminData} = useAdmin()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async ()=>{
    setLoading(true)
    try {
      if(!adminData){
        const response = await userServices.getAllDataForAdmin()
        storeAdminData(response)
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally{
      setLoading(false)
    }
  }

  if(error) return <div>{error}</div>
  if(loading) return <div className='flex h-screen w-100'><LoadingPage/></div>


  return (
    <div className="mx-auto px-4 py-8 bg-gray-900">
        <MenuBar/>
        <ProfileManagement />
        <PortfolioDashboard />
        <Testimonials />
        <ContactUs />
    </div>
  );
};

export default AdminPage;