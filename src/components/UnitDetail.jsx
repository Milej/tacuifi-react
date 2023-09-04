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
    <div className="container grid space-y-4 mx-auto py-20">
      <h1 className="text-5xl">{unit.title} | <span className="text-2xl">{unit.subtitle}</span></h1>
      <div className="grid grid-cols-3 space-y-4 ">
        <div className="col-span-1">
          <p>{unit.info}</p>
          <h2 className="text-2xl font-semibold pt-4 text-center">Equipado con</h2>
          <ul className="grid grid-cols-2">
            {unit.equipment.map((item) => (
              <li className="flex flex-col items-center py-1">
                <span>{showIcon(item.icon)}</span>
                {item.name}
              </li>
            ))}
          </ul>
          <Services />
        </div>
        <div className="col-span-2">
          <CarouselContainer images={unit.images} folder={unit.folder} />
        </div>
      </div>
    </div>
  )
}

export default UnitDetail