import { FaEnvelope, FaWhatsapp } from 'react-icons/fa'

const IconHome = () => {
  return (
    <div className="fixed z-50 gap-3 bottom-5 right-5">
      <i className="text-[1.8rem] bg-white rounded-full w-14 h-14 flex-center mb-3">
        <FaEnvelope className="text-[#F34A4E]" />
      </i>
      <i className="bg-[#43D25A] rounded-full w-14 h-14 flex-center text-[2.7rem]">
        <FaWhatsapp className="text-white " />
      </i>
    </div>
  )
}

export default IconHome
