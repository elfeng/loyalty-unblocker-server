import { isNil } from 'ramda';
import { withState as _withState, compose, lifecycle, withHandlers } from 'recompose';
import { toSingleArray } from './array';
import { tap } from '.';

const withScrollListener = lifecycle({
    componentDidMount() {
        window.addEventListener('scroll', this.props.onScroll);
    },

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.onScroll);
    }
});

const onScroll = p => e => p.setIsTop(window.scrollY < 50);

const consoleLog = (event, comp, props) =>
    console.log(event, props);

// exports

export const withState = (p, v) =>
    _withState(p, 'set' + p.charAt(0).toUpperCase() + p.substr(1), v)

export const withLoad = (f, ps) => lifecycle({
    componentWillMount() {
        toSingleArray(f).forEach(x => this.props[x](ps));
    }
});

export const withNewValue = (p, f, v) => lifecycle({
  componentWillReceiveProps(np) {
    const nv = np[p];
    const ov = this.props[p];
    if (isNil(v) ? nv !== ov : (nv === v && ov !== v))
      tap(f)(this.props, nv);
  }
});

export const withScroll = compose(
    withState('isTop', true),
    withHandlers({ onScroll }),
    withScrollListener
);

export const withEventLog = event => log => comp => props => comp({...props, [event]: () => {
    if (props[event]) props[event]();
    log(event, comp, props);
}})

export const withClickConsoleLog = withEventLog('onClick')(consoleLog);
