import React, { Component } from "react";
import { View } from "react-native";
import { DatePicker, Text, Label, Container,Item ,Input} from "native-base";
import { reduxForm, Field } from "redux-form";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import TextInput from "./TextInput";
//import { reduxForm, Field } from "redux-form";

class DateInput extends Component {
  
  render() {

  
    const {
      input,
      _showDateTimePicker,
      width,
      placeholder,
      dateFormat,
      meta: { touched, error },
      ...rest
    } = this.props;

    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }

    return (
      <View>
        <Item style={{ margin: 10 }} error={hasError}>
          <Input {...input} placeholder={placeholder} onFocus={this._showDateTimePicker} format={dateFormat} value={this.state.selectedDateTime} onBlur={this._hideDateTimePicker}/>
          {hasError ? <Text>{error}</Text> : <Text />}
        </Item>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />
      </View>
    );
  }

  state = {
    isDateTimePickerVisible: false,
    selectedDateTime:moment().format('YYY-MM-DD HH:mm')
  };

  /* DATE TIME handle methods */
  _showDateTimePicker = () => {
    console.log("start show date picker");

    this.setState({ isDateTimePickerVisible: true });
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    var dateWrapper = moment(date).format('YYY-MM-DD HH:mm');
    console.log("formated date: ", dateWrapper);
    this.setState({
      selectedDateTime:  dateWrapper
    });
    this._hideDateTimePicker();
  };

  /* END DATE TIME METHODS */
}
export default DateInput;
