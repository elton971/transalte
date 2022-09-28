import React, { useContext } from 'react';
import {StyleSheet, View,Text, FlatList } from 'react-native';
import { CardHome } from '../components/CardHome';
import { SaveDownContext } from '../contextApi/context';



export default function SavedScreen() {

  const {save}=useContext(SaveDownContext)

  return (
    <View  style={styles.container}>
      <FlatList
          data={save}
          renderItem={({ item, index }) => (
            <CardHome 
              text={item.text} 
              translate={save}
              index={index}
              setter={()=>{}}
              textTyped={item.inputText}
              viewBoolean={false}
            />        
          )}
          showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    paddingHorizontal:20
    
  },
});
