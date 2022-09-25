import React, { useState } from "react";
import { View, Text,StyleSheet } from "react-native";
import { Button, Checkbox  } from "react-native-paper";
import {Entypo } from '@expo/vector-icons';

interface propsDate{
    text: string,
    translate: any[]; 
    index: any; 
    setter:(arg0: any[]) => void;
    textTyped:string;
}
export const CardHome =({text,translate,index,setter,textTyped}:propsDate)=>{
    const [checked, setChecked] = useState(true);

    const handleDelete=()=>{
        translate.splice(index,1)
        setter([...translate])

    }
    return(
        <View style={styles.container}>
            <View style={{width:"80%"}}>
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
                <Checkbox
                    color="blue"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Button
                    style={{marginLeft:-15}}
                    onPress={() => {
                        handleDelete()
                    }}
                >
                    <Entypo name={'trash'} color={'black'} size={18} /> 
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        alignItems:"center",
        padding:20,
        backgroundColor:"#F5F5F5",
        justifyContent:"space-between",
        borderRadius:10,
        marginTop:10,
    },
    buttonClick:{
        alignItems:"center",
        flexDirection:"row",
    },
})