import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator'
import Send from '../screens/Send';
import Deposit from '../screens/Deposit';
import Qr from '../screens/Qr';
const Stack = createStackNavigator();
const StackNavigator = () => {
 return (
<Stack.Navigator>
<Stack.Screen
       name="Main"
       component={DrawerNavigator}
       options={{
        headerShown:false,
         title: 'Main',
         headerStyle: {
           backgroundColor: '#09f',
         },
       }}
     />
<Stack.Screen name="Send" component={Send} />
<Stack.Screen name="Deposit" component={Deposit} />
<Stack.Screen name="User" component={Qr} />
</Stack.Navigator>
 );
};
export default StackNavigator;