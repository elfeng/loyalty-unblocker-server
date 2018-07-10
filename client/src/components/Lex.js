import React, { Component } from 'react'
import { tap } from './utils';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Page, Header, Menu, Side, Content, Main, BackToTop, Button, Panel, DoubleSelect } from './cdesk';
import { TextBox, Select } from './form';
import { setStep, setDeep, getTodos, getLookup, getRates } from 'actions';

class Lex extends Component {
  componentWillMount() {
  }

  render() {
    return (
        <div>
            <div id="conversation" style="width: 400px; height: 400px; border: 1px solid #ccc; background-color: #eee; padding: 4px; overflow: scroll"></div>
            <form id="chatform" style="margin-top: 10px" onsubmit="return pushChat();">
                <input type="text" id="wisdom" size="80" value="" placeholder="I need a hotel room"/>
            </form>
        </div>
    );
  }
}

export default App
