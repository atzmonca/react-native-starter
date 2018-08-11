import React, { Component } from "react";
import EventListTest from "../../../native/components/event/eventsList/EventListTest";
import { fetchEvents } from "../../../../src/actions/event";
import { connect } from "react-redux";
import {Container,Content,Card,CardItem,Body,Text,Button} from "native-base";

const eventsDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    startDate: "2018-08-27T11:00:00+00:00",
    endDate: "2018-08-27T12:00:00+00:00",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28T14:00:00+00:00",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

const mapState = state => ({
  events: state.events,
  selectedEvent: null
});

class EventListPageTest extends Component {
  
  handleEditEvent = eventToUpdate => () => {
    this.setState({
      selectedEvent: eventToUpdate
    });
  };

  render() {
    return (
      <Container>
        <Text>yesss</Text>
        <EventListTest 
          onEventEdit={this.handleEditEvent}
          events={this.props.events}
        />
      </Container>
    );
  }
}

export default connect(mapState)(EventListPageTest);
