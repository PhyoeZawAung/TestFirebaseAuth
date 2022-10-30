import React, { useState } from "react";

import { Text, View, TextInput, Button } from "react-native";
import auth from "@react-native-firebase/auth";

const ResetPasswordScreen = () => {
  const [email, SetEmail] = useState("");
  const reset = (email) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("password reset mail send");
        alert("password reset mail send");

      } )
      .catch(error => console.error(error))
  }
  return (
    <View>
      <Text>Enter Email address to reset</Text>
      <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => SetEmail(text)} />
      <Button title="Reset password" onPress={() => {
        reset(email);
      }}/>
    </View>
  )
}

export default ResetPasswordScreen;