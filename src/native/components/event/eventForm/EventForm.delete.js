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
import  addEvent  from '../../../../../src/actions/event';
import PropTypes from 'prop-types';

const DATETIME_FORMAT = "YYYY-MM-DD HH:mm";




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

  static propTypes = {
    addEvent: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    console.log(props);
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
      event:{
        [name]: val,
      }
     
    });
  }

  handleAddEvent = () => {
    let event = {
      title:this.state.title
    }
    console.log('new state: ', this.state);
    const { addEvent } = this.props;
  addEvent(this.state)
  .catch(e => console.log(`Error: ${e}`));
 //   this.props.addEvent(event);
 //console.log('add event ', values);
 
  }
  render() {
    //const { handleSubmit, reset } = this.props;
    const { state, actions } = this.props;

    this.propTypes = {
      onClick: PropTypes.func.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }



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
          <Button style={{ margin: 10 }} block primary onPress={this.handleAddEvent} >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    event: event => dispatch(addEvent(event))
  };
};

export default reduxForm({
  form: 'add_event_form',
  validate
})(connect(null, mapDispatchToProps)(SimpleForm))



