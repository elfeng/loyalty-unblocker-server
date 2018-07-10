import React from 'react';
import { connect } from 'react-redux';
import { is, find } from 'ramda';
import { toTitleCase } from 'utils/string';
import { filterSelector } from 'utils/selector';
import { setSort } from 'utils/action';
import { TextBox, CheckBox } from 'form';
import { levelClass } from './util';
import { tap } from 'utils';

const _Table = ({ data, name, level, withIndex, selectable, noHeader, hoverHighlight, sortable, filter, setSort, children }) => {
    const l = data || [];
    const keys = l.length > 0 ? Object.keys(l[0]) : [];
    const sort = (filter[name] || {}).sort;
    const sortby = sort && sort[0];
    const sortDir = sort && sort[1];

    return (
        <table role="grid" class={`dataTable no-margin ${levelClass(level || 1)} ${hoverHighlight ? 'row-select' : ''}`}>
            {noHeader ? null :
                <thead class="nowrap">
                    <tr role="row">
                        {selectable ? <th class="col-20"></th> : null}
                        {withIndex ? <th></th> : null}
                        {keys.map((k, i) =>
                            <th key={`th${i}`}
                                class={`${thClass(k, children)}
                                    ${right(k, children) && 'text-right'}
                                    ${center(k, children) && 'text-center'}
                                    ${sortable ? 'sorting' + (sortby === k ? (sortDir === 1 ? '_asc' : '_desc') : '') : ''}
                                `}
                                onClick={sortable ? () => setSort(name, k, sortDir === 1 ? 2 : 1) : null}
                            >
                                {title(k, children)}
                            </th>
                        )}
                    </tr>
                </thead>
            }

            <tbody class="small valign-top">
                {l.map((o, i) =>
                    <tr key={`tr${i}`}>
                        {selectable ? <td class="text-center"><CheckBox name={`selected${toTitleCase(name)}`} index={i} /></td> : null}
                        {withIndex ? <td class="text-center">{i + 1}</td> : null}
                        {keys.map(k => col(i, k, o, children))}
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export const Table = connect(filterSelector, { setSort })(_Table);

const col = (idx, key, obj, children) => {
    if (!is(Array, children))
        children = children ? [children] : [];
    const c = find(x => x.key === key, children) || { props: {} };
    const p = c.props;

    let v = obj[key];
    let cls = '';

    if (p.currency) v = '$' + (+v).toFixed(2);
    if (p.bold) v = <b>{v}</b>;
    if (p.tdClass) cls += p.tdClass;
    if (p.center) cls += ' text-center';
    if (p.right) cls += ' text-right';
    if (p.width) cls += ' col-' + p.width; //20, 40, 50, 60, 70, 80, 90, 120, 130, 160
    if (p.image) v = <img src={obj[key]} class={p.imageClass} alt="" />;
    if (p.link) v = <a href={obj[key + 'Link']} onClick={p.onClick ? () => p.onClick(obj) : null} class="link-underline secondary-link">{v}</a>;
    if (p.input) {
        v = <TextBox name={key} index={idx} className={`${p.center ? 'text-center' : ''} ${p.right ? 'text-right' : ''}`} />;
        cls += ' edit';
    }

    return <td key={`td${key + idx}`} class={cls}>{p.children ? p.children(obj) : v}</td>;
}

const prop = (prop, val = '') => (key, children) => {
    const child = find(x => x.key === key, children || []);
    return (child && child.props[prop]) || val;
}

const thClass = prop('thClass');
const right = prop('right');
const center = prop('center');
const title = (key, children) => prop('title', toTitleCase(key))(key, children);
