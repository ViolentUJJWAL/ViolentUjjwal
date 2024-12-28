import React from 'react'
import { FaGithub } from "react-icons/fa";
import { useTheme } from '../Context/ThemeContext'

const Cards = ({ item }) => {
    const { activeTheme } = useTheme()
    const getCardStyle = () => {
        return {
            border: `1px solid ${activeTheme}`
        }
    }
    return (
        <div className='rounded-lg w-[350px] lg:w-[400px] bg-cyan-50' style={getCardStyle()}>
            <img src={item?.image?.url} alt="" className='rounded-lg w-full h-48' />
            <div className='p-4'>
                <h1 className='font-semibold text-xl mb-2'>{item.title}</h1>
                <p>{item.description}</p>
                <div className='flex gap-3 mt-4'>
                    <button className='text-white font-semibold px-3 py-2 rounded-md hover:text-gray-900' style={{background: activeTheme}}><a href={item.liveLink} target='_blank'>Live Preview</a></button>
                    <button className='bg-black text-white px-3 py-2 rounded-md hover:bg-gray-700'>
                        <a href={item.gitLink} target='_blank' className='flex gap-1'>
                            <FaGithub className='w-6 h-6'/>
                            Github Link
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cards

