import React, { Component } from "react";
import Expo from "expo";
//import { View } from "react-native";
import {
  Container,
  Item,
  Input,
  Header,
  Body,
  Content,
  Title,
  Button,
  Text
} from "native-base";
//import { Field, reduxForm } from "redux-form";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../../../common/form/DateInput";
import TextInput from "../../../../common/form/TextInput";
import moment from "moment";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../../../../../src/actions/event";
import PropTypes from "prop-types";
import cuid from "cuid";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";



const DATETIME_FORMAT = "YY-MM-DD HH:mm";

const mapState = (state, ownProps) => {
  const eventId = null;//ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const validate = combineValidators({
  title: isRequired({ message: " The event title is required" }),
 /*  category: isRequired({ message: " TheCategory is required" }),
  description: composeValidators(
    isRequired({ message: " Please enter description" }),
    hasLengthGreaterThan(4)({
      message: " Description need to be at least 6 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date") */
});


class EventForm extends Component {
state = {
  isReady:false
}

  handleChange = (name, val) => {
    console.log("handle changed: ", val);

    this.setState({
      [name]: val
    });

    console.log("handle state: ", this.state);
  };

  

  onFormSubmit = () => {
    console.log('values',this.state);
    const newEvent = {
      
      id: cuid(),
      title:this.state.title,
    //  hostPhotoURL: "/assets/user.png",
      hostedBy: "Bob"
    };
    console.log('call to create event with new obj: ', newEvent);
    
      this.props.createEvent(newEvent);
    
    }
  

  /*   handleAddEvent = () => {
    console.log("handel event: ", this.state.event);

    const eventData = {
      title: this.state.title,
      startDatetime: this.state.startDatetime
    };
    console.log("eventData: ", eventData);

    this.props.onAddEvent(eventData);
  }; */

  render() {
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
          <Field
            name="title"
            onChange={v => this.handleChange("title", v)}
            component={TextInput}
            placeholder="Title"
          />
          <Field
            name="startDatetime"
        //    value={this.state.startDatetime}
            component={DateInput}
            // selectedDatetime={selectedDatetime => this.handleChange('startDatetime',selectedDatetime)}
        //    handleChange={v => this.handleChange("startDatetime", v)}
            placeholder="Start Date"
            dateFormat={DATETIME_FORMAT}
          />
          <Button
            style={{ margin: 10 }}
            block
            primary
            onPress={this.props.handleSubmit(this.onFormSubmit)}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }
}

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  )
);

/* export default reduxForm({
  form: "eventForm",
  enableReinitialize: true,
  validate
})(
  connect(
    mapState,
    actions
  )(EventForm)
);
 */