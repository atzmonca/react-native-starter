

import {  View } from 'react-native';
import {  Text,  Container,Item ,Input} from "native-base";
import React, { Component } from 'react'

 class TextInput extends Component {

  
  render() {
    const {
      input,
      width,
      placeholder,
      meta: { touched, error },
      ...rest
    } = this.props;
  
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }


    return (
    
      <Item style={{ margin: 10 }} error={hasError}>
        <Input placeholder={placeholder} onChangeText={input.onChange} />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>

     
    )
  }
}
export default TextInput
