import React,{ useState ,useEffect } from "react";
import { Text, View,TextInput, Button, Pressable } from "react-native";
import auth from '@react-native-firebase/auth';
const LoginScreen = ({navigation}) => {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  const login = (emial , password) => {
    if (emial != "" && password != "") {
      auth()
      .signInWithEmailAndPassword(emial, password)
      .then(() => {
        console.log(' signed in!');
        navigation.navigate("Chat");
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
      

    }
    
  };

  

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
      <Text>LoginScreen</Text>
      <Text>email</Text>
      <TextInput style={{ borderWidth: 1 }} onChangeText={(text)=>{SetEmail(text)}} />
      <Text>password</Text>
      <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => {
        setPassword
          (text)
      }} />
      <Text>{email}</Text>
      <Text>{password}</Text>
      <Button title="Login" onPress={() => {
        login(email, password)
      }
      } />
      <Button title="signUp" onPress={() => {
        navigation.navigate("SignUp")
      }
      } />
      <Button title="FOrgot password" onPress={()=>{navigation.navigate("Reset")}}/>
      
  </View>
    );
  }
  
  return (
    
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="go to chat" onPress={() => { navigation.navigate("Chat") }} />
      
    </View>
  );
}







export default LoginScreen;