import React, { Component } from 'react'
import { EventsList } from '../../components/event/eventsList/EventsList'
import { eventsList } from "../../../../src/actions/event";
import Loading from "../../Loading";
import Error from "../../Error";
import Header from "../../Header";
import Spacer from "../../Spacer";
import {
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import {
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Button
  } from "native-base";
  import { connect } from 'react-redux';
  //import {  } from '../../../reducers/event'



  
  
  const mapStateToProps = state => {
    let storedEvents = state.events.map(event => ({ key: event.id, ...event }));
    return {
      events: storedEvents
    };
  };
  
  const mapDispatchToProps = {
    eventsList:  () => dispatch(eventsList())
  };



 class EventListPage extends Component {
    componentDidMount() {
      console.log('componentDidMount');
      
        this.props.eventsList();
      }
   

  render() { 
      console.log('render ev list page', this.props);
      const { state, actions } = this.props;
      const {events} = this.props;
    return (
        <Container>
        <Content padder>
          <Header
            title="Top Recipes"
            content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
          />
  
          <FlatList
            numColumns={2}
            data={events}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    style={{ flex: 1 }}
                  >
                    {
                      <Text>{item.title}</Text>
                    }
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: "800" }}>{item.title}</Text>
                    <Spacer size={15} />
                    <Button block bordered small onPress={() => onPress(item)}>
                      <Text>View Recipe</Text>
                    </Button>
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </Card>
            )}
           /*  keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={reFetch} />
            } */
          />
  
          <Spacer size={20} />
        </Content>
      </Container>

    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventListPage);
