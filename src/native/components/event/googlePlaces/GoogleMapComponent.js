import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoder'; // 0.5.0


 class GoogleMapComponent extends Component {
    state = {
        mapRegion:  { latitude: 32.3, longitude: 34.0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        hasLocationPermissions: false,
        locationResult: null
      };
    
      componentDidMount() {
        this._getLocationAsync();
      }
    
      _handleMapRegionChange = mapRegion => {
        //console.log(mapRegion);
        this.setState({ mapRegion });
      };
    
      _getLocationAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
       if (status !== 'granted') {
         this.setState({
           locationResult: 'Permission to access location was denied',
         });
       } else {
         this.setState({ hasLocationPermissions: true });
       }
    console.log('start get location');
    
       let location = await Location.getCurrentPositionAsync({});
       console.log('after get loc: ' , location);
       
       this.setState({ locationResult: JSON.stringify(location) });
       
       // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
      };
    
      render() {
        
        /*console.log(JSON.stringify(this.state.mapRegion.latitude),"=====",JSON.stringify(this.state.mapRegion.longitude));*/
       
        let NY = {
          lat: JSON.stringify(this.state.mapRegion.latitude),
          lng: JSON.stringify(this.state.mapRegion.longitude),
        };
        /*console.log(NY);*/
        
        return (
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              Pan, zoom, and tap on the map!
            </Text>
            
            {
              this.state.locationResult === null ?
              <Text>Finding your current location...</Text> :
              this.state.hasLocationPermissions === false ?
                <Text>Location permissions are not granted.</Text> :
                this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                  style={{ alignSelf: 'stretch', height: 400 }}
                  region={this.state.mapRegion}
                  onRegionChange={this._handleMapRegionChange}
                >
                <MapView.Marker
                    draggable
                    coordinate={this.state.mapRegion}
                    title="My Marker"
                    description="Some description"
                  />
                </MapView>
            }
            
            <Text>
              Location: {JSON.stringify(this.state.mapRegion)}
            </Text>
          </View>
            
        );
      }
}
export default GoogleMapComponent

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });