import React, { useContext, useState } from "react";
import { View, Text,StyleSheet,Alert  } from "react-native";
import { Button  } from "react-native-paper";
import { CheckBox } from 'react-native-elements'
import {Entypo } from '@expo/vector-icons';
import { SaveDownContext } from "../contextApi/context";
import { useToast } from 'react-native-toast-notifications'

interface propsDate{
    text: string,
    translate: any[]; 
    index: any; 
    setter:(arg0: any[]) => void;
    textTyped:string;
    viewBoolean:boolean;
}

export const CardHome =({text,translate,index,setter,textTyped,viewBoolean}:propsDate)=>{
    const [checked, setChecked] = useState(false);
    const {save,deleteSave,saveAsyncStorage,setSave}=useContext(SaveDownContext);
    const toast=useToast();

    const handleDelete=(tostView:boolean)=>{
        translate.splice(index,1)
        setter([...translate])
        if(tostView)
        {
            toast.show("Deleted successfully", {
                type: "success",
                placement: "bottom",
                duration: 1000,
                animationType: "zoom-in",
            });
        }
      
    }

    function addSave(){
    setSave([translate[index],...save])
        toast.show("Save successfully", {
            type: "success",
            placement: "bottom",
            duration: 1000,
            animationType: "zoom-in",
        });
    }
    const handleFavority=()=>{
        addSave()
        saveAsyncStorage()
        handleDelete(false)
    }


    const handleDeleteFavotity=()=>{
        deleteSave(index)
    }

    
    return(
        
        <View style={styles.container}>
            <View style={{width:"100%"}}>
                <Text style={{fontSize:18}}>
                    {
                        text
                    }
                </Text>
                <Text style={{fontSize:18, color:"gray"}}>
                    {
                        textTyped
                    }
                </Text>
            </View>
            
            <View style={styles.buttonClick}>

                <Button
                    style={{marginLeft:-20}}
                    onPress={() => {
                        
                        if(viewBoolean)
                        {
                            handleDelete(true)
                        }
                        else{
                            handleDeleteFavotity()
                        }
                    }}
                >
                    <Entypo name={'trash'} color={'black'} size={18} /> 
                </Button>
                {
                    viewBoolean ? 
                        <CheckBox
                        checked={checked}
                        onPress={() => {
                            setChecked(true);
                            handleFavority()
                            
                        }}   
                        /> :<></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        padding:20,
        backgroundColor:"#F5F5F5",
        justifyContent:"space-between",
        borderRadius:10,
        marginTop:10,
    },
    buttonClick:{
        marginTop:20,
        alignItems:"center",
        flexDirection:"row",
    },
})