import React, { Component } from "react";
import { View ,TextInput,TouchableOpacity } from "react-native";
import { DatePicker, Text, Label, Container, Item, Input } from "native-base";
//import { reduxForm, Field } from "redux-form";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
//import TextInput from "./TextInput";
import { Field } from "redux-form";
//import { reduxForm, Field } from "redux-form";

class DateInput extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDatetime: this.props.selectedDatetime
  };

  _onPressButton=()=>{
    console.log('_onPressButton');
    
  }
  render() {
    const {
      input,
      width,
      placeholder,
      dateFormat,
      meta: { touched, error },
      ...rest
    } = this.props;

    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }

    return (
      <View>
        <Item style={{ margin: 10 }} error={hasError}>
      
        <Input 
            {...input}
            placeholder={placeholder}
            onFocus={this._showDateTimePicker}
            format={dateFormat}
            value={this.state.selectedDatetime}
            onBlur={this._hideDateTimePicker}
        
          />
        
          {hasError ? <Text>{error}</Text> : <Text />}
        </Item>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          onHideAfterConfirm={() => {}}
          mode="datetime"
        />
      </View>
    );
  }

  /* DATE TIME handle methods */
  _showDateTimePicker = () => {
    // console.log("start show date picker");

    this.setState({ isDateTimePickerVisible: true });
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    // console.log("A date has been picked: ", date);
    var dateWrapper = moment(date).format("YYYY-MM-DD HH:mm");
    console.log("formated date: ", dateWrapper);

    this.setState({
      selectedDatetime: dateWrapper
    });

    this.props.onDatePicked(dateWrapper);
    this._hideDateTimePicker();
  };

  /* END DATE TIME METHODS */
}
export default DateInput;
