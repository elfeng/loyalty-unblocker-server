import React from 'react';
import { withState } from 'utils/hoc';

const _Accordion = ({title, level, border, showStyle, children, open, setOpen}) =>
    <dl data-accordion class={`accordion small white
        ${level === 1 ? 'primary' : (level === 3 ? 'tertiary' : 'secondary')}
        ${border ? 'border' : ''}`}
    >
        <dd class="accordion-navigation">
            <a
                class={`${showStyle(open)} accordion-trigger`}
                onClick={() => setOpen(!open)}
            >
                {title}
            </a>

            <div class={`content ${open ? 'active' : ''}`}>
                {children}
            </div>
        </dd>
    </dl>

export const Accordion = withState('open')(_Accordion);