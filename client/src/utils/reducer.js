import { reduce } from 'ramda';
import { update } from 'ipath';

const r = {};

r.set = (s, a) => a.path
    ? update(s, a.path, a.payload)
    : reduce((p, c) => update(p, c, a.payload[c]), s, Object.keys(a.payload))

export default r;

export const createReducer = r => (s, a) => r[a.type] ? r[a.type](s, a) : s;
