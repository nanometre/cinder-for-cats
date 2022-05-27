import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar bg-gray-200 dark:bg-base-300'>
        <img className="w-6 h-6 mr-2" src={require('../images/cinder.png')} alt="Cinder Logo"/>
        <h1 className='font-bold uppercase text-gray-800 dark:text-white'>Cinder for Cats</h1>
    </nav>
  )
}

export default Navbar