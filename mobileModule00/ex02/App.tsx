
import {  Pressable, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRef } from 'react';

export default function App() {

  const calculatenumbers = ['1','2','3','4','5','6','7','8','9','0','.'];
  const options = ['AC','C'];
  const operations = ['*','+','-','/','='];
  const areaclicked = (content: string) => {
    console.log("button pressed :", content);
  }
  const exprScrollRef = useRef<ScrollView>(null);
  const resultScrollRef = useRef<ScrollView>(null);
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{flex: 1,backgroundColor: '#22252D' }}>
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#3b5bdb'}}>
          <Text style={{fontSize: 42, fontWeight: 'bold', color: '#FFFFFF'}}>Calculator</Text>
        </View>
        <View style={{backgroundColor: '#1A1D23', flex: 1, paddingHorizontal: 20 }}>
        <ScrollView
          ref={exprScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          onContentSizeChange={() => {
            exprScrollRef.current?.scrollToEnd({ animated: true });
          }}
          >
          <Text numberOfLines={1} style={{ fontSize: 64, color: '#FFFFFF', textAlign: 'right' }}>
            0
          </Text>
        </ScrollView>
        <ScrollView
          ref={resultScrollRef}
          horizontal
          style={{ flexGrow: 0 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          onContentSizeChange={() => {
            resultScrollRef.current?.scrollToEnd({ animated: true });
          }}
          >
          <Text style={{fontSize: 64, textAlign: 'right',  color: '#FFFFFF'}}>0</Text>
            </ScrollView>
        </View>
        <View style={{ backgroundColor: '#ADD8E6', flexDirection: 'row',  alignItems: 'flex-end' }}>

          <View style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap' }}>
            {calculatenumbers.map((item, index) => (
              <View key={index} style={{ width: '33.33%'}}>
                <Pressable onPress={() => areaclicked(item)}>
                  <Text style={{ fontSize: 37, textAlign: 'center', color: 'black' }}>{item}</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              {options.map((item, index) => (
                <View key={index} style={{ flex: 1}}>
                  <Pressable onPress={() => areaclicked(item)}>
                    <Text style={{ fontSize: 37, textAlign: 'center', color: 'red' }}>{item}</Text>
                  </Pressable>
                </View>
              ))}
            </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {operations.map((item, index) => (
              <View key={index} style={{ width: '50%'}}>
                <Pressable onPress={() => areaclicked(item)}>
                  <Text style={{ fontSize: 37, textAlign: 'center', color: 'white' }}>{item}</Text>
                </Pressable>
              </View>
            ))}
          </View>
          </View>
        </View>   
   </View>
     </SafeAreaView>
    </SafeAreaProvider>
  );
}
