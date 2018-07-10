import React from 'react';
import logo from '../images/logo-CAT.png';

export const Header = () =>
    <header class="row show-for-medium-up wide bg-white eq-height-col">
        <div class="medium-4 columns vert-align-center sm-padding-top sm-padding-bottom">
            <a href="/" class="block" alt="home" title="Home">
                <img src={logo} class="logo-CAT" alt="" />
            </a>
        </div>
    </header>
