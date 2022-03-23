import { StyleSheet,TouchableOpacity,View, Image, Text, Dimensions } from 'react-native';
import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const LIST_ITEM_HEIGHT = 120;
const ListItem = ({task, onDismiss, simultaneousHandlers}) => {
const translateX = useSharedValue(0);
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const marginVertical = useSharedValue(10);
const opacity = useSharedValue(1)
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .3;
const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });
const rStyle = useAnimatedStyle(()=>({
    transform:[{
        translateX:translateX.value
    }]
}))
const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1: 0);
    return {opacity}
})
const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
        height:itemHeight.value,
        marginVertical: marginVertical.value,
        opacity: opacity.value,
    }
})

  return (
<Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
       <View style={styles.hide}>
            <Image
            style={styles.hideIcon}
            source={require('../images/Vector.png')}
            />
            <Text style={styles.hideText}>Hide</Text>
        </View>
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <Animated.View style={[styles.task, rStyle]}>
        <LinearGradient 
    colors={['#f0f1e9', '#f0e4f2']} 
    start={{
      x: 0,
      y: 0
    }}
    end={{
      x: 1,
      y: 1
    }}
    style={styles.box}>
  <TouchableOpacity style={styles.card}>
      <View style={styles.upper}>
        <Image
        style={styles.tinyLogo}
        source={require('../images/blockie.png')}
        />
      <Text style={styles.deposit}>Deposit Request</Text>
      <View style={styles.leftRate}>
        <View style={{display:'flex', flexDirection: 'row',alignItems: 'center',paddingLeft:30}}>
        <Image
        style={styles.rating}
        source={require('../images/Rating.png')}
        />
        <Text style={styles.rate}>
          4.5
        </Text>
        </View>
        <Text style={styles.ratings}>
          {task.title} Ratings
        </Text>
      </View> 
      </View>
      
      <View style={styles.lower}>
        <View>
          <Text style={styles.lowerText}>
            Amount
          </Text>
          <Text style={styles.lowerCash}>
            Ksh 5{task.title}.56
          </Text>
        </View>
        <View style={{position:'absolute',bottom:5, right:10}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            View
          </Text>
        </TouchableOpacity>
        </View>
      </View>
  </TouchableOpacity>
  </LinearGradient>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default ListItem

const styles = StyleSheet.create({
    taskContainer:{
        width:'100%',
        alignItems: 'center',
        marginVertical:10,
    },
    task:{
        width:'90%',
        height:LIST_ITEM_HEIGHT,
        borderRadius:10,
    },
    taskTitle:{
        fontSize: 16,
    },
    iconContainer:{
        height:LIST_ITEM_HEIGHT,
        width:70,
        position: 'absolute',
        right:'10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        height:LIST_ITEM_HEIGHT,
        marginVertical:-5,
      },
      button:{
        width:69,
        height:25,
        borderWidth: 1,
        borderColor: "rgba(51,51,51,0.8)",
        borderRadius: 30,
        alignItems: 'center',
      },
      buttonText:{
        fontSize:20,
        fontWeight:'bold',
        color:'rgba(19,63,219,0.8)'
      },
      lowerText:{
        fontSize:15,
        color:'rgba(51,51,51,1)'
      },
      lowerCash:{
        fontSize:20,
        fontWeight:'bold',
        color:'rgba(51,51,51,1)'
      },
      rate:{
        fontSize:13,
        color:"rgba(0,43,78,1)",
      },
      ratings:{
        fontSize:13,
        color:"rgba(19,63,219,1)",
      },
      leftRate:{
        width:"40%",
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
      },
      box:{
        borderWidth: 1,
        borderColor: "rgba(255,255,255,1)",
        borderRadius: 16,
        shadowColor: "rgba(173,167,167,1)",
        shadowOffset: {
          width: 3,
          height: 3
        },
        elevation: 5,
        shadowOpacity: 0.55,
        shadowRadius: 0,
        overflow: "hidden",
        marginVertical: 10,
      },
      upper: {
        width:'100%',
        display:'flex',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-evenly',
        alignItems:'center'
      },
      lower:{
        width:'100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingLeft: 60,
        
      },
      tinyLogo:{
        width:32,
        height:32,
        borderRadius:16,
        margin:0,
      },
      deposit:{
        fontSize:20,
        color:"rgba(0,43,78,1)",
      },
      rating: {
       width:13,
       height: 13,
      },
      hide:{
        margin: 'auto',
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
    hideIcon:{
      marginBottom:5,
      width:25,
      height: 25,
    },
    hideText:{
      fontSize:21,
      fontWeight:'bold',
      color:"rgba(239,135,135,1)"
    }
})