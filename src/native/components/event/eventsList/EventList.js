import React, { Component } from 'react'
import {
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Image
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
  import { Actions } from "react-native-router-flux";
  import Loading from "../../Loading";
  import Error from "../../Error";
  import Header from "../../Header";
  import Spacer from "../../Spacer";

 class EventList extends Component {

  render() {
    const {events,onEventEdit} = this.props;
    return (
        <Container>
        <Content padder>
          <Header
            title="My Events"
            content="more content"
          />
  
          <FlatList
            numColumns={1}
            data={events}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: "800" }}>{item.title}</Text>
                    <Text style={{ fontWeight: "800" }}>{item.startDate}</Text>
                    <Text style={{ fontWeight: "800" }}>{item.endDate}</Text>
                    <Spacer size={15} />
                    <Button block bordered small onPress={onEventEdit(item)}>
                      <Text>View</Text>
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

export default EventList;