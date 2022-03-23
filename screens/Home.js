import 'react-native-gesture-handler';
import React, {useState, useCallback,useRef } from 'react';
import { Text,StyleSheet, SafeAreaView, Image,View } from 'react-native';
import ListItem from '../components/ListItem';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const TITLES =Array.from({length: 40}, () => Math.floor(Math.random() * 40));
const TASKS = TITLES.map((title, index) => ({title,index}))

const Home = ({ navigation }) => {
const [tasks, setTasks] = useState(TASKS);
const onDismiss = useCallback(
  () => {
    setTasks((task) => tasks.filter((item) => item.index !== task.index ))
  },
  [],
)
const scrollRef = useRef(null);
 return (
<SafeAreaView style={styles.container}>
<View style={styles.menu}>
  <TouchableOpacity  onPress={() => navigation.toggleDrawer()}>
  <Image
  style={styles.menuIcon}
  source={require('../images/Menu.png')}
  />
  </TouchableOpacity>
</View>
<ScrollView ref={scrollRef} style={{ flex: 1, marginTop:20 }}>
        {tasks.map((task) => (
          <ListItem
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={onDismiss}
          />
        ))}
</ScrollView>
<View style={styles.buttonsContainer}>
<LinearGradient 
    colors={['#133FDB', 'rgba(183, 0, 77, 0.3)']} 
    start={{
      x: 0,
      y: 0
    }}
    end={{
      x: 1,
      y: 1
    }}
    style={styles.sendContainer}>
      <TouchableOpacity
        style={styles.sendButton}
         onPress={() => navigation.navigate('Send')}
        >
          <Text style={{fontSize:20, color:"white",paddingTop: 10,}}>Send</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient 
    colors={['#133FDB', 'rgba(183, 0, 77, 0.3)']} 
    start={{
      x: 0,
      y: 0
    }}
    end={{
      x: 0.25,
      y: 1
    }}
    style={styles.sendContainer}>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => navigation.navigate('Deposit')}
        >
           <Text style={{fontSize:20, color:"white",paddingTop: 10,}}>Add/Withdraw</Text>
        </TouchableOpacity>
      </LinearGradient>
        <TouchableOpacity
        onPress={() => navigation.navigate('User')}
        >
    <Image
      style={styles.menuIcon}
      source={require('../images/Qr.png')}
  />
        </TouchableOpacity>
</View>
</SafeAreaView>
 );
};
const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 menuIcon:{
   width: 25,
   height: 25,
   resizeMode: 'contain',
   
 },
 menu:{
  paddingTop: 50,
  paddingLeft: 30,
  height: 100,   
},
buttonsContainer:{
  width:'100%',
  height:100,
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  shadowColor: "rgba(51,51,51,1)",
  shadowOffset: {
    width: 3,
    height: 3
  },
  elevation:5,
  shadowOpacity: 0.55,
  shadowRadius: 0,
},
sendContainer:{
  width:120,
  height:40,
  borderRadius: 30,
},
sendButton:{
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
},
});
export default Home;