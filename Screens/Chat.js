import { View ,Text, Button} from "react-native";
import auth from "@react-native-firebase/auth";
const ChatScreen = ({navigation}) => {

  const signOut = () => {
  auth()
  .signOut()
    .then(() => {
      console.log('User signed out!');
      navigation.navigate("Login");
    });
}

  return (
    <View>
      <Text>ChatScreen</Text>
      <Button title="Sign out" onPress={()=>{signOut()}}/>
    </View>
  )
}


export default ChatScreen;