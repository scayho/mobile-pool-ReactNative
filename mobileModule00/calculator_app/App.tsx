
import {  Pressable, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import { evaluate } from 'mathjs';

export default function App() {
  const [result, SetResult] = useState<string>("0");
  const [expression, SetExpression] = useState<string>("0");
  const calculatenumbers = ['1','2','3','4','5','6','7','8','9','0','.'];
  const options = ['AC','C'];
  const operations = ['*','+','-','/','='];
  const clickedbutton = (content: string) => {
    console.log("button pressed :", content);
    
    if ("0123456789".includes(content)) {
      SetExpression(prev => {
        if (prev === "0")
          return content;
        if (prev.at(-1) === "0" && "+-*/".includes(prev.at(-2) ?? ""))
          return prev.slice(0, -1) + content;
        return prev + content;
      });
    }
    else if (content === ".") {
      SetExpression(prev => {
        const currentNumber = prev.split(/[+\-*/]/).pop() ?? "";
        if (currentNumber.includes("."))
          return prev;
        if (!"0123456789".includes(prev.at(-1) ?? ""))
          return prev + "0.";
        return prev + ".";
      });
    }
    else if ("+-*/".includes(content)) {
      SetExpression(prev => {
        const last = prev.at(-1) ?? "wrong";
        const beforlast = prev.at(-2) ?? "wrong";
        console.log(last, beforlast);
        if (prev === "-")
          return "-";
        if (prev === "0" && content === "-")
          return "-";
        if (last === ".")
          return prev.slice(0, -1) + content;
        if ("+-*/".includes(last)) {
          if (content === "-" && last !== "-")
            return prev + content;
          else if (last == '-' && "+*/".includes(beforlast) && content !== "-")
            return prev.slice(0, -2) + content;
          return prev.slice(0, -1) + content;
        }
          return prev + content;
      });
    }
      else if (content === "=") {
        try {
          let tmp = expression;
          while (tmp.length > 0 && "+-*/.".includes(tmp.at(-1) ?? ""))
            tmp = tmp.slice(0, -1);
          if (tmp === "") {
            SetResult("0");
            return;
          }
          const value = evaluate(tmp);
          if (typeof value !== 'number' || !isFinite(value)) {
            SetResult('Error');
          } else {
            SetResult(String(value));
          }
        } catch {
          SetResult('Error');
        }
      }
    else if(content === "C")
      {
        if (expression.length < 2)
          SetExpression("0");
        else
          SetExpression(prev => prev.slice(0, -1));
      }
    else if(content === "AC")
      {
        SetResult("0");
        SetExpression("0");
      }
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
            {expression}
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
          <Text style={{fontSize: 64, textAlign: 'right',  color: '#FFFFFF'}}>{result}</Text>
            </ScrollView>
        </View>
        <View style={{ backgroundColor: '#ADD8E6', flexDirection: 'row',  alignItems: 'flex-end' }}>

          <View style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap' }}>
            {calculatenumbers.map((item, index) => (
              <View key={index} style={{ width: '33.33%'}}>
                <Pressable onPress={() => clickedbutton(item)}>
                  <Text style={{ fontSize: 37, textAlign: 'center', color: 'black' }}>{item}</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              {options.map((item, index) => (
                <View key={index} style={{ flex: 1}}>
                  <Pressable onPress={() => clickedbutton(item)}>
                    <Text style={{ fontSize: 37, textAlign: 'center', color: 'red' }}>{item}</Text>
                  </Pressable>
                </View>
              ))}
            </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {operations.map((item, index) => (
              <View key={index} style={{ width: '50%'}}>
                <Pressable onPress={() => clickedbutton(item)}>
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
