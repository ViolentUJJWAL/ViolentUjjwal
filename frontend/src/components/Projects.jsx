import React, { useState } from 'react'
import Cards from './Cards'
import { useTheme } from '../Context/ThemeContext'
import { useUser } from '../Context/UserContext'


const Projects = () => {

  const { activeTheme } = useTheme()
  const { userData } = useUser()
  const [project , setProject] = useState(userData?.project)
  const getBorderStyle = () => {
    return { borderBottom: `2px solid ${activeTheme}` }
  }


  return (
    <section id='projects' className='relative bg-gray-700 py-10 px-4'>
      <div className='mb-16 max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-white w-max pb-4' style={getBorderStyle()}>My Projects</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10'>
          {project?.map((items, index) => {
            return <Cards key={index} item={items} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
