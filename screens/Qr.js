import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const Qr = (props) => {
 return (
<View style={styles.container}>
<Text>This is a User Screen</Text>
</View>
 );
};
const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
});
export default Qr;