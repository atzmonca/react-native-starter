import React, { Component } from "react";
import EventList from "../../../native/components/event/eventsList/EventList";
import { fetchEvents } from "../../../../src/actions/event";
import { connect } from "react-redux";
import {Container,Content,Card,CardItem,Body,Text,Button} from "native-base";
import Calendar from '../../components/event/calendar/calendar'



const mapState = state => ({
  events: state.events,
  selectedEvent: null,
  selectedDate: new Date()
});



class EventListPage extends Component {
  
  handleEditEvent = eventToUpdate => () => {
    this.setState({
      selectedEvent: eventToUpdate
    });
  };

  handleDayPress11111= (day) => () => {
    console.log("start handle day press for: ");
  }; 

  
  handleDayPress= (day) => {
    console.log("start handle day press for: ",day);
  }; 

  render() {
    return (
      <Container>
        <Calendar events={this.props.events} OnDayPress={this.handleDayPress}/>
        <EventList 
          onEventEdit={this.handleEditEvent}
          events={this.props.events}
        />
      </Container>
    );
  }
}

export default connect(mapState)(EventListPage);
