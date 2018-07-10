import React from 'react';
import { BackToTopSvg } from './svg';
import { withScroll } from 'utils/hoc';

const _BackToTop = ({isTop}) =>
    <a class="button success no-margin back-to-top" title="Back to Top"
        style={{ display: isTop ? 'none' : 'block' }}
        onClick={() => window.scrollTo(0, 0)}
    >
        <BackToTopSvg />
    </a>

export const BackToTop = withScroll(_BackToTop);