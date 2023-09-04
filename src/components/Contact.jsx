import { useForm } from "../hooks/useForm"

const Contact = () => {

  const initialForm = {
    name: "",
    phone: "",
    email: "",
    paxAdult: "",
    paxChildren: "",
    paxBaby: "",
    paxPet: "",
    checkin: "",
    checkout: "",
    message: ""
  }
  const { formState, name, phone, email, paxAdult, paxChildren, paxBaby, paxPet, checkin, checkout, message, onInputChange } = useForm(initialForm)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <div className='container mx-auto p-10'>
      <h1 className='text-5xl text-center'>Contacto</h1>

      <form className='grid grid-cols-3 p-10 my-10 gap-10 bg-white rounded-lg' onSubmit={onSubmit}>

        <div className='space-y-5 col-span-1'>
          <div className=''>
            <label htmlFor="name" className='block text-gray-700 text-md w-full'>Nombre</label>
            <input type="text" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="name" onChange={onInputChange} value={name} />
          </div>
          <div className=''>
            <label htmlFor="phone" className='block text-gray-700 text-md w-full'>Teléfono</label>
            <input type="text" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="phone" onChange={onInputChange} value={phone} />
          </div>
          <div className=''>
            <label htmlFor="email" className='block text-gray-700 text-md w-full'>Correo electrónico</label>
            <input type="email" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="email" onChange={onInputChange} value={email} />
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex-col col-span-1'>
              <label htmlFor="paxAdult" className='block text-gray-700 text-md w-full'>Adultos</label>
              <input type="number" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="paxAdult" onChange={onInputChange} value={paxAdult} />
            </div>
            <div className='flex-col col-span-1'>
              <label htmlFor="paxChildren" className='block text-gray-700 text-md w-full'>Menores</label>
              <input type="number" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="paxChildren" onChange={onInputChange} value={paxChildren} />
            </div>
            <div className='flex-col col-span-1'>
              <label htmlFor="paxBaby" className='block text-gray-700 text-md w-full'>Menores de 3</label>
              <input type="number" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="paxBaby" onChange={onInputChange} value={paxBaby} />
            </div>
            <div className='flex-col col-span-1'>
              <label htmlFor="paxPet" className='block text-gray-700 text-md w-full'>Mascotas</label>
              <input type="number" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="paxPet" onChange={onInputChange} value={paxPet} />
            </div>
          </div>

          <div className='grid grid-cols-4 gap-2'>
            <div className='flex-col col-span-2'>
              <label htmlFor="checkin" className='block text-gray-700 text-md w-full'>Check In</label>
              <input type="date" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="checkin" onChange={onInputChange} value={checkin} />
            </div>
            <div className='flex-col col-span-2'>
              <label htmlFor="checkout" className='block text-gray-700 text-md w-full'>Check Out</label>
              <input type="date" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="checkout" onChange={onInputChange} value={checkout} />
            </div>
          </div>

          <div>
            <label htmlFor="message" className='block text-gray-700 text-md w-full'>Consulta</label>
            <textarea rows="4" className='w-full border border-gray-300 focus:ring-gray-600 focus:border-none' name="message" onChange={onInputChange} value={message}></textarea>
          </div>
          <button type='submit' className='w-full bg-green-500 text-white px-5 py-3 focus:border-none hover:bg-green-600'>Enviar</button>
        </div>
        <div className='col-span-2'>
          <img src="http://resource.ferozo.net/tacuifi/tacuifi2/7.jpg" alt="" className='rounded-lg' />
        </div>

      </form>
    </div>
  )
}

export default Contact