

import { TextInput, View } from 'react-native';
import React from 'react';


const MyTextInput = ({input,width,type,placeholder, meta:{touched,error}}) => {
  return (
    <View>
    <TextInput
     // {...inputProps}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}


      error={touched && !!error} width={width} 
      {...input}
       placeholder={placeholder}
        type={type}
      />
  </View>

/*     <Form.Field error={touched && !!error} width={width} >
        <input {...input} placeholder={placeholder} type={type} />
        {touched && error && <Label basic color='red'> {error}</Label>}
    </Form.Field> */
    
  )
}
export default MyTextInput