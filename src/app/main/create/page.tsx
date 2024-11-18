'use client'

import { geistSans,geistMono } from "@/app/fonts"
import EditableElement from "@/components/editableElement"
import useNewForm from "@/hooks/newFormContext"
import { Link, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const CreateForm:React.FC = ()=>{
    const {formState,addFormField,editFormField,deleteFormField} = useNewForm()
    const router = useRouter()

    function cancel(){
        localStorage.removeItem('form')
        router.push('/main/home')
    }

    return(
        <div className={`${geistSans.className} text-xs flex flex-col grow bg-blue-600 p-3`}>
            <div className={`bg-white flex flex-col text-black grow h-px overflow-y-auto rounded-md max-w-[800px] m-auto w-full ${geistSans.className}`}>
                <article className="flex flex-col items-center gap-1 py-3">
                    <h1 className="text-3xl">This is the tile section</h1>
                    <p className="text-xl font-medium">You can edit your form here when you want.</p>
                </article>
                {Object.keys(formState).length==0&&<p className="text-center">Get started by adding field to create a form</p>}
                <div className="flex flex-col p-3 grow py-4">
                    {Object.keys(formState).map(ele=>(
                        <div key={ele} className="p-1 my-1 rounded-md border-2">
                            <EditableElement deleteField={()=>{deleteFormField(ele)}} key={ele} name={ele} type={formState[ele].type} errorMsg={""} handleEdit={editFormField}/>
                        </div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-center">
                    <button onClick={()=>{addFormField(`field-${Date.now()}`,'text','','what is this field?')}} className="rounded-md flex items-center gap-3 shadow-md p-2 bg-gray-300 hover:bg-gray-400 duration-300">
                        <PlusIcon size={12}/>
                        <span>Add Field</span>
                    </button>
                </div>
            </div>
            <div className="items-center max-w-[800px] m-auto w-screen py-2 flex justify-center gap-2">
                <button className="rounded-md shadow-md p-2 bg-green-500">Create form</button>
                <button onClick={cancel} className="rounded-md shadow-md p-2 bg-black text-white" >Cancel</button>
            </div>
        </div>
    )
}

export default CreateForm