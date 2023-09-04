import React from 'react'
import { useNavigate } from 'react-router-dom'

const Promotions = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/contacto")
  }

  return (
    <div className='container mx-auto p-10'>
      <h1 className='text-5xl text-center mb-10'>Promociones</h1>
      <div className='grid grid-cols-4 gap-5'>
        <div className='grid col-span-1 shadow-lg rounded-lg p-10 space-y-5 text-center'>
          <h5 className='text-2xl'>Jubilados</h5>
          <p>20% de descuento a jubilados</p>
          <span className='text-gray-400 text-sm'>Válido para temporada baja. No acumulable con otras promociones.</span>
          <button type='button' className='border border-zinc-700 px-5 py-2 rounded hover:bg-zinc-700 hover:text-white place-self-center' onClick={handleClick}>Consultar</button>
        </div>
        <div className='grid col-span-1 shadow-lg rounded-lg p-10 space-y-5 text-center'>
          <h5 className='text-2xl'>3 x 2</h5>
          <p>Te regalamos la tercer noche, en cualquiera de nuestras unidades</p>
          <span className='text-gray-400 text-sm'>Válido para temporada baja</span>
          <button type='button' className='border border-zinc-700 px-5 py-2 rounded hover:bg-zinc-700 hover:text-white place-self-center' onClick={handleClick}>Consultar</button>
        </div>
        <div className='grid col-span-1 shadow-lg rounded-lg p-10 space-y-5 text-center'>
          <h5 className='text-2xl'>40% descuento</h5>
          <p>Si te quedas 5 noches o más, te brindamos un 40% de descuento</p>
          <span className='text-gray-400 text-sm'>Válido para temporada baja</span>
          <button type='button' className='border border-zinc-700 px-5 py-2 rounded hover:bg-zinc-700 hover:text-white place-self-center' onClick={handleClick}>Consultar</button>
        </div>
        <div className='grid col-span-1 shadow-lg rounded-lg p-10 space-y-5 text-center'>
          <h5 className='text-2xl'>Oktoberfest</h5>
          <p>Consultar promociones</p>
          <button type='button' className='border border-zinc-700 px-5 py-2 rounded hover:bg-zinc-700 hover:text-white place-self-center' onClick={handleClick}>Consultar</button>
        </div>
      </div>
    </div>
  )
}

export default Promotions