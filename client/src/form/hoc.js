import React from 'react';
import { connect } from 'react-redux';
import { isNil, is } from 'ramda';
import { compose } from 'recompose';
import { formSelector } from 'utils/selector';
import { setForm } from 'utils/action';

const withInput = isCheck => comp => ({name, index, multiple, form, setForm, ...args}) => {
    const [fn, n] = name.split('.');
    let value = form && form[fn] && form[fn][n];
    if (!isNil(index) && is(Array, value)) value = value[index];
    const onChange = e => setForm(
        name,
        isCheck
            ? e.target.checked
            : (multiple
                ? Array.apply(null, e.target.options).filter(x => x.selected).map(x => x.value)
                : e.target.value),
        index
    );
    return comp({...args, id: fn + '_' + n, name, value, multiple, onChange});
}

const withLabel = Comp => p => p.title
    ?
    <div>
        <label>
            <b>{p.title}{p.required ? <span style={{color: "red"}}> *</span> : null}</b>
        </label>
        <Comp {...p}/>
    </div>
    : <Comp {...p}/>

export const withForm = connect(formSelector, { setForm });

export const withAll = compose(withLabel, withForm, withInput(false));
export const withCheck = compose(withForm, withInput(true));
