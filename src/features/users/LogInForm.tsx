import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {LogInProps} from '../../App';

const LogInForm = ({navigation}: LogInProps) => {
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
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title="LogIn" />
        <Button title="SinUp" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

export default LogInForm;
