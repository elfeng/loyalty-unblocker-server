import React from 'react';
import { connect } from 'react-redux';
import { Help } from './svg';

const helpUrl = 'https://www.mycruisedesk.com/administration/zendesk.aspx?return_to=https://help.mycruisedesk.com/hc/en-us/';

const _Footer = ({currentYear}) =>
    <footer class="row wide bg-medium-blue">
        <div class="small-12 columns">
            <ul class="inline-list-left clearfix sm-margin-top">
                <li>&copy; 2003 - {currentYear}, CruiseAgentTools</li>
                <li><a href="/" class="link-underline">Terms &amp; Conditions</a></li>
                <li><a href="/" class="link-underline">Privacy Statement</a></li>
                <li>
                    <a href={helpUrl} class="link-icon">
                        <Help /> Get Help
                    </a>
                </li>
            </ul>
        </div>
    </footer>

export const Footer = connect(s => ({
    currentYear: (s.lookup || {}).currentYear
}))(_Footer);