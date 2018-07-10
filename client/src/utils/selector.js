import { fromPairs, init, last, range, prop, sortWith, ascend, descend } from 'ramda';

export const mapStateWithSelectors = m =>
    s => fromPairs(Object.keys(m).map(x => [x, m[x](s)]));

export const createSelector = (...fns) => {
    if (fns.length === 0) return;

    const ps = init(fns);
    const f = last(fns);

    let args = null;
    let cache = null;

    return s => {
        const newArgs = ps.length === 0 ? [s] : ps.map(x => x(s));
        if (!args || range(0, args.length).some(i => args[i] !== newArgs[i])) {
            args = newArgs;
            cache = f.apply(null, args);
        }

        return cache;
    }
}

export const sortedList = (list, filter) => createSelector(
    list,
    filter,
    (l, f) => {
        const sort = f.sort;
        if (!sort || sort.length < 2) return l;

        const by = prop(sort[0]);
        return sortWith([sort[1] === 2 ? descend(by) : ascend(by)], l);
    }
)

export const lookup = s => s.lookup || {};
export const filter = s => s.filter || {};
export const form = s => s.form || {};
export const modal = s => s.modal;

export const lookupSelector = s => ({ lookup: lookup(s) });
export const filterSelector = s => ({ filter: filter(s) });
export const formSelector = s => ({ form: form(s) });
export const modalSelector = s => ({ modal: modal(s) });
