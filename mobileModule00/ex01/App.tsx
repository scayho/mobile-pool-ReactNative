import {Pressable, Button, Text, View } from 'react-native';
import { useState } from 'react';


export default function HomeScreen() {
  const [ButtonValue, SetButtonValue] = useState<boolean>(false);
  const buttonclicked = () => {
    console.log("Button pressed");
    SetButtonValue(!ButtonValue);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
        <Text style={{ backgroundColor: '#ADD8E6', fontSize: 37, borderColor: 'blue', borderRadius: 10, borderWidth: 2}}>{ButtonValue ? 'Hello World!' : 'Click The Button !'}</Text>
        <Pressable onPress={buttonclicked}>
                  <Text style={{ fontSize: 37, textAlign: 'center', color: 'black', backgroundColor: '#ADD8E6', borderRadius: 10, borderWidth: 2 }}>Click me</Text>
                </Pressable>
    </View>
  );
}
