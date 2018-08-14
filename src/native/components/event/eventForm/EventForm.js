import React, { Component } from "react";
import Expo from "expo";
import {
  View,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DATETIME_FORMAT = "YY-MM-DD HH:mm";

const mapState = state => ({
  selectedDate: null
});

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
    modalVisible: false,
    title: "",
    startDate: "",
    endDate: "",
    location: {
      lat: null,
      lng: null,
      formatted_address: ""
    }
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

  handleLocationSelect = details => {
    // console.log('inside handleLocationSelect', data.description);
    console.log("details:", details.formatted_address);
    console.log("location:", details.geometry.location);
    this.setState({
      location: {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
        formatted_address: details.formatted_address
      }
    });
  };
  handleLocationPress = () => {
    console.log("handleLocationPress fire");
  };
  onFormSubmit = () => {
    console.log("values", this.state);
    const newEvent = {
      id: cuid(),
      title: this.state.title,
      location: this.state.location,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      //  hostPhotoURL: "/assets/user.png",
      hostedBy: "Bob"
    };
    console.log("call to create event with new obj: ", newEvent);
    this.props.createEvent(newEvent);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    var today = moment().format("YYYY-MM-DD HH:mm");
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#4c69a5" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={styles.container}
        scrollEnabled={true}
        style={{ backgroundColor: "#eafcf9" }}
      >
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
            name="location"
            component={GooglePlacesInput}
            OnLocationSelect={this.handleLocationSelect}
           
          /> 
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


          <Button
            style={{ margin: 10 }}
            block
            Success
            onPress={this.props.handleSubmit(this.onFormSubmit)}
          >
            <Text>Create Event</Text>
          </Button>
        </Content>
{/*         <Content>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <GooglePlacesInput
                  name="location"
                  onLocationPress={this.handleLocationPress}
                  OnLocationSelect={this.handleLocationSelect}
                />

                 <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight> 
              </View>
            </View>
          </Modal>
        </Content> */}
      </KeyboardAwareScrollView>
    );
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({
      isReady: true
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
