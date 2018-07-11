import React from 'react';
import { connect } from 'react-redux';
import { book } from 'actions';
import { Button } from 'cdesk';
import { set } from 'utils/action';
import { tap } from 'utils';
import ship from '../images/ship.jpeg';

const Product = ({status, book, setEther, ether, products, isRedeemPoints}) => products ?
    <div data-flex-flip="smallTablet"
         class="cf flex-1up flex-listing flex-theme-light flex-collapse cols-nested sailing-cruise-card">
        <div class="col cruise-card-content">
            <div class="flex-card ">
                <div class="flex-figure">
                    <img src={ship}/>
                </div>
                <div class="flex-area-primary">
                    <div class="card-content">
                        <div class="ship-name">
                            Cruise line: {products.CruiseLine}
                        </div>
                        <div class="departing-on-text">
                            Departing on <span class="departing-on">{products.Date}</span> for {products.Nights} nights
                        </div>
                        <div>
                            Destination: {products.Destination}
                        </div>
                        <div>
                            Sailing code: {products.SailingCode}
                        </div>
                    </div>
                </div>

                <div class="flex-area-secondary">
                    <div class="sailing-pricing-container">
                        <div class="sailing-pricing-container-left">
                            <div id="ember1561" class="ember-view">
                                <div class="price">
    <span aria-hidden="true">
      from <br/><span class="card-price">${isRedeemPoints ? ((products.Price - ether * 100) < 0 ? 0 : products.Price - ether * 100 ) : products.Price}</span><br/>per person*
    </span>
                                    <span class="visuallyhidden">
      strikeoutPricePerPersonAccessible=Price was starting from $1199per person*. This crossed out price reflects the standard rate. Price is starting from 399per person*
    </span>
                                </div>

                            </div>

                            <div class="promotion-link">
                                <div id="ember1562" class="ember-view">
                                    <div>
                                        <div id="ember1563" class="ember-view"><a
                                            id="promotionLink-5a72f5f592a6af0ba5b9da60" href="javascript:void(0)"
                                            class="promotion-link" data-ember-action="" data-ember-action-1564="1564">
                                            <span aria-hidden="true">25 offers available!</span>
                                            <span class="visuallyhidden">25 offers available!</span>
                                        </a>

                                            <div class="hidden">
                                                <div id="promotionModalContent-5a72f5f592a6af0ba5b9da60"
                                                     role="complementary" class="modal-body">
                                                    <div class="promotion-modal-title">
                                                        <div class="promotion-title">25 offers available!</div>
                                                        <button type="button" class="btn-close modal-close btn-primary"
                                                                data-ember-action="" data-ember-action-1565="1565">
                                                            <span aria-hidden="true" class="icon icon-close"></span>
                                                            <span class="alt">Close</span>
                                                        </button>
                                                    </div>
                                                    <div class="promotion-disclaimer">Not all offers apply to all
                                                        cabins
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
: null

export default connect(s => ({ status: (s.bookings || {}).status, ether: s.ether, products: s.products, isRedeemPoints: (s.form || {}).redeemPoints }), { book, setEther: set('ether') })(Product);
