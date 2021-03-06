import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
//import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

//import Routes from './routes/index';
import Loading from './components/Loading';
import EventsListPage  from './screen/event/EventListPage';
import  EventForm from './components/event/eventForm/EventForm';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import material from '../../native-base-theme/variables/material'

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);
//style={getTheme(theme)}
const App = ({ store, persistor }) => (
  <Root>
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <StyleProvider  style={getTheme(material)}>
        <Container>
        <Header hasTabs />
        <Tabs primary>
          <Tab heading="Create Event">
            <EventForm />
          </Tab>
          <Tab heading="My Events">
            <EventsListPage />
          </Tab>
        
        </Tabs>
      </Container>
        </StyleProvider>
      </PersistGate>
    </Provider>
  </Root>
);

/* App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
}; */

export default App;
