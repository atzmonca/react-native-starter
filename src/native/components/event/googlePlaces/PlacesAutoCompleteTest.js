import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'


const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class PlacesAutoCompleteTest extends Component {
  render() {
    return (
        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

      //    console.log(data);
        //  console.log(details);
          this.props.OnLocationSelect(details);
        }}
      /*   getDefaultValue={() => {
          return ''; // text input default value
        }} */
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCX7_mbw1PnmHSPLa144Q4IoTrgr_GSyFw',
          language: 'en', // language of the results
        //  types: '(cities)', // default: 'geocode'
        }}
        styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth:0
            },
            textInput: {
                backgroundColor: 'transparent',
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
        
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
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
        
     //   predefinedPlaces={[homePlace, workPlace]}
        
        predefinedPlacesAlwaysVisible={true}
      />
    )
  }
}
export default PlacesAutoCompleteTest