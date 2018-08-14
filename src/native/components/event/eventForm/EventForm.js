import React, { Component } from "react";
import Expo from "expo";
import { View, Modal, TouchableHighlight } from "react-native";
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

import GooglePlacesInput from "../googlePlaces/PlacesAutoCompleteTest";

//import GoogleMapComponent from '../googlePlaces/GoogleMapComponent'

const DATETIME_FORMAT = "YY-MM-DD HH:mm";

const mapState = state => ({
  selectedDate: null
});
// to do only once
/* const mapState = (state, ownProps) => {
  const eventId = null; //ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    initialValues: event
  };
};
 */
const actions = {
  createEvent,
  updateEvent
};

const validate = combineValidators({
  title: isRequired({ message: " The event title is required" })
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
    isReady: false,
    modalVisible: false
    // selectedDatetime:moment().format('YYYY-MM-DD')
  };

  constructor(props) {
    super(props);
 
  }

  handleChange = (name, val) => {
    console.log("handle changed: ", val);
    console.log("handle changed name: ", name);
    this.setState({
      [name]: val
    });
    console.log("handle state: ", this.state);
  };

  onFormSubmit = () => {
    console.log("values", this.state);
    const newEvent = {
      id: cuid(),
      title: this.state.title,
      //  hostPhotoURL: "/assets/user.png",
      hostedBy: "Bob"
    };
    console.log("call to create event with new obj: ", newEvent);
    this.props.createEvent(newEvent);
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    var today = moment().format("YYYY-MM-DD HH:mm");
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

{/*           <Field
            name="place"
            //   onChange={v => this.handleChange("title", v)}
            component={GooglePlacesInput}
            placeholder="place"
          /> */}
          <Field
            name="startDate"
            selectedDatetime={today}
            component={DateInput}
            onDatePicked={v => this.handleChange("startDate", v)}
            placeholder="Start Date"
            dateFormat={DATETIME_FORMAT}
          />

          <Field
            name="endDate"
            selectedDatetime={today}
            component={DateInput}
            onDatePicked={v => this.handleChange("endDate", v)}
            placeholder="End Date"
            dateFormat={DATETIME_FORMAT}
          />

           <Field
            name="location"
            component={GooglePlacesInput}
       
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
    this.setState({ isReady: true,
    });
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
