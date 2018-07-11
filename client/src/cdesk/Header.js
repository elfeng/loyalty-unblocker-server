import React from 'react';
import logo from '../images/logo.svg';
import {connect} from "react-redux";
import { set } from 'utils/action';

export const Header = ({ether}) =>
    <header class="row show-for-medium-up wide bg-white eq-height-col">
        <div class="medium-4 columns vert-align-center sm-padding-top sm-padding-bottom">
            <a href="/" class="block" alt="home" title="Home">
                <img src={logo} class="logo-CAT" alt="" />
            </a>
        </div>
        <div className="medium-4 columns vert-align-center sm-padding-top sm-padding-bottom">
            # of tokens: {ether}
        </div>
    </header>

export default connect(s => ({ ether: s.ether }), { setEther: set('ether') })(Header);
