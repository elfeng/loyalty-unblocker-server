import React from 'react';
import { range } from 'ramda';

export const textBox = p =>
    <input type="text" {...p} />

export const checkBox = p =>
    <input type="checkbox" checked={p.value} {...p} />

export const radio = p =>
    <input type="radio" {...p} />
    
export const select = ({options, placeholder, isGroup, size, multiple, onChange}) =>
    <select onChange={onChange} size={size} multiple={multiple}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {isGroup
            ? Object.keys(options).map(k => optionGroup(k, options))
            : options.map(option)
        }
    </select>

const option = o =>
    <option key={o.value} value={o.value}>{o.text}</option>

const optionGroup = (key, options) =>
    <optgroup label={key} key={key}>
        {(options[key] || []).map(option)}
    </optgroup>

export const checkBoxWithLabel = p => p.title ?
    <div>
        {checkBox(p)}
        <label htmlFor={p.name} class="label-align">
            {p.title}
        </label>
    </div>
    : checkBox(p)

export const toggle = (index, id, checked) =>
    <li key={id + index}>
        {radio({id: id + index, value: index, checked, readOnly: true, 'data-toggle': 'button'})}
        <label class="button small" htmlFor={id + index}>{index}</label>
    </li>
    
export const toggleButtonList = p =>
    <ul class="button-group radius toggle full even-5 sm-margin-bottom right" {...p}>
        {range(0, p.max).map((x, i) => toggle(i + 1, p.id, i + 1 === +p.value))}
    </ul>
