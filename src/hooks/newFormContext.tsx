import { useEffect, useState } from "react"

type formState = Record<string,{type:string,value:string,editable:boolean,text:string}>

const useNewForm = (defaultValues?:formState)=>{
    const [formState,setFormState] = useState<formState>({})

    const editFormField = (name:string,value:string,type:string,text:string)=>{
        if(!Object.keys(formState).find(ele=>ele==name)){
            throw new Error("Field doesn't exist")
        }
        setFormState((prev)=>({
            ...prev,[name]:{value,type,text,editable:false,options:[]}
        }))
    }

    const setFieldEditable = (name:string)=>{
        if(!Object.keys(formState).find(ele=>ele==name)){
            throw new Error("Field doesn't exist")
        }
        setFormState((prev)=>({
            ...prev,name:{...prev[name],editable:true}
        }))
    }

    const deleteFormField = (name:string)=>{
        console.log(name);
        
        setFormState(prev => {
            const { [name]: _, ...rest } = prev; 
            console.log(rest); 
            return rest; 
        });
    }

    const addFormField = (name:string,type:string,value:string,text:string) => {
        setFormState(prev=>({...prev,[name]:{
            type,value,editable:true,text
        }}))
    }

    return {formState,addFormField,deleteFormField,editFormField}
}

export default useNewForm