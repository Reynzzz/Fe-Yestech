import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaPhoneVolume } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import * as yup from 'yup'
import { IContactForm } from '../../types/IContactForm'

const ContactUs = () => {
  const formValues: IContactForm = {
    name: '',
    phone: '',
    email: ''
  }

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IContactForm>({
    defaultValues: formValues,
    resolver: yupResolver(schema)
  })

  const handleSubmitForm = (data: IContactForm) => {
    const message = `Name  : ${data.name} 
Phone : ${data.phone} 
Email  : ${data.email}
Message : 'Default message`
    window.open(`https://api.whatsapp.com/send?phone=6281288162075&text=${encodeURIComponent(message)}`, '_blank')
    // window.open(`https://api.whatsapp.com/send?phone=6282312852620&text=${encodeURIComponent(message)}`, '_blank')
  }
  return (
    <section className="relative overflow-hidden top-0 right-0 left-0 bottom-0 w-full py-20 min-h-screen bg-[#10121D] flex-center gap-3 md:gap-5 flex-col ">
      <h1 className="mt-5 text-3xl font-bold text-white md:text-5xl md:mt-0">Contact Us</h1>
      <p className="mb-3 text-xs font-normal text-white md:text-sm">
        Any question or remarks? Just write us a message!
      </p>
      <div className="bg-transparent md:bg-white w-full md:w-[758px] lg:w-[878px] md:h-[467px] rounded-md flex md:flex-row flex-col-reverse p-3 ">
        <div className='relative bg-[url("/images/contact-us/banner.png")] h-[357px] md:h-auto w-full md:w-[40%] rounded-md  bg-cover p-8 text-white flex flex-col gap-2 justify-start'>
          <h2 className="text-2xl font-medium">Contact Information</h2>
          <p className="text-sm font-normal text-[#C9C9C9]">Say something to start a live chat!</p>
          <ul className="flex flex-col gap-5 mt-5 md:gap-8 md:mt-14">
            <li className="flex items-center justify-start gap-5">
              <FaPhoneVolume className="w-4 h-4 -rotate-45" /> <p className="text-sm font-light">yestech@yes-led.com</p>
            </li>
            <li className="flex items-center justify-start gap-5">
              <FaEnvelope className="w-4 h-4" /> <p className="text-sm font-light">yestech@yes-led.com</p>
            </li>
            <li className="flex items-start justify-start gap-5">
              <FaLocationDot className="w-8 h-8" />
              <p className="text-sm font-light">
                Pergudangan Eraprima Industrial Park No C8. Jl. KH. Agus Salim No.2, Tangerang, Banten 15141
              </p>
            </li>
          </ul>

          <ul className="absolute gap-3 left-8 bottom-8 flex-center">
            <li>
              <FaInstagram className="w-4 h-4" />
            </li>
            <li>
              <FaTwitter className="w-4 h-4" />
            </li>
            <li>
              <FaFacebook className="w-4 h-4" />
            </li>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="relative w-full  h-[357px] md:h-auto bg-white md:bg-transparent rounded-md md:rounded-none mb-5 md:mb-0 md:w-[60%] p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#8D8D8D] font-medium text-sm md:text-lg">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              className="placeholder:text-[#011C2A] focus:bg-white bg-white outline-none text-[20px] font-semibold border-b pb-2 border-[#8D8D8D]"
              {...register('name')}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[#8D8D8D] font-medium text-sm md:text-lg">
              Phone Number
            </label>
            <input
              id="phone"
              type="number"
              placeholder="08379892029"
              className="placeholder:text-[#011C2A] focus:bg-white bg-white outline-none text-[20px] font-semibold border-b pb-2 border-[#8D8D8D]"
              {...register('phone')}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#8D8D8D] font-medium text-sm md:text-lg">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="placeholder:text-[#011C2A] focus:bg-white bg-white outline-none text-[20px] font-semibold border-b pb-2 border-[#8D8D8D]"
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="absolute px-12 py-1 font-semibold text-black transition-all border-2 border-black rounded-full cursor-pointer bottom-5 md:bottom-0 md:py-2 hover:bg-primary hover:border-primary hover:text-white right-8"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactUs
