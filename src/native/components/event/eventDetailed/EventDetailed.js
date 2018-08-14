import React, { Component } from 'react'

 class EventDetailed extends Component {
  render() {
      const {event} = this.props;
    return (
        <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>{event.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Close</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
export default EventDetailed