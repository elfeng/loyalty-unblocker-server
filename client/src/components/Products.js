import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'cdesk';

const Products = ({products}) =>
    <div>
        <br/>
        <div>Destination: {products.Destination}</div>
        <div>Cruise Line: {products.CruiseLine}</div>
        <div>Sailing Code: {products.SailingCode}</div>
        <br/>
    </div>;

export default connect(s => ({ products: (s.products || {}) }), {})(Products);
