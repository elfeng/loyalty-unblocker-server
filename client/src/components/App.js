import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Page, Header, Menu, Side, Content, Main, BackToTop, Button, Panel, DoubleSelect } from 'cdesk';
import { TextBox, Select } from 'form';
import { setStep, setDeep, getTodos, getLookup, getRates } from 'actions';
import Lex from './Lex';
import Booking from './Booking';
import { setupAWS, initContract } from 'utils/setup';
import { set } from 'utils/action';
import { tap } from 'utils';

class App extends Component {
  componentWillMount() {
    setupAWS();
    initContract().then(r => {
        set('web3')('abc');
        // set('loyalty')(r[1]);
        // set('account')(r[2]);
    });
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
                    <Button onClick={() => getTodos()}>Todos</Button>
                </Panel>
            </Side>

            <Main>
                <Booking/>
                <Lex/>
            </Main>

        </Content>

        <BackToTop />
    </Page>
    );
  }
}

export default connect(null, { set })(App)
