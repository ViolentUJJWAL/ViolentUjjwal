import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { useUser } from '../Context/UserContext';

const Timeline = () => {
    const timelineRef = useRef([]);
    const { activeTheme } = useTheme();
    const { userData } = useUser();
    const [timelineData, setTimelineData] = useState(userData?.experience);

    const themeStyles = {
        text: { color: activeTheme },
        background: { backgroundColor: activeTheme },
        border: { borderColor: activeTheme }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, options);

        timelineRef.current.forEach(element => {
            if (element) observer.observe(element);
        });

        return () => {
            timelineRef.current.forEach(element => {
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    return (
        <div id="experience" className="relative w-full">
            <div className="bg-gray-100 py-4 px-4 md:px-6 lg:px-8">
                <div className="text-white overflow-x-hidden">
                    <section>
                        <div className="mx-auto text-center">
                            <h1 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6" style={themeStyles.text}>
                                EXPERIENCE
                            </h1>
                        </div>
                    </section>

                    <section className="timeline">
                        <div className="mx-auto relative">
                            {/* Center line */}
                            <div 
                                className="absolute left-1/2 transform -translate-x-1/2 w-[6px] h-full"
                                style={themeStyles.background}
                            />
                            
                            <ul className="relative">
                                {timelineData?.map((item, index) => (
                                    <li
                                        key={item._id}
                                        ref={el => timelineRef.current[index] = el}
                                        className="list-none relative pt-12 flex flex-col md:flex-row items-center md:items-start"
                                    >
                                        
                                        {/* Content box */}
                                        <div
                                            style={themeStyles.background}
                                            className={`
                                                relative p-4 rounded-lg shadow-lg
                                                w-[90%] md:w-[calc(50%-40px)] max-w-xl
                                                invisible opacity-0
                                                transition-all duration-500 ease-in-out
                                                mx-auto
                                                ${index % 2 === 0 
                                                    ? 'md:ml-auto md:mr-4' 
                                                    : 'md:mr-auto md:ml-4'}
                                                [.in-view_&]:transform-none
                                                [.in-view_&]:visible
                                                [.in-view_&]:opacity-100
                                                ${index % 2 === 0
                                                    ? '[&:not(.in-view_&)]:translate-x-[100px] md:[&:not(.in-view_&)]:translate-x-[200px]'
                                                    : '[&:not(.in-view_&)]:-translate-x-[100px] md:[&:not(.in-view_&)]:-translate-x-[200px]'}
                                            `}
                                        >
                                            {/* Arrow for larger screens */}
                                            <div 
                                                className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 
                                                    ${index % 2 === 0 ? '-left-2' : '-right-2'}`}
                                                style={themeStyles.background}
                                            />
                                            
                                            <p className="text-lg md:text-xl font-semibold mb-2 text-white">
                                                {item?.time}
                                            </p>
                                            <p className="text-xl md:text-2xl font-bold mb-2 text-white">
                                                {item?.company}
                                            </p>
                                            <p className="text-base md:text-lg font-bold mb-2 text-white">
                                                {item?.role}
                                            </p>
                                            <span className="text-sm md:text-base text-white">
                                                {item?.description}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Timeline;