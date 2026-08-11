import { Button, Text, View } from 'react-native';


export default function HomeScreen() {
  const buttonclicked = () => {
    console.log("Button pressed");
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
        <Text>Click The Button !</Text>
      <Button title='Click me' onPress={buttonclicked}/>
    </View>
  );
}
