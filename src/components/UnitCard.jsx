import { Card } from 'flowbite-react'
import React from 'react'

const UnitCard = ({img, title, subtitle}) => {
  return (
    <Card imgSrc={img} className='mx-12 max-w-2xl hover:scale-105 duration-300'>
      <h4 className='text-2xl md:text-4xl font-bold'>{title}</h4>
      <h6 className='text-base md:text-lg font-semibold'>{subtitle}</h6>
    </Card>
  )
}

export default UnitCard