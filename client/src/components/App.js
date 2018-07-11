import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Page, Header, Menu, Side, Content, Main, BackToTop, Button, Panel, DoubleSelect } from 'cdesk';
import { TextBox, Select } from 'form';
import Lex from './Lex';
import Booking from './Booking';
import Product from './Product';
import { setupAWS, initContract } from 'utils/setup';
import { set } from 'utils/action';
import { setEther } from 'actions';
import { tap } from 'utils';
import Products from './Products';

class App extends Component {
  componentWillMount() {
    setupAWS();
    initContract().then(r => {
        window.loyalty = r;
        r.instance.get({ from: r.account })
            .then(x => x.c[0] || r.instance.addFund({ from: r.account, value:r.web3.toWei("2", "ether") }).then(y => 2));
        r.web3.eth.getBalance(r.account, (e, x) => {
            const c = r.web3.fromWei(x);
            this.props.setEther(+(c.c[0] + '.' + c.c[1].toString().slice(0, 2)));
        });
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
                </Panel>
            </Side>

            <Main>
                <Lex/>
                <Product/>
                <Booking/>
            </Main>

        </Content>

        <BackToTop />
    </Page>
    );
  }
}

export default connect(null, { setLoyalty: set('loyalty'), setEther })(App)
