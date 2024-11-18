import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

const SubmitButton = (props:{children:ReactNode})=>{
    const {pending} = useFormStatus()
    return(
        <button type="submit" className="text-center bg-green-500 w-full p-2 mt-3 rounded-md shadow-md">
            {props.children}
        </button>
    )
}

export default SubmitButton