import React, { useState } from 'react'
import useDarkSide from '../utils/useDarkSide';
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const Switch = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkMode, setDarkMode] = useState(colorTheme === "light" ? true : false);

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkMode(checked)
    }

    return (
        <div className='flex flex-col items-center mb-8'>
            <DarkModeSwitch 
                checked={darkMode}
                onChange={toggleDarkMode}
                size={30}/>
            <h3 className='text-black dark:text-white'>{colorTheme === 'light' ? "Dark Mode" : "Light Mode"}</h3>
        </div>
    )
}

export default Switch