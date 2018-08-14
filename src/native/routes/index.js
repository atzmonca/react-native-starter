import React from 'react';
//import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import LocaleContainer from '../../containers/Locale';
import LocaleComponent from '../components/Locale';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';
import CalendarComponent from '../components/event/calendar/calendar';
//import CalendarAgenda from '../components/event/calendar/CalendarAgenda';
import EventForm from '../components/event/eventForm/EventForm';
import EventsListPage from '../screen/event/EventListPage';
import { Container, Header, Content, Tab, Tabs } from 'native-base';


const Index = (
  <Container>
  <Header hasTabs />
  <Tabs>
    <Tab heading="Create Event">
      <EventForm />
    </Tab>
    <Tab heading="My Events">
      <EventsListPage />
    </Tab>
  
  </Tabs>
</Container>
);

export default Index;
