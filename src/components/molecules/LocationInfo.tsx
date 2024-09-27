import { BASE_API } from '../../config/env'
import { ILocations } from '../../types/IMapView'

const LocationInfo: React.FC<ILocations> = ({ currentData, name, isHovered, handleMouseEnter }) => {
  let infoContent: React.ReactNode = null

  switch (name) {
    case 'Jabodetabek':
      infoContent = (
        <div
          onMouseEnter={() => handleMouseEnter(name)}
          className="absolute -left-[20rem] overflow-auto -top-[21.5rem] z-50 mt-2 p-10"
        >
          <div className="p-5 bg-white rounded-t-[40px] h-min w-[353px] overflow-auto border-2 border-[#CCCCCC] rounded-bl-[40px]">
            <h3 className="mb-5 text-lg font-semibold text-center text-secondary">{name}</h3>
            <ul className="w-full">
              <div className="grid grid-cols-2 gap-5">
                {currentData?.map((item, index) => (
                  <li key={index} className=" w-[109px]  rounded-2xl h-auto flex-center">
                    <img src={`${BASE_API}/${item?.image}`} />
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      )
      break

    case 'Jogjakarta':
      infoContent = (
        <div
          onMouseEnter={() => handleMouseEnter(name)}
          className="absolute -left-[20rem] overflow-auto top-[2rem] z-30 mt-2 p-10"
        >
          <div className="p-5 bg-white rounded-b-[40px] h-min w-[323px] overflow-auto border-2 border-[#CCCCCC] rounded-tl-[40px]">
            <h3 className="mb-2 text-lg font-semibold text-center text-secondary">{name}</h3>
            <ul className="w-full flex-center">
              {currentData?.map((item, index) => (
                <li key={index} className=" w-[109px] rounded-2xl h-auto flex-center">
                  <img src={`${BASE_API}/${item?.image}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
      break

    case 'Surabaya':
      infoContent = (
        <div
          onMouseEnter={() => handleMouseEnter(name)}
          className="absolute -left-[2rem] overflow-auto -top-[15rem] z-30 mt-2 p-10"
        >
          <div className=" bg-white rounded-t-[40px] p-5  h-min w-[353px] overflow-auto  border-2 border-[#CCCCCC] rounded-br-[40px]">
            <h3 className="text-lg font-semibold text-center text-secondary">{name}</h3>
            <ul className="w-full gap-2 flex-center ">
              {currentData?.map((item, index) => (
                <li key={index} className=" w-[109px] rounded-2xl h-auto flex-center">
                  <img src={`${BASE_API}/${item?.image}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
      break
    case 'Bali':
      infoContent = (
        <div onMouseEnter={() => handleMouseEnter(name)} className="absolute -left-[1.5rem]  top-[2rem] z-30 mt-2 p-10">
          <div className=" bg-white rounded-b-[40px] overflow-auto w-[353px] p-2 h-min border-2 border-[#CCCCCC] rounded-tr-[40px]">
            <h3 className="text-lg font-semibold text-center text-secondary">{name}</h3>
            <ul className="w-full flex-center">
              {currentData?.map((item, index) => (
                <li key={index} className=" w-[109px]  rounded-2xl h-auto flex-center">
                  <img src={`${BASE_API}/${item?.image}`} alt={item?.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
      break
      case 'Manado':
        infoContent = (
          <div onMouseEnter={() => handleMouseEnter(name)} className="absolute -left-[1.5rem]  top-[2rem] z-30 mt-2 p-10">
            <div className=" bg-white rounded-b-[40px] overflow-auto w-[353px] p-2 h-min border-2 border-[#CCCCCC] rounded-tr-[40px]">
              <h3 className="text-lg font-semibold text-center text-secondary">{name}</h3>
              <ul className="w-full flex-center">
                {currentData?.map((item, index) => (
                  <li key={index} className=" w-[109px]  rounded-2xl h-auto flex-center">
                    <img src={`${BASE_API}/${item?.image}`} alt={item?.name} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        break
        case 'Samarinda':
          infoContent = (
            <div onMouseEnter={() => handleMouseEnter(name)} className="absolute -left-[1.5rem]  top-[2rem] z-30 mt-2 p-10">
              <div className=" bg-white rounded-b-[40px] overflow-auto w-[353px] p-2 h-min border-2 border-[#CCCCCC] rounded-tr-[40px]">
                <h3 className="text-lg font-semibold text-center text-secondary">{name}</h3>
                <ul className="w-full flex-center">
                  {currentData?.map((item, index) => (
                    <li key={index} className=" w-[109px]  rounded-2xl h-auto flex-center">
                      <img src={`${BASE_API}/${item?.image}`} alt={item?.name} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
          break
    default:
      infoContent = (
        <div className="absolute z-30 p-2 mt-2 text-xs text-black bg-white rounded shadow-lg top-full">
          Info about {name}
        </div>
      )
  }

  return <>{isHovered && infoContent}</>
}

export default LocationInfo
