import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from "react-native-geocoding";
//import Geocoder  from 'react-native-geocoder';

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};
Geocoder.init("AIzaSyCX7_mbw1PnmHSPLa144Q4IoTrgr_GSyFw"); // use a valid API key

class GooglePlacesInput extends Component {
  state = {
    location: {
      lat: 33,
      lng: 34,
      formatted_address: "dd"
    }
  };
  constructor(props) {
    super(props);

    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("current position", position);

        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            error: null
          }
        });

        var NY = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("NY position:", NY);
        Geocoder.from(NY)
          .then(json => {
              console.log('formatted address',  json.results[0].formatted_address);
              
            var addressComponent =json.results[0].formatted_address;// json.results[0].address_components[0];
            this.setState({
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  formatted_address:addressComponent,
                  error: null
                }
              });
           // console.log(addressComponent);
          })
          .catch(error => console.warn(error));
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    return (
      
        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data);
          console.log(details);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCX7_mbw1PnmHSPLa144Q4IoTrgr_GSyFw',
          language: 'en', // language of the results
          types: '(cities)', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}
        
        
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        
        predefinedPlaces={[homePlace, workPlace]}
        
        predefinedPlacesAlwaysVisible={true}
      />
    );
  }
}

export default GooglePlacesInput;
