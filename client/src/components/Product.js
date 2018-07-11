import React from 'react';
import { connect } from 'react-redux';
import { book } from 'actions';
import { Button } from 'cdesk';
import { set } from 'utils/action';
import { tap } from 'utils';
import ship from '../images/ship.jpeg';

const Product = ({status, book, setEther, ether}) =>
<div data-flex-flip="smallTablet" class="cf flex-1up flex-listing flex-theme-light flex-collapse cols-nested sailing-cruise-card">
    <div class="col cruise-card-content">
     <div class="flex-card ">
        <div class="flex-figure">
            <img src={ship}/>
        </div>
          <div class="flex-area-primary">
            <div class="card-content">
              <div class="ship-name">
                Norwegian Getaway
              </div>
              <div class="departing-on-text">
                Departing on <span class="departing-on">Sep 2, 2018</span>
              </div>
              <div class="card-links">
                 <div id="ember1558" class="ember-view"><button type="button" data-content-ref="#ports-link-5a72f5f592a6af0ba5b9da60" aria-label="Show itinerary" data-control="toggle" data-transition="fade" data-isdisplay-icon="true" aria-expanded="false" data-manual="both" data-expand-text="Show itinerary<span class=&quot;icon icon-toggle180 icon-expand&quot;
        aria-hidden=&quot;
        true&quot;></span>" data-collapse-text="Hide itinerary<span class=&quot;icon icon-toggle180 icon-expand&quot; aria-hidden=&quot;
        true&quot;></span>" class="btn-text toggle-trigger" data-ember-action="" data-ember-action-1559="1559">
  <span aria-hidden="true" class="icon icon-toggle180 icon-expand">Show itinerary</span>
</button>

<button type="button" data-manual="both" data-content-ref="#map-link-5a72f5f592a6af0ba5b9da60" aria-label="Show map" data-control="toggle" data-transition="fade" data-isdisplay-icon="true" aria-expanded="false" data-expand-text="Show map<span class=&quot;icon icon-toggle180 icon-expand&quot; aria-hidden=&quot;
        true&quot;></span>" data-collapse-text="Hide map<span class=&quot;icon icon-toggle180 icon-expand&quot; aria-hidden=&quot;
        true&quot;></span>" class="btn-text toggle-trigger" data-ember-action="" data-ember-action-1560="1560">
  <span aria-hidden="true" class="icon icon-toggle180 icon-expand">Show map</span>
</button>


</div>
              </div>
            </div>
          </div>

          <div class="flex-area-secondary">
            <div class="sailing-pricing-container">
              <div class="sailing-pricing-container-left">
              <div id="ember1561" class="ember-view">
<div class="price">
    <span aria-hidden="true">
      from <br/><span class="strikeout-price-card"><s>$1199</s> </span><span class="card-price">$399</span><br/>per person*
    </span>
    <span class="visuallyhidden">
      strikeoutPricePerPersonAccessible=Price was starting from $1199per person*. This crossed out price reflects the standard rate. Price is starting from 399per person*
    </span>
</div>

</div>

                <div class="promotion-link">
                  <div id="ember1562" class="ember-view"><div>
  <div id="ember1563" class="ember-view"><a id="promotionLink-5a72f5f592a6af0ba5b9da60" href="javascript:void(0)" class="promotion-link" data-ember-action="" data-ember-action-1564="1564">
  <span aria-hidden="true">25 offers available!</span>
  <span class="visuallyhidden">25 offers available!</span>
</a>

<div class="hidden">
  <div id="promotionModalContent-5a72f5f592a6af0ba5b9da60" role="complementary" class="modal-body">
    <div class="promotion-modal-title">
      <div class="promotion-title">25 offers available!</div>
      <button type="button" class="btn-close modal-close btn-primary" data-ember-action="" data-ember-action-1565="1565">
        <span aria-hidden="true" class="icon icon-close"></span>
        <span class="alt">Close</span>
      </button>
    </div>
    <div class="promotion-disclaimer">Not all offers apply to all cabins</div>

  </div>
</div></div>
</div></div>
                </div>
              </div>

              <div id="ember1566" class="ember-view"><a target="_self" id="selectSailingButton-5a72f5f592a6af0ba5b9da60-29" href="/Cruise-CabinCategory?sailingId=5a72f5f592a6af0ba5b9da60&amp;cabinType=inside&amp;adultCount=2&amp;childCount=0" class="btn btn-secondary btn-action select-sailing-button" data-ember-action="" data-ember-action-1567="1567">
  <span aria-hidden="true" class="btn-label">Select</span>
  <span class="visuallyhidden">Select 7 night Caribbean Cruise departing from Miami, Florida</span>
</a></div>
            </div>
          </div>
        </div>
      </div>
  </div>

export default connect(s => ({ status: (s.bookings || {}).status, ether: s.ether ? s.ether.c[0] : 0 }), { book, setEther: set('ether') })(Product);
