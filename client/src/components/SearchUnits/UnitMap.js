import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';

class UnitMap extends Component {
    render() {
        const mapStyles = {
            width: '45%',
            height: '100%'
        }

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 43.4706047695797,
                        lng: -80.53849451032545
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