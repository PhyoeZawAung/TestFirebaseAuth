import { Text, View,TextInput,Button } from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
const SignUpScreen = ({navigation}) => {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = (email, password) => {
    if (email != "" && password != "") {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          alert('User account created & signed in!');
          navigation.navigate("Chat");

        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use! , try login');
            navigation.navigate("Login");
          }
    
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
    
          console.error(error);
        });
       }
      };
  return (
    <View>
      <Text>SignUpScreen</Text>
      <Text>email</Text>
      <TextInput style={{ borderWidth: 1 }} onChangeText={(text)=>{SetEmail(text)}} />
      <Text>password</Text>
      <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => {
        setPassword
          (text)
      }} />
      <Text>{email}</Text>
      <Text>{password}</Text>
      <Button title="SignUP" onPress={() => {
        signup(email, password)
      }
      } />
    
      
  </View>
  )
  

}

export default SignUpScreen;