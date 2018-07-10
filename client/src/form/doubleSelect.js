import React from 'react';
import { difference, find } from 'ramda';
import { select } from './controls';
import { withAll, withForm } from './hoc';
import { compose, withProps } from 'recompose';
import { tap } from 'utils';

const s1 = {
    display: 'flex',
    flexDirection: 'row'
};

const s2 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '8px',
    marginRight: '8px'
};

const s3 = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
};

const Select = withAll(select);

const _DoubleSelect = ({name, src, dst, srcTitle, dstTitle, size, buttonStyle, onChange, onAdd, onRemove}) =>
    <div name={name} style={s1}>
        <div style={s3}>
            <div><b>{srcTitle}</b></div>
            <Select name={name + '_src'} options={src} size={size || 8} multiple onChange={onChange} />
        </div>
        <div style={s2}>
            <button class={buttonStyle} onClick={onAdd}>&#x3E;&#x3E;</button>
            <button class={buttonStyle} onClick={onRemove}>&#x3C;&#x3C;</button>
        </div>
        <div style={s3}>
            <div><b>{dstTitle}</b></div>
            <Select name={name + '_dst'} options={dst} size={size || 8} multiple onChange={onChange} />
        </div>
    </div>

export const DoubleSelect = compose(
    withForm,
    withProps(({name, options, form, setForm}) => {
        const [fn, n] = name.split('.');
        const f = form;
        const selectedOptions = (f && f[fn] && f[fn][n]) || [];
        const src = options.filter(x => !find(y => y == x.value, selectedOptions));
        const dst = selectedOptions.map(x => find(y => y.value == x, options));
        const srcSelected = (f && f[fn] && f[fn][n + '_src']) || [];
        const dstSelected = (f && f[fn] && f[fn][n + '_dst']) || [];
        const onAdd = () => {
            setForm(name, dst.map(x => x.value.toString()).concat(srcSelected));
            setForm(name + '_src', []);
        };
        const onRemove = () => {
            setForm(name, difference(dst.map(x => x.value.toString()), dstSelected));
            setForm(name + '_dst', []);
        };
        return { src, dst, onAdd, onRemove };
    })
)(_DoubleSelect);