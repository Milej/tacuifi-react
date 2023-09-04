import { useState } from "react"
import validator from "validator"

export const useForm = (initialForm = "") => {

  const [formState, setFormState] = useState(initialForm)

  const onInputChange = ({ target }) => {
    const { name, value, validate } = target

    if (name == "email") {
      console.log(validator.isEmail(value))
    }

    // setFormState({
    //   ...formState,
    //   [name]: value
    // })
  }

  return {
    ...formState,
    formState,
    onInputChange
  }
}
