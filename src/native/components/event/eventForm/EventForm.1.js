/* global google */
import React, { Component } from "react";
//import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
//import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import TextInput from "../../../../common/form/TextInput";
import { reduxForm, Field } from "redux-form";
import TextArea from "../../../../common/form/TextArea";
import SelectInput from '../../../../common/form/SelectInput';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import DateInput from "../../../../common/form/DateInput";
import moment from "moment";
import PlaceInput from "../../../../common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Script from "react-load-script";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return { initialValues: event };
};
const actions = {
  createEvent,
  updateEvent
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: " The event title is required" }),
  category: isRequired({ message: " TheCategory is required" }),
  description: composeValidators(
    isRequired({ message: " Please enter description" }),
    hasLengthGreaterThan(4)({
      message: " Description need to be at least 6 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleCitySelect = selctedCity => {
    console.log("selected city: ", selctedCity);

    geocodeByAddress(selctedCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          cityLatLng: latLng
        });
      })
      .then(() => {
        this.props.change("city", selctedCity);
      });
  };

  handleVenueSelect = selctedVenue => {
    console.log("selected venue: ", selctedVenue);

    geocodeByAddress(selctedVenue)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          venueLatLng: latLng
        });
      })
      .then(() => {
        this.props.change("venue", selctedVenue);
      });
  } ;

  onFormSubmit = values => {
    console.log("values: ", values);
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBqywI9t9B1zntTVfaUoX3LAyevgywtzE&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Event Title"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                placeholder="What is your event about"
                multiple={false}
                options={category}
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="little more information"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={this.handleCitySelect}
                placeholder="which city?"
              />
              {this.state.scriptLoaded && (
                <Field
                onSelect={this.handleVenueSelect}
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000, //meters
                    types: ["establishment"]
                  }}
                  placeholder="venue"
                />
              )}

              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="choose a date"
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
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
