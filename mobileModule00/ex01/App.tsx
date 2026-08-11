import { Button, Text, View } from 'react-native';
import { useState } from 'react';


export default function HomeScreen() {
  const [ButtonValue, SetButtonValue] = useState<boolean>(false);
  const buttonclicked = () => {
    console.log("Button pressed");
    SetButtonValue(!ButtonValue);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
        <Text>{ButtonValue ? 'Hello World!' : 'Click The Button !'}</Text>
      <Button title={'Click me'} onPress={buttonclicked} />
    </View>
  );
}
