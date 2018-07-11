import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Page, Header, Menu, Side, Content, Main, BackToTop, Button, Panel, DoubleSelect } from 'cdesk';
import { TextBox, Select } from 'form';
import Lex from './Lex';
import Booking from './Booking';
import { setupAWS, initContract } from 'utils/setup';
import { set } from 'utils/action';
import { tap } from 'utils';
import Products from './Products';

class App extends Component {
  componentWillMount() {
    setupAWS();
    initContract().then(r => window.loyalty = r);
  }

  render() {
    return (
    <Page>
        <Header />
        <Menu />
        <Content>
            <Side>
                <Panel title="Booking Summary">
                    <TextBox name="bs.tb1" />
                </Panel>
            </Side>

            <Main>
                <Booking/>
                <Lex/>
                <Products/>
            </Main>

        </Content>

        <BackToTop />
    </Page>
    );
  }
}

export default connect(null, { setLoyalty: set('loyalty') })(App)
