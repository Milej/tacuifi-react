import { useState } from "react"
import CarouselContainer from "./CarouselContainer"
import Loader from "./Loader"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Services from "./Services"
import { LiveTv, DryCleaning, Coffee, Kitchen, Microwave, Blender, AcUnit } from "@mui/icons-material"

const UnitDetail = ({ units }) => {

  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const [unit, setUnit] = useState([])

  useEffect(() => {

    const unit = units.find(item => item.id == id)
    setUnit(unit)

    unit && setLoading(false)

  }, [units])

  const showIcon = (icon) => {
    switch (icon) {
      case "LiveTv":
        return <LiveTv />
      case "Coffee":
        return <Coffee />
      case "Kitchen":
        return <Kitchen />
      case "Microwave":
        return <Microwave />
      case "Blender":
        return <Blender />
      case "DryCleaning":
        return <DryCleaning />
      case "AcUnit":
        return <AcUnit />
    }
  }

  return loading ? <Loader /> : (
    <div className="container grid space-y-4 mx-auto px-4 py-32">
      <h1 className="text-4xl">{unit.title} | <span className="text-base">{unit.subtitle}</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        <div className="col-span-1 lg:col-span-3">
          <CarouselContainer images={unit.images} folder={unit.folder} />
        </div>

        <div className="col-span-1 lg:col-span-2 lg:hidden">
          <h2 className="text-2xl font-semibold text-center">Información</h2>
          <p>{unit.info}</p>
        </div>

        <div className="col-span-1 lg:col-span-2 lg:hidden">
          <h2 className="text-2xl font-semibold text-center">Equipado con</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 text-center">
            {unit.equipment.map((item) => (
              <li className="flex flex-col items-center py-1">
                <span>{showIcon(item.icon)}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-3 lg:hidden">
          <Services />
        </div>

        <div className="hidden lg:block lg:col-span-2 space-y-4">
          <div className="">
            <h2 className="lg:text-lg xl:text-2xl font-semibold text-center">Información</h2>
            <p className="lg:text-sm xl:text-base">{unit.info}</p>
          </div>

          <div className="">
            <h2 className="lg:text-lg xl:text-2xl font-semibold text-center">Equipado con</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 text-center">
              {unit.equipment.map((item) => (
                <li className="flex flex-col items-center py-1">
                  <span>{showIcon(item.icon)}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <Services />
          </div>
        </div>

      </div>
    </div>
  )
}

export default UnitDetail