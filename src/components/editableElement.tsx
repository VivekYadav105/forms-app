import { PencilIcon, XIcon, CheckIcon, TrashIcon, PlusIcon } from "lucide-react"
import React, { forwardRef, useEffect, useState } from "react"
import { useImperativeHandle } from "react"

interface EditableElementProps{
    defaultValue?:string|number
    name:string,
    type:string,
    errorMsg:string,
    options?:{value:string,text:string,name:string}[]
    handleEdit:(name:string,value:string,type:string,text:string,options?:{value:string,text:string}[])=>void
    deleteField:()=>void
}

const EditableElement:React.FC<EditableElementProps> = (props)=>{
    const [value,setValue] = useState(props.defaultValue||'')
    const [type,setType] = useState(props.type||'text')
    const [text,setText] = useState('')
    const [options,setOptions] = useState(props.options||[])
    const [editable,setEditable] = useState(false)

    useEffect(()=>{
        console.log(type);
        
    },[type])

    function deleteField(){
        props.deleteField()
    }

    function editField(){
        setEditable(false)
        props.handleEdit(props.name,value as string,type,text,options)
    }

    function addOption(){
        setOptions(prev=>([...prev,{value:"edit your option here",text:"edit your option here",name:String(Date.now())}]))
    }

    function editOption(name:string,value:string){
        console.log(value);
        setOptions(prev=>{
            const option = prev.findIndex(ele=>ele.name == name)
            if(option){
                prev[option].value = value
                prev[option].text = value
            }
            return [...prev]
        })
    }
    
    return(
        <article className="flex items-center w-full gap-2">
            <article className="flex w-full flex-col">
                <article className="flex w-full flex-col">
                    <label htmlFor="">Question:</label>
                    <input className="input" disabled={!editable} onChange={(e)=>{setText(e.target.value)}} value={text} placeholder="Please edit your question here."/>
                </article>
                <article className="flex w-full flex-col">
                    <label htmlFor="">Answer:</label>
                    {type!='radio'&&type!="checkbox"&&(
                        <input type={type} className="input" disabled={!editable} placeholder="Your answer looks like."/>
                    )}
                    {['radio', 'checkbox'].includes(type)&&(
                        <>
                        {
                            options.map(ele=>(
                                <article key={ele.name} className="flex gap-2 items-center">
                                    <input type={type} value={ele.value}/>
                                    <input onChange={(e)=>editOption(ele.name,e.target.value)} type="text" defaultValue={ele.value} />
                                </article>
                            ))
                        }
                        <button onClick={addOption}>
                            <PlusIcon/>
                        </button>
                        </>
                    )}
                </article>
            </article>
            <article className="flex flex-col">
                {editable&&(
                    <article>
                        <label className="mb-2">Type</label>
                        <select onChange={(e)=>setType(e.target.selectedOptions[0].value)} value={type} className="input">
                            <option value="text">Text</option>
                            <option value="date">Date</option>
                            <option value="time">Time</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">CheckBox</option>
                            <option value="file">File</option>
                        </select>
                    </article>
                )}
                <article className="flex items-center gap-4  px-2">
                    {!editable&&(
                        <button className="mt-3" onClick={()=>setEditable(!editable)}>
                            <PencilIcon  size={16}/>
                        </button>
                    )}
                    {editable&&(
                        <button onClick={editField} className="text-green-500 bg-green-300 p-1.5 rounded-md shadow-md mt-3">
                            <CheckIcon size={16}/>
                        </button>
                    )}
                    <button className="mt-3 text-red-500 bg-red-300 p-1.5 rounded-md shadow-md" onClick={()=>{deleteField()}}>
                        <TrashIcon size={16}/>
                    </button>
                </article>
            </article>
        </article>
    )
}

export default EditableElement