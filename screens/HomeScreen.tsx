
import React, { useState } from 'react';
import { Platform, StyleSheet, View,Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import { RootTabScreenProps } from '../types';
import { CardHome } from '../components/CardHome';
import { useToast } from 'react-native-toast-notifications'

//Interface do objecto que ira receber o texto normal e o texto traduzido
interface translateProps{
    text:string,
    inputText:string
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [fromLanguanges,setFromLanguanges]=useState<string>('')//armazenar lingua que será traduzida
    const [toLanguanges,setToLanguanges]=useState<string>('')//armaznar para que lingua deverá ser traduzida
    const [textValue,setTextValue]=useState<string>('Enter Text')//armazenar o texto que sera traduzido
    const [translate,setTranslate]=useState<Array<translateProps>>([])//armazanar o texto ja traduzido
    const [Languanges,setLanguanges]=useState<string>('Select an language')//variavel auxiliar para armazenar a lingua selecionada
    const [loading, setLoading]= useState<boolean>(false)//variavel para controlar o loading

    const toast=useToast();

    //nomes do paises
    const countries = [
        "Inglês",
        "Espanhol",
        "Italiano",
        "Japonês",
        "Português(Brasil)",
        "Afrikaans",
        "Arabic", 
        "Bulgarian",
        "Català",
        "Čeština",
        "Cymraeg",
        "Dansk", 
        "Deutsch (Deutschland)",
        "English (US)",
        "French (France)",
        "Português (Portugal)",
    ]

    //domain name de cada pais
    const nameFlag=[
        "en-GB",
        "es-ES",
        "it-IT",
        "ja-JP",
        "pt-BR",
        "af-ZA",
        "ar",
        "bg-BG",
        "ca-AD",
        "cs-CZ", 
        "cy-GB",
        "da-DK",
        "de-DE",
        "en-US",
        "fr-FR",
        "pt-PT",
    ]

    //requisicao na api mandando o texto e a lingua
    const handleAddNewItemTranslate=()=>{
        if(textValue==null || textValue=='')
        {
            toast.show("Enter text to be translated", {
                type: "danger",
                placement: "bottom",
                duration: 1000,
                animationType: "zoom-in",
            });
        }
        else{
            if(fromLanguanges=='' || toLanguanges==''){
                toast.show("Select an languages to translate", {
                    type: "danger",
                    placement: "bottom",
                    duration: 1000,
                    animationType: "zoom-in",
                });
            }
            else{
                setLoading(true)
                fetch(
                    `https://api.mymemory.translated.net/get?q=${textValue}&langpair=${fromLanguanges}|${toLanguanges}`
                )
                .then((res) => res.json())
                .then((data) => {
                    const text=data.responseData.translatedText;
                    const inputText=textValue
                    setTranslate([{text,inputText},...translate])
                    setLoading(false)
                });
            }
        }
       
    }
  
  return (
    <View style={styles.container}>
        <View style={styles.selectCombo}>
                <SelectDropdown
                    buttonStyle={styles.dropdown1BtnStyle}
                    renderSearchInputLeftIcon={() => {
                        return <FontAwesome name={'search'} color={'#444'} size={18} />;
                    }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder="Search"
                    search={true}
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        setFromLanguanges(nameFlag[index])
                        setLanguanges(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
          

                <View style={{width: 12}}/>
                <SelectDropdown
                    buttonStyle={styles.dropdown2BtnStyle}
                    renderSearchInputLeftIcon={() => {
                        return <FontAwesome name={'search'} color={'#444'} size={18} />;
                    }}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    selectedRowStyle={styles.dropdown1SelectedRowStyle}
                    searchInputStyle={styles.dropdown1searchInputStyleStyle}
                    searchPlaceHolder="Search"
                    search={true}
                    data={countries}
                    onSelect={(selectedItem, index) => {   
                        setToLanguanges(nameFlag[index])
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
        </View>

        <View style={styles.textInput}>
            <View style={styles.toLaguages}>
                <Button>
                    <AntDesign name={'sound'} color={'black'} size={18} /> 
                </Button>

                <Text style={{color:"black",fontSize:15, fontWeight:'300'}} >
                    {Languanges}
                </Text>
               {
                loading ? (
                    <View style={{marginLeft:"5%"}}>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                ):(<></>)  
               }
                
            </View>

        
            <TextInput
                multiline
                autoCapitalize="sentences"
                autoCorrect={true}
                placeholder={textValue}
                blurOnSubmit={true}
                numberOfLines={4}
                onChangeText={(text)=>{
                    setTextValue(text)
                }}
                onSubmitEditing={()=>handleAddNewItemTranslate()}
                defaultValue={textValue}
                placeholderTextColor={"black"}
                style={styles.text}
            />

        </View>
        <View style={{height:"50%",marginVertical:20}}>
            <FlatList
                data={translate}
                renderItem={({ item, index }) => (
                    <CardHome 
                    text={item.text} 
                    translate={translate}
                    index={index}
                    setter={setTranslate}
                    textTyped={item.inputText}
                    viewBoolean={true}
                    
                    />
                    
                )}
                showsVerticalScrollIndicator={false}
  
            />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    paddingHorizontal:20
    
  },
  selectCombo:{
    flexDirection:"row",
    marginVertical:10,
    
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '##171D33',
    },
    dropdown1BtnStyle: {
        width:"50%",
        height: 50,
        backgroundColor: 'white',
        borderColor: '#444',
        borderRadius: 8,
        borderWidth: 1,
    },
    dropdown2BtnStyle:{
        width:"46%",
        height: 50,
        backgroundColor: 'white',
        borderColor: '#444',
        borderRadius: 8,
        borderWidth: 1,
    },
    dropdown2BtnTxtStyle: {
        
        color: 'black',
        textAlign: 'center',
        fontWeight: '300',
    },
    
    //==========================textInput==================
    textInput:{
        backgroundColor:"#F5F5F5",
        height:200,
        borderRadius:20,
        marginTop:20,
    },
    toLaguages:{
        alignItems:"center",
        flexDirection:"row",
        marginHorizontal:0,
        marginTop:20,
        
    },
    text:{
        marginHorizontal:20,
        marginVertical:20,
        color:"black",
        fontSize:20,
        height: 100,
        fontWeight: '300',

        
    }
});
