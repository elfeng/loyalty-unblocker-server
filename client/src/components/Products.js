import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from 'actions';
import { Button } from 'cdesk';

const Products = ({destination, cruiseLineCode, getProducts}) =>
    <div>
        <Button onClick={() => getProducts({ destination: 'Bahamas', cruiseLineCode: 'CV'})}>Get Products</Button>
        <br/>
        <div>Destination: {destination}</div>
        <div>Cruise line code: {cruiseLineCode}</div>
    </div>;

export default connect(s => ({ destination: (s.products || {}).destination, cruiseLineCode: (s.products || {}).cruiseLineCode }), { getProducts })(Products);