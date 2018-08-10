import React, { Component } from "react";
import Expo from "expo";
//import { View } from "react-native";
import {Container,Item,Input,Header,Body,Content, Title,Button,  Text} from "native-base";
//import { Field, reduxForm } from "redux-form";
import { Field, reduxForm } from 'redux-form/immutable'
import DateInput from "../../../../common/form/DateInput";
import TextInput from "../../../../common/form/TextInput";
import moment from "moment";
import { connect } from "react-redux";
import { addEvent } from '../../../../../src/actions/event';

const DATETIME_FORMAT = "YYYY-MM-DD HH:mm";


const submit = values => {
  console.log('submitting form', values.toJS())
} 

const validate = values => {
  const error = {};
  error.email = "";
  error.name = "";
  var ema = values.email;
  var nm = values.name;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.name === undefined) {
    nm = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }

  if (nm.length > 8) {
    error.name = "max 8 characters";
  }
  return error;
};
class SimpleForm extends Component {
  state = {
    title:'',
    startDate: moment().format('YYYY-MM-DD HH:mm'),
    event:{},
    isReady:false,
   // viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
  };
  constructor(props) {
 
    super(props);
  //  this.renderInput = this.renderInput.bind(this);
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  handleChange = (name, val) => {
    console.log('handle changed: ', name);
    
    this.setState({
      [name]: val,
    });
  }

  addEvent = () => {
    const newEvent = {
      title:this.state.title
    }
    console.log('new event: ', newEvent);
    
  //  this.props.addEvent(newEvent);
 //   this.props.addEvent(event);
 //console.log('add event ', values);
 
  }
  render() {
    const { handleSubmit, reset } = this.props;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container style={{ backgroundColor: "#eafcf9" }}>
        <Header>
          <Body>
            <Title>Event Form</Title>
          </Body>
        </Header>
        <Content padder>
          <Field name="title" onChange={v => this.handleChange('title', v)}  component={TextInput} placeholder="Title" />
          <Field
            name="name"
            value={this.state.event.startDate}
            component={DateInput}
            placeholder="Start Date"
            dateFormat={DATETIME_FORMAT}
          />
          <Button style={{ margin: 10 }} block primary onPress={this.addEvent} >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEvent: event => dispatch(addEvent(event))
  };
};

export default reduxForm({
  form: 'add_event_form',
  validate
})(connect(null, mapDispatchToProps)(SimpleForm))



