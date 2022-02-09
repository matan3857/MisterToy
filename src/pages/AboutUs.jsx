import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class _AboutUs extends Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        isInfoWindowOn: false
    }

    onMapClicked = (props, map, ev) => {
        console.log('props', props);
        console.log('map', map);
        console.log('ev', ev);
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onSelectStore = (lat, lng) => {
        this.setState({ center: { lat, lng } })

    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }
    // markers = [
    //     {
    //         position: {
    //             lat: 31.25181,
    //             lng: 34.7913
    //         },
    //         name: 'Be\'er Sheva'
    //     },
    //     {
    //         position: {
    //             lat: 32.794044,
    //             lng: 34.989571
    //         },
    //         name: 'Haifa'
    //     }
    // ]


    render() {
        const style = {
            width: '100%',
            height: '50vh',
            position: 'relative',
            margin: '20px'
        }


        return (
            <div className="about-us-container">
                <div className="map-container">
                    <Map
                        google={this.props.google}
                        zoom={10}
                        initialCenter={this.state.center}
                        onClick={this.onMapClicked}
                        center={this.state.center}
                        containerStyle={style}
                    >

                        {/* {this.state.markers.map(marker => (
                    <Marker
                        {...marker}
                        onClick={this.onMarkerClicked}
                    />
                ))} */}

                        <Marker
                            position={this.state.center}
                            name={'Current location'}
                            onClick={this.onMarkerClicked}
                        />

                        <Marker
                            position={{
                                lat: 31.25181,
                                lng: 34.7913
                            }}
                            name={'Be\'er Sheva'}
                            onClick={this.onMarkerClicked}
                        />
                        <Marker
                            position={{
                                lat: 32.794044,
                                lng: 34.989571
                            }}
                            name={'Haifa'}
                            onClick={this.onMarkerClicked}
                        />

                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={this.state.center}
                            visible={this.state.isInfoWindowOn}
                        >
                            <div>
                                <h1>Hello</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                <div className="store-info-btns">
                    <h2>Our Stores:</h2>


                    <button onClick={() => { this.onSelectStore(31.25181, 34.7913) }}>Beer Sheva</button>
                    <button onClick={() => { this.onSelectStore(32.794044, 34.989571) }}>Haifa</button>
                    <button onClick={() => { this.onSelectStore(32.109333, 34.855499) }}>Tel Aviv</button>
                </div>
            </div>
        );
    }
}

export const AboutUs = GoogleApiWrapper({
    // apiKey: ('AIzaSyBJt1HJ2UX7AlXY9pgE_f3VQena2BBVFVg')
    apiKey: ('')
})(_AboutUs)
