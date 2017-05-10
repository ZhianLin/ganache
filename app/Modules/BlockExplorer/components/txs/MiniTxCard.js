
import React, { Component } from 'react'

import EtherUtil from 'ethereumjs-util'

import FormattedHex from 'Elements/FormattedHex'

import Styles from './MiniTxCard.css'

export default class MiniTxCard extends Component {
  render () {
    const { tx } = this.props
    return (
      <tr
        className={Styles.MiniTxCard}
        onClick={this.props.handleTxSearch.bind(this, EtherUtil.bufferToHex(tx.hash))}
      >
        <td>
          <div className={Styles.Truncate}>{EtherUtil.bufferToHex(tx.hash)}</div>
        </td>
        <td>
          <FormattedHex value={tx.nonce} />
        </td>
        <td>
          <FormattedHex value={tx.value} />
        </td>
        <td>
          {EtherUtil.bufferToHex(tx.from)}
        </td>
        <td>
          {EtherUtil.bufferToHex(tx.to)}
        </td>
      </tr>
    )
  }
}
