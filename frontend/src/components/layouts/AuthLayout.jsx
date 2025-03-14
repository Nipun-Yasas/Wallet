import React from 'react'

import CARD_2 from '../../assets/images/card2.png'

export default function AuthLayout({children}) {
  return (
    <div className="flex">
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
            {children}
        </div>

    
    </div>

  )
}
