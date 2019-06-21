
import axios from 'axios';
import constants from './constants';
import { EVENT_ERROR , EVENT_SUCCESS } from '../store/actions/actionTypes';

const eventTrack = ( event , dispatch ) => (
    axios
        .post( constants.devEventTrackingURL , event )
        .then( res =>  {
            if ( res.status !== 502 ) {
                dispatch({ type: EVENT_ERROR });
                console.log( 'Event Error .then' )
            } else {
                dispatch({ type: EVENT_SUCCESS });
                console.log( 'Event Success' )
            }
        })
        .catch( err => {
            dispatch({ type: EVENT_ERROR })
            console.log( 'Event Error .catch' )
        })
)

module.exports = eventTrack;