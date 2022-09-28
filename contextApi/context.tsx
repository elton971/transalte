import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications'

interface SaveContextData {
    save:any;
    deleteSave:(id:number)=>void;
    saveAsyncStorage:()=>void;
    setSave:([]:any)=>void;

}

interface SaveProviderProps{
    children:ReactNode;
}

interface translateProps{
    text:string,
    inputText:string
}

export const SaveDownContext =createContext({} as SaveContextData);

export function SaveDownProvider({children}:SaveProviderProps){
    const [save,setSave]=useState<Array<translateProps>>([]);
    const toast=useToast();
    
    
    useEffect(()=>{
      const ver=async()=>{
        setSave(await getData()) 
      };
      ver();
    },[])

    const deleteSave=(id:number)=>
    {
      save.splice(id,1);
      setSave([...save]);
      removeSchedule();
      toast.show("Save successfully", {
        type: "success",
        placement: "bottom",
        duration: 1000,
        animationType: "zoom-in",
    });
    }

    const  removeSchedule=async()=>
    {
      await AsyncStorage.removeItem("@tradutor")
      try {
        const jsonValue = JSON.stringify(save)
        await AsyncStorage.setItem('@tradutor', jsonValue)
        
      } catch (e) {
        // saving error
      }
    }
   
    const saveAsyncStorage = async () => {
      try {
        const jsonValue = JSON.stringify(save)
        await AsyncStorage.setItem('@tradutor', jsonValue)
        
      } catch (e) {
        // saving error
      }
    }


    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tradutor')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
      }
    }

    


    return(
        <SaveDownContext.Provider value={{
            save,
            deleteSave,
            saveAsyncStorage,
            setSave

            
        }}>
            {children}      
        </SaveDownContext.Provider>
    )
}

function asyc() {
  throw new Error('Function not implemented.');
}
