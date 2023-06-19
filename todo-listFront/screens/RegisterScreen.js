import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigationback = useNavigation();

  const handleRegister = () => {
    // Handle user registration logic here
    if((name == ""||null)||
    (email == ""||null) || 
    (password==""||null)){
        alert("please complete the fields")
    }
    //add any more validation like email and password pattern
    else {
        fetch('http://192.168.1.26:3000/register', {
         method: 'POST',
         headers: {
                  'Content-Type': 'application/json'
                  },
          body: JSON.stringify({
            email : email,
            password:password,
            name:name,
        })
        })
        .then(response => {
            console.log(response.status);
            response.json()
            if (response.status == 200 ){
                // alert("data OK")
                navigationback.reset({
                    index:0,
                    routes:[{name:"LoginScreen"}]
                  })
            }else{
                alert("Please enter unique data")
            }
        })
        .then(data => {
         console.log(data);
         setPassword(null);
        }   )
                .catch(error => {
                console.error(error);
                });
     }
     }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={()=>{
        console.log(name,email,password);
        handleRegister();}}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Button
      title='Go Back'
      onPress={()=>{
        navigationback.reset({
            index:0,
            routes:[{name:"LoginScreen"}]
          })
      }}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    width: '80%',
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Register;