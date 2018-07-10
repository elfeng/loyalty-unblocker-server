import React from 'react';
import { Link } from "react-router-dom";
import { tap } from 'utils';
import { withClickConsoleLog } from 'utils/hoc';
import { levelClass } from './util';

const _Button = ({id, to, level, disabled, rightMargin, onClick, children, class: className}) =>
    <Link id={id}
        class={`${className} button small radius no-margin ${levelClass(level)} ${disabled ? 'disabled' : ''} ${rightMargin ? 'sm-margin-right' : ''}`}
        to={to || ''}
        onClick={onClick}
    >
        {children}
    </Link>

export const Button = withClickConsoleLog(_Button);