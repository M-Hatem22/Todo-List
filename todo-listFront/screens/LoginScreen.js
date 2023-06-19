import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button ,Alert ,Input} from 'react-native';
import{ React, useState} from 'react';
import { useNavigation } from '@react-navigation/native';

 function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
    //variable to store api response 
    const userdata={
      token:"",
      name:"",
      id:0
    }
  const login = () =>{
    if (email ==="Admin" && 
        password==="admin")
        {console.log("Allowed")
      setEmail(null);
      setPassword(null);
      navigation.reset({
        index:0,
        routes:[{name:"TodoScreen"}]
      })
    }
     else if(email==null |password==null)
     {
          Alert.alert("Error","Wrong UserName or Password")
          setEmail(null);
      setPassword(null);
        }else{
          console.log(email , password)
          fetch("http://192.168.1.26:3000/login", {
           method: "POST",
             headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
             },
              body: JSON.stringify({
              email: email,
               password: password,
              })
              
})
  .then((response) => {
    response.json()
  if (response.status == 200 ){
    // alert("data OK");
   
    navigation.reset({
        index:0,
        routes:[{name:"TodoScreen"}]
      })
}else{
    alert("Invalid Credentials")
}})
  .then((responseData) => {
    
    //then we pass the userdata object to the state managment
    //to pass it to other components that needs it as props
    var user=JSON.stringify(responseData.username);
    var id = JSON.stringify(responseData.userid);
    var tok = JSON.stringify(responseData.token);

  userdata.token=tok;
  userdata.name=user;
  userdata.id=id;
  console.log(userdata.name);
   
  })
 
  setPassword(null);
        }
  }
  return (
    <View style={[styles.container,styles.global]}>
      <View style={[styles.block, styles.shadowProp]}>
      <Image 
      source= {require('../assets/w.jpeg')}
      style={styles.images}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        onChangeText={text => setEmail(text)}
        value={email}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        
      />
       <Button
        color='#bccbe3'
        title="Login"
        onPress={()=>login()}
        style={styles.button}
      />
      <Button
        color='#bccbe3'
        title="Register"
        onPress={()=>{
          navigation.reset({
            index:0,
            routes:[{name:"RegisterScreen"}]
          })
        }}
        style={styles.button}
      />
      </View> 
      <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({
  global:
  {
    backgroundColor:'#dddcf7'
  },container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  input: {
    height: 60,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
    backgroundColor:'#eef'
  },
  images:{
    width:150,
    height:150,
    borderRadius:40
  },
  block:{
    backgroundColor:'#2b71fc',
    width:400,
    height:450,
    borderRadius:40,
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:40
  },
  button:{
    width:300,
    backgroundColor:'yellow',
    borderRadius:30,
  },
  shadowProp:{
    elevation: 20,
    shadowColor: '#0508ab',
  }
});

export default Login;