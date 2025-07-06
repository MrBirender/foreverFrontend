import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 m-auto mb-5 text-center mt-14 sm:mt-20'>
      
      <div className='flex flex-col items-center '>
        <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="exchnage_icon" />
        <h2 className='font-semibold sm:text-lg'>Easy Exchange Policy</h2>
        <p className='text-gray-500'>We offer hassle free exchange policy</p>
      </div>

      <div className='flex flex-col items-center '>
        <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="return_icon" />
        <h2 className='font-semibold sm:text-lg'>7 Days Return Policy</h2>
        <p className='text-gray-500'>We provide 7 days free return policy</p>
      </div>

      <div className='flex flex-col items-center '>
        <img className='w-12 m-auto mb-5' src={assets.support_img} alt="support_icon" />
        <h2 className='font-semibold sm:text-lg'>Best customer support</h2>
        <p className='text-gray-500'>we provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicies
