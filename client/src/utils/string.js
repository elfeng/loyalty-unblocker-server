import { reduce, is } from 'ramda';

export const toTitleCase = s =>
    s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());

export const toLowerDash = s => s.toLowerCase().replace(/ /g, '-');

export const replace = (s, params) => params && is(Object, params)
    ? reduce(
        (p, c) => p.replace(new RegExp('\\{' + c + '\\}', 'g'), params[c]),
        s,
        Object.keys(params)
    )
    : s;
