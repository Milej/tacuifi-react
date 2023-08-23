import React from 'react'
import UnitDetail from '../components/UnitDetail'

const Apartamento = () => {

  const unit = {
    title: "Apartamento",
    subtitle: "Hasta 2 personas",
    info: "Habitaciones de 25m² construidas en una planta. Cuentan con sommier doble, baño privado, pequeña galería, cochera cubierta con media sombra y asador con parrilla.",
    equipment: ["Vajilla", "Tv 50\"", "Heladera bajo mesada", "Microondas", "Pava eléctrica", "Tender"]
  }

  return (
    <UnitDetail information={unit}/>
  )
}

export default Apartamento