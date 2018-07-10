import React from 'react';
import { connect } from 'react-redux';
import { book } from 'actions';
import { Button } from 'cdesk';

const Booking = ({status, book}) =>
    <div>
        Status: <div>{status}</div>
        <Button onClick={() => book({ firstName: 'a', lastName: 'b', tripId: '1234' })}>Book</Button>
    </div>

export default connect(s => ({ status: (s.bookings || {}).status }), { book })(Booking);
