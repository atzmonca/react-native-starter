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
import { Field, reduxForm } from "redux-form/immutable";
import DateInput from "../../../../common/form/DateInput";
import TextInput from "../../../../common/form/TextInput";
import moment from "moment";
import { connect } from "react-redux";
import { addEvent } from "../../../../../src/actions/event";
import PropTypes from "prop-types";

const DATETIME_FORMAT = "YY-MM-DD HH:mm";
let id_counter = 2;

class EventFormTest extends Component {
  state = {
    event: {}
  };
  handleChange = (name, val) => {
    console.log("handle changed: ", val);

    this.setState({
      [name]: val
    });

    console.log("handle state: ", this.state);
  };

  handleAddEvent = () => {
    console.log("handel event: ", this.state.event);

    const eventData = {
      title: this.state.title,
      startDatetime: this.state.startDatetime
    };
    console.log("eventData: ", eventData);

    this.props.onAddEvent(eventData);
  };

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
            value={this.state.startDatetime}
            component={DateInput}
            // selectedDatetime={selectedDatetime => this.handleChange('startDatetime',selectedDatetime)}
            handleChange={v => this.handleChange("startDatetime", v)}
            placeholder="Start Date"
            dateFormat={DATETIME_FORMAT}
          />
          <Button
            style={{ margin: 10 }}
            block
            primary
            onPress={this.handleAddEvent}
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

const mapDispatchToProps = dispatch => {
  return {
    onAddEvent: eventData => dispatch(addEvent(eventData))
  };
};

export default reduxForm({
  form: "add_event_form"
  //validate
})(
  connect(
    null,
    mapDispatchToProps
  )(EventFormTest)
);
