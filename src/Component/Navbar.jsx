import React from 'react'
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800  text-white py-2'>
    {/* <nav className='flex justify-between bg-violet-700 text-white py-2'> */}
        <div className="logo">
            <span className="font-bold text-xl mx-9 cursor-default">Task Manager</span>
        </div>
      <ul className="flex gap-8 mx-8">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        {/* <li className='cursor-pointer hover:font-bold transition-all text-3xl'><FaHome /></li> */}
        {/* <li className='cursor-pointer hover:font-bold transition-all'>Your task</li> */}
      </ul>
    </nav>
  )
}

export default Navbar
