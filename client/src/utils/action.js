import { isNil } from 'ramda';
import { replace } from './string';

export const get = (path, url) => params => ({
    type: 'get',
    path: replace(path, params),
    url: replace(url, params)
});

export const post = (path, url) => (body, params) => ({
    type: 'post',
    path: replace(path, params),
    url: replace(url, params),
    body
});

export const set = path => (payload, params) => ({
    type: 'set',
    path: replace(path, params),
    payload
});

export const setModal = (name, modal) => set('modal')(modal && {...modal, name})
export const setSort = (name, prop, dir) => set(`filter.${name}.sort`)([prop, dir || 0])
export const setForm = (key, value, index) => set(`form.${key}${isNil(index) ? '' : `[${index}]`}`)(value)
