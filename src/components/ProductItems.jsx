import React, { useContext } from 'react'
import { ShopContext } from '../context/Shop/ShopContext'
import { Link } from 'react-router-dom'

const ProductItems = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext)
  return (

    //   this is the correct location
   <Link  className='text-gray-700 cursor-pointer ' to={`/product/${id}`}>
   <div className='overflow-hidden '>
    <img className='hover:scale-110 transition ease-in-out ' src={image[0]} alt={`latestProduct${id}`} />
   </div>
   <p className='text-sm pt-3 pb-1'>{name}</p>
   <p className='text-sm font-medium'>{currency}{price}</p>
   </Link>
  )
}

export default ProductItems
