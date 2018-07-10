import React from 'react';
import { levelClass } from './util';

export const Panel = ({title, level, small, sideMargin, children, collapse, class: className}) =>
    <div class={`panel panel--${levelClass(level || 2)} sm-margin-bottom ${sideMargin ? 'sm-margin-left sm-margin-right' : ''} ${className || ''}`}>
        <h3 class={`block-heading-${small ? 'sm' : 'med'}`}>
            {small ? title : <b>{title}</b>}
        </h3>

        <div class="sm-block">
            {children}
        </div>

    </div>

export const PanelRow = ({sideMargin, topMargin, bottomMargin, center, children, collapse}) =>
    <div class={`row eq-height-col
        ${center ? 'text-center' : ''} 
        ${topMargin ? 'sm-margin-top' : ''} 
        ${bottomMargin ? 'sm-margin-bottom' : ''} 
        ${sideMargin ? 'sm-margin-left sm-margin-right' : ''}
        ${collapse ? 'collapse' : ''}
    `}>
        {children}
    </div>

export const Col = ({cols, bgColor, small, vCenter, children}) =>
    <div class={`columns ${small ? 'small-' : 'large-'}${cols} ${vCenter ? 'vert-align-center' : ''} ${bgColor || ''}`}>
        {children}
    </div>

export const ColH = ({cols, bgColor, small, horizontal, children}) =>
    <div class={`columns ${small ? 'small-' : 'large-'}${cols} ${horizontal ? horizontal : ''} ${bgColor || ''}`}>
        {children}
    </div>

export const Col5 = p =>
    <Col {...p} cols="5" />

export const Col6 = p =>
    <Col {...p} cols="6" small vCenter />

export const Col6VTop = p =>
    <ColH {...p} cols="6" small horizontal='vert-align-top' />

export const Col7 = p =>
    <Col {...p} cols="7" />

export const Col12 = ({children}) =>
    <div class="small-12 columns">
        {children}
    </div>

export const Col3 = ({children}) =>
    <div class="small-6 medium-3 columns">
        {children}
    </div>

export const TextBlock = ({children}) =>
    <div class="text-block-sm border-gainsboro">
        {children}
    </div>
