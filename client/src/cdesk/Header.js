import React from 'react';
import logo from '../images/logo.svg';
import {connect} from "react-redux";
import { set } from 'utils/action';
import { tap } from 'utils';

const _Header = ({ether, isRedeemPoints, products}) =>
    <header class="row show-for-medium-up wide bg-white eq-height-col">
        <div class="medium-4 columns vert-align-center sm-padding-top sm-padding-bottom">
            <a href="/" class="block" alt="home" title="Home">
                <img src={logo} class="logo-CAT" alt="" />
            </a>
        </div>
        <div className="medium-4 columns vert-align-center sm-padding-top sm-padding-bottom">
            # of tokens: {isRedeemPoints ? ether - products.Price / 100 : ether }
        </div>
    </header>

export const Header = connect(s => ({ ether: s.ether, isRedeemPoints: (s.form || {}).redeemPoints, products: (s.products || {}) }), { setEther: set('ether') })(_Header);
