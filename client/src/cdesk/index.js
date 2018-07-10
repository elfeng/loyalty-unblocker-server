import React from 'react';

export { Panel, PanelRow, Col, ColH, Col3, Col5, Col6, Col7, Col12, Col6VTop, TextBlock } from './layout';
export { Accordion } from './Accordion';
export { BackToTop } from './BackToTop';
export { Button } from './Button';
export { Content } from './Content';
export { Footer } from './Footer';
export { Header } from './Header';
export { Main } from './Main';
export { Menu } from './Menu';
export { Page } from './Page';
export { Side } from './Side';
export { Table } from './Table';
export { withDim, withModal, withDimModal } from './modal';
export { Ship, Depart, Return, RightArrow, BackToTopSvg, Help } from './svg';

import { DoubleSelect as _DoubleSelect } from 'form';
export const DoubleSelect = p => <_DoubleSelect {...p} buttonStyle="tiny radius"/>