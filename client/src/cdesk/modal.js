import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { setModal } from 'utils/action';

export const withDim = Comp => p =>
    <div class="reveal-modal-bg" style={{ display: p.visible ? 'block' : 'none' }}>
        <Comp {...p} />
    </div>

export const withModal = Comp => p =>
    <div class="reveal-modal modal open" style={{ display: p.visible ? 'block' : 'none', visibility: 'visible' }}>
        <Comp {...p} setModal={p.setModal} />
        <a class="close-reveal-modal" aria-label="Close" onClick={() => p.setModal()}>×</a>
    </div>

export const withDimModal = name => compose(
    connect(
        s => ({ modal: s.modal }),
        { setModal }
    ),
    Comp => p => <Comp {...p} visible={name === (p.modal && p.modal.name)} />,
    withDim,
    withModal
)