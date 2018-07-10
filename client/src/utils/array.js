import { is } from 'ramda';

export const toSingleArray = a =>
    is(Array, a) ? a : [a]
