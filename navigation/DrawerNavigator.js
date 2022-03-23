import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Cart from '../screens/Qr';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
 return (
<Drawer.Navigator>
<Drawer.Screen name="Home" component={Home}
options={{
    headerShown:false
}}
/>
</Drawer.Navigator>
 );
};
export default DrawerNavigator;