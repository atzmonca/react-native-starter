import React, { Component } from "react";
import { Container, Content, Text } from "native-base";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { View } from "react-native";
import moment from "moment";
//import Spacer from "../Spacer";

let today = new Date();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  state={};

//
class CalenderComponent extends Component {

componentDidMount(prevProps,prevState){
  
    this.handleMarkEvents();
  
}

  handleMarkEvents = () => {
    this.state.events.map(event => {
   
      markedArray = {};
      this.state.events.map(event => {
        console.log("event startDate", event.startDate);
     //   console.log("moment time format", moment(event.startDate).format("YYYY-MM-DD"));

        var prop_name = moment(event.startDate).format("YYYY-MM-DD");
        Object.defineProperty(markedArray, prop_name, {
          writable: true,
          configurable:true,
          enumerable:true,
          value:{ marked: true, dotColor: "red", activeOpacity: 0 }
        });
     
      });
    //  console.log("markedArray", markedArray);


      this.setState({ markedDates: markedArray }, () => {
        console.log(this.state.markedDates);
      });
     
    });
    //console.log("this.state.markedDates", this.state.markedDates);
  };

  constructor(props) {
    super(props);
    this.state = {
      events: props.events,
      selectedDate: new Date(),
      markedDates: {
     /*    "2018-08-16": { selected: true, marked: true, selectedColor: "blue" },
        "2018-08-17": { marked: true },
        "2018-08-18": { marked: true, dotColor: "red", activeOpacity: 0 },
        "2018-08-19": { disabled: true, disableTouchEvent: true } */
      }
    };
  //  this.handleMarkEvents();
  }

  render() {
    const { events, OnDayPress } = this.props;

    return (
      <Container>
        <Content>
          <Calendar
            markedDates={this.state.markedDates}
            // Initially visible month. Default = Date()
            current={"2018-08-12"}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={"2012-05-10"}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={"2042-05-30"}
            // Handler which gets executed on day press. Default = undefined
            /*       onDayPress={day => {
              console.log("selected day", day);
            }}  */
            onDayPress={day => {
              this.props.OnDayPress(day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log("selected day", day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"yyyy MM"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            //renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={true}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
          />
        </Content>
      </Container>
    );
  }
}
export default CalenderComponent;
