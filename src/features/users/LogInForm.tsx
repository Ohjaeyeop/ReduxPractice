import React, {useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {LogInProps} from '../../App';
import auth from '@react-native-firebase/auth';

const LogInForm = ({navigation}: LogInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('PostsList');
      })
      .catch(error => {
        Alert.alert(error.code);
      });
  };

  return (
    <View style={{padding: 15}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
        LogIn
      </Text>
      <Text style={{fontSize: 15, marginBottom: 10}}>Email:</Text>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          marginBottom: 15,
          borderRadius: 5,
          borderColor: 'gray',
          padding: 5,
        }}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={setEmail}
      />
      <Text style={{fontSize: 15, marginBottom: 10}}>Password:</Text>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'gray',
          padding: 5,
          marginBottom: 15,
        }}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title="LogIn" onPress={logIn} />
        <Button title="SinUp" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

export default LogInForm;
