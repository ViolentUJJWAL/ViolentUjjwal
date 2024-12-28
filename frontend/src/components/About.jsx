import React, { useState } from 'react'
import MernStack from '../assets/mernstack.png'
import { useTheme } from '../Context/ThemeContext'
import { useUser } from '../Context/UserContext'

const About = () => {

    const { activeTheme } = useTheme()
    const { userData } = useUser()
    const [user, setUser] = useState(userData?.user)
    const [skill, setSkill] = useState(userData?.skill)

    const getTextColorStyle = () => {
        return { color: activeTheme }
    }

    const getBorderStyle = () => {
        return {
            borderColor: activeTheme,
            boxShadow: `1px 1px 10px ${activeTheme}`
        }
    }

    return (
        <div className='relative' id='about'>
            <div className='bg-gray-100 py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        <h2 className={`text-base font-semibold tracking-wide uppercase`} style={getTextColorStyle()} >About Me</h2>
                        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Hi, I'm {user?.name}</p>
                        <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
                            {user?.description2}
                        </p>
                    </div>
                    <div className='mt-10'>
                        <div className='grid grid-cols-1 gap-12'>
                            <div>
                                <h3 className='text-2xl font-semibold text-gray-900'>My Journey</h3>
                                <p className='mt-4 text-lg text-gray-600'>
                                    {user?.description3Myjourney}
                                </p>
                                <img src={MernStack} alt="" className='p-2 rounded-lg w-52 mt-4' />
                            </div>
                            <div className='border rounded-lg md:p-7 py-7  flex flex-col gap-8 items-center' style={getBorderStyle()}>
                                <h3 className='text-2xl font-semibold' style={getTextColorStyle()} >Skills & Expertise</h3>
                                <div className='flex items-center justify-center flex-wrap gap-3'>
                                    {
                                        skill?.map((item) => (
                                            <div className='border flex items-center gap-1 w-max px-2 py-1 rounded-lg shadow-md hover:scale-110' key={item._id} style={getBorderStyle()}>
                                                <img src={item?.icon?.url} alt="" className='w-10' />
                                                <span className='font-semibold'>{item?.name}</span>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
