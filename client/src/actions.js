import { get, post, set } from 'utils/action';

export const isDev = () => process.env.NODE_ENV === 'development';

const api = isDev() ? 'http://localhost:8080/' : '/';

export const setStep = set('step');

export const setDeep = set('l1.l2[].l3.l4[].l5');

export const getTodos = get('Todos', 'https://my-json-server.typicode.com/ln613/no-redux-todo-example/todos');

export const getLookup = get('', api + 'Rate/GetProductSummary?Date=07%2F04%2F2018&Itin=15648&RtOptCity=SEA&Currency=USD&Pax=2&ClCd=PC');

export const getRates = get('rates', api + 'Rate/GetRates?RtOptCity=SEA&Date=07%2F04%2F2018&Itin=15648&Currency=USD&Pax=2&passengerAge=0');

export const book = post('bookings', api + 'book');

export const getProducts = post('products', api + 'products');

export const setEther = set('ether');
