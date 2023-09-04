import { CircularProgress } from "@mui/material"

const Loader = () => {
  return (
    <div className='grid place-content-center min-h-screen'>
      <CircularProgress />
    </div>
  )
}

export default Loader