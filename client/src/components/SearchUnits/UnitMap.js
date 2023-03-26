import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';

class UnitMap extends Component {
    render() {
        const containerStyle = {
            maxWidth: '45%',
            height: '75%'
        }

        return (
            <Map
                google={this.props.google}
                zoom={15}
                containerStyle={containerStyle}
                initialCenter={
                    {
                        lat: 43.46923379997185, 
                        lng: -80.5406966618935
                    }
                }
            >
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCUZoKvxElNlsP3373iAb5HCmeBv_JKxig'
})(UnitMap);