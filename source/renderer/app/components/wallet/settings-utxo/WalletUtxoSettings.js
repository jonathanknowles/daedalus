// @flow
import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import BigNumber from 'bignumber.js';
import classnames from 'classnames';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import Tick from './WalletSettingsUtxoTick';
import CustomTooltip from './WalletSettingsUtxoTooltip';
import Cursor from './WalletSettingsUtxoCursor';
import { DECIMAL_PLACES_IN_ADA } from '../../../config/numbersConfig';
import styles from './WalletUtxoSettings.scss';
import type { TickProps } from './WalletSettingsUtxoTick';

export const messages = defineMessages({
  title: {
    id: 'wallet.settings.utxos.title',
    defaultMessage: '!!!Wallet UTxO distribution',
    description: 'Title for the "Wallet Utxos" screen.',
  },
  description: {
    id: 'wallet.settings.utxos.description',
    defaultMessage:
      '!!!This wallet contains <b>{formattedWalletAmount} ADA</b> on <b>{walletUtxosAmount} UTxOs</b> (unspent transaction outputs). Examine the histogram below to see the distribution of UTxOs with different amounts of ada.',
    description: 'Description for the "Wallet Utxos" screen.',
  },
  emptyWallet: {
    id: 'wallet.settings.utxos.emptyWallet',
    defaultMessage:
      '!!!This wallet is empty so it does not contain any UTxOs (unspent transaction outputs).',
    description: 'Empty wallet description for the "Wallet Utxos" screen.',
  },
  labelX: {
    id: 'wallet.settings.utxos.labelX',
    defaultMessage: '!!!amount',
    description: 'Label X for the "Wallet Utxos" screen.',
  },
  labelY: {
    id: 'wallet.settings.utxos.labelY',
    defaultMessage: '!!!Nº UTxO',
    description: 'Label Y for the "Wallet Utxos" screen.',
  },
});

type Props = {
  walletAmount: BigNumber,
  walletUtxosAmount: number,
  chartData: Array<any>,
};

@observer
export default class WalletUtxoSettings extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { walletAmount, walletUtxosAmount, chartData } = this.props;
    const formattedWalletAmount = walletAmount.toFormat(DECIMAL_PLACES_IN_ADA);
    const isEmpty = walletUtxosAmount === 0;
    const componentStyles = classnames([
      styles.component,
      isEmpty ? styles.isEmpty : null,
    ]);

    return (
      <div className={componentStyles}>
        <h1>{intl.formatMessage(messages.title)}</h1>

        {!isEmpty ? (
          <Fragment>
            <p>
              <FormattedHTMLMessage
                {...messages.description}
                values={{ formattedWalletAmount, walletUtxosAmount }}
              />
            </p>

            <ResponsiveContainer
              height={280}
              className={styles.responsiveContainer}
            >
              <BarChart data={chartData} barGap={30} barCategoryGap={4}>
                <CartesianGrid
                  horizontal={false}
                  vertical={false}
                  fill="rgba(68, 91, 124, 0.06)"
                />
                <XAxis
                  dataKey="walletAmount"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tick={(props: TickProps) => (
                    <Tick {...props} textAnchor="start" vertical />
                  )}
                  className={styles.xAxis}
                  y={0}
                >
                  <Label
                    value={intl.formatMessage(messages.labelX)}
                    offset={20}
                    position="insideBottomRight"
                    className={styles.xAxisLabel}
                  />
                </XAxis>
                <YAxis
                  dataKey="walletUtxosAmount"
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  domain={[0, 'dataMax']}
                  tick={(props: TickProps) => (
                    <Tick {...props} textAnchor="end" />
                  )}
                >
                  <Label
                    value={intl.formatMessage(messages.labelY)}
                    offset={-20}
                    position="insideTopLeft"
                    className={styles.yAxisLabel}
                  />
                </YAxis>
                <Tooltip
                  cursor={<Cursor />}
                  isAnimationActive={false}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="walletUtxosAmount" className={styles.bar} />
              </BarChart>
            </ResponsiveContainer>
          </Fragment>
        ) : (
          <p>{intl.formatMessage(messages.emptyWallet)}</p>
        )}
      </div>
    );
  }
}
