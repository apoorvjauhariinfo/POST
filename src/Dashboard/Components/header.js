import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import { Text } from 'recharts'

function Header({OpenSidebar}) {
  const hospitalname = localStorage.getItem('hospitalname')
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
        <Text /> {hospitalname}
      </div>
        <div className='header-right'>
        
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header