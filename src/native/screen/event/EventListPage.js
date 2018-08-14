import React, { Component } from "react";
import {  Item ,Input} from "native-base";
import EventList from "../../../native/components/event/eventsList/EventList";
import { fetchEvents } from "../../../../src/actions/event";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button
} from "native-base";
import Calendar from "../../components/event/calendar/calendar";

const mapState = state => ({
  events: state.events,
  selectedEvent: null,
  selectedDate: new Date()
});

class EventListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  handleEditEvent = eventToUpdate => () => {
    this.setState({
      selectedEvent: eventToUpdate
    });
  };

  handleDayPress = day => {
    console.log("start handle day press for: ", day);
    this.setState({
      selectedDate: day.dateString
    });
    //get all events for selected date
  };

  render() {
    console.log("render. this.state: ", this.state);

    return (
      <Container>
        <Calendar
          events={this.props.events}
          OnDayPress={this.handleDayPress}
          SelectedDate={this.state.selectedDate}
        />
        <EventList
          onEventEdit={this.handleEditEvent}
          events={this.props.events}
        />
      </Container>
    );
  }
}

export default connect(mapState)(EventListPage);
