import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const Contact = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const [resetForm, setResetForm] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyForm = {
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

  const send = (data) => {

    setLoading(true)

    axios.post("https://api.tacuifi.com.ar/mail", data)
      .then(response => {

        if (response.data.accepted) {
          setResetForm(true)

          Swal.fire({
            title: 'Gracias',
            text: 'Pronto te estaremos respondiendo.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          console.error("Error: " + response.data)
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al enviar mensaje. Lo solucionaremos lo antes posible',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }

        setLoading(false)
      })

  }

  useEffect(() => {
    resetForm && reset(emptyForm)
  }, [resetForm])

  return (
    <div className='container mx-auto px-10 py-32'>
      <h1 className='text-4xl text-center'>Contacto</h1>

      <form className='grid grid-cols-1 xl:grid-cols-3 p-10 my-10 gap-10 bg-white rounded-lg' onSubmit={handleSubmit(send)}>

        <div className='grid grid-cols-12 col-span-1 gap-4'>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-6'>
            <label htmlFor="name" className='block text-gray-700 text-md w-full'>Nombre</label>
            <input
              type="text"
              className={`w-full border rounded border-gray-300  
              ${errors.name
                  ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                  : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("name", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })} />
            {
              errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )
            }
          </div>

          <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-6'>
            <label htmlFor="phone" className='block text-gray-700 text-md w-full'>Teléfono</label>
            <input
              type="text"
              className={`w-full border rounded border-gray-300  
              ${errors.phone
                  ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                  : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("phone", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })} />
            {
              errors.phone && (
                <span className="text-red-600 text-sm">{errors.phone.message}</span>
              )
            }
          </div>
          <div className='col-span-12 lg:col-span-4 xl:col-span-12'>
            <label htmlFor="email" className='block text-gray-700 text-md w-full'>Correo electrónico</label>
            <input
              type="text"
              className={`w-full border rounded border-gray-300  
              ${errors.email
                  ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                  : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("email", {
                required: {
                  value: true,
                  message: "Campo requerido"
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Debe ser formato email"
                }
              })} />
            {
              errors.email && (
                <span className="text-red-600 text-sm">{errors.email.message}</span>
              )
            }
          </div>
          <div className='col-span-12 md:col-span-3'>
            <label htmlFor="paxAdult" className='block text-gray-700 text-md w-full'>Adultos</label>
            <input
              type="number"
              className={`w-full border rounded border-gray-300  
              ${errors.paxAdult
                  ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                  : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("paxAdult", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })} />
            {
              errors.paxAdult && (
                <span className="text-red-600 text-sm">{errors.paxAdult.message}</span>
              )
            }
          </div>

          <div className='col-span-12 md:col-span-3'>
            <label htmlFor="paxChildren" className='block text-gray-700 text-md w-full'>Menores</label>
            <input type="number" className={`w-full border rounded border-gray-300 focus:ring-gray-700 focus:border-gray-700`}
              {...register("paxChildren", {
                required: { value: false }
              })} />
            {
              errors.paxChildren && (
                <span className="text-red-600 text-sm">{errors.paxChildren.message}</span>
              )
            }
          </div>
          <div className='col-span-12 md:col-span-3'>
            <label htmlFor="paxBaby" className='block text-gray-700 text-md w-full'>Men. de 3</label>
            <input type="number" className={`w-full border rounded border-gray-300 focus:ring-gray-700 focus:border-gray-700`}
              {...register("paxBaby", {
                required: { value: false }
              })} />
            {
              errors.paxBaby && (
                <span className="text-red-600 text-sm">{errors.paxBaby.message}</span>
              )
            }
          </div>

          <div className='col-span-12 md:col-span-3'>
            <label htmlFor="paxPet" className='block text-gray-700 text-md w-full'>Mascotas</label>
            <input type="number" className={`w-full border rounded border-gray-300  
              ${errors.paxPet
                ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("paxPet", {
                required: { value: false }
              })} />
            {
              errors.paxPet && (
                <span className="text-red-600 text-sm">{errors.paxPet.message}</span>
              )
            }
          </div>

          <div className='col-span-12 md:col-span-6'>
            <label htmlFor="checkin" className='block text-gray-700 text-md w-full'>Check In</label>
            <input type="date" className={`w-full border rounded border-gray-300  
              ${errors.checkin
                ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("checkin", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })} />
            {
              errors.checkin && (
                <span className="text-red-600 text-sm">{errors.checkin.message}</span>
              )
            }
          </div>
          <div className='col-span-12 md:col-span-6'>
            <label htmlFor="checkout" className='block text-gray-700 text-md w-full'>Check Out</label>
            <input type="date" className={`w-full border rounded border-gray-300  
              ${errors.checkout
                ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("checkout", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })} />
            {
              errors.checkout && (
                <span className="text-red-600 text-sm">{errors.checkout.message}</span>
              )
            }
          </div>

          <div className="col-span-12">
            <label htmlFor="message" className='block text-gray-700 text-md w-full'>Consulta</label>
            <textarea rows="4" className={`w-full border rounded border-gray-300  
              ${errors.message
                ? "border-red-500 focus:ring-red-600 focus:border-red-600"
                : "focus:ring-gray-700 focus:border-gray-700"} `}
              {...register("message", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })}
            >
            </textarea>
            {
              errors.message && (
                <span className="text-red-600 text-sm">{errors.message.message}</span>
              )
            }
          </div>
          <button
            type='submit'
            className='w-full bg-green-500 text-white px-5 py-3 focus:border-none hover:bg-green-600 col-span-12 cursor-pointer disabled:bg-gray-400 disabled:cursor-wait'
            disabled={loading ? true : false}
          >
            {!loading ? "Enviar" : "Enviando consulta..."}
          </button>
          {/* <p className="col-span-4 text-sm text-amber-500 text-center">Función no disponible por el momento. Tienes el botón de WhatsApp para enviarnos un mensaje.</p> */}
        </div>
        <div className='hidden xl:block xl:col-span-2'>
          <img src="/tacuifi2/7.jpg" alt="" className='rounded-lg' />
        </div>

      </form >
    </div >
  )
}

export default Contact