import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '../Context/ThemeContext.jsx'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ParticleBackground from '../components/Particle'
import About from '../components/About'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Timeline from '../components/Timeline'
import { useUser } from '../Context/UserContext.jsx'
import { userServices } from '../services/userServices .js'
import LoadingPage from '../components/LoadingPage.jsx'

function Home() {

  const {userData, storeUserData} = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async ()=>{
    setLoading(true)
    try {
      if(!userData){
        const response = await userServices.getAllDataForUser()
        storeUserData(response)
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
    <>
      <ThemeProvider>
          <ParticleBackground />
          <Navbar />
          <Hero />
          <About />
          <Timeline />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
      </ThemeProvider>
    </>
  )
}

export default Home
