import React from 'react';
import { storiesOf, action } from '@storybook/react';
import StoryDecorator from './support/StoryDecorator';
import DeleteWalletConfirmationDialog from '../../source/renderer/app/components/wallet/settings/DeleteWalletConfirmationDialog';

storiesOf('DeleteWalletConfirmationDialog', module)

  .addDecorator((story) => (
    <StoryDecorator>
      {story()}
    </StoryDecorator>
  ))

  // ====== Stories ======

  .add('without funds & countdown', () => (
    <div>
      <DeleteWalletConfirmationDialog
        walletName="My Wallet"
        hasWalletFunds={false}
        countdownFn={() => 10}
        isBackupNoticeAccepted={false}
      />
    </div>
  ))
  .add('without funds - not accepted', () => (
    <div>
      <DeleteWalletConfirmationDialog
        walletName="My Wallet"
        hasWalletFunds={false}
        countdownFn={() => 0}
        isBackupNoticeAccepted={false}
      />
    </div>
  ))
  .add('without funds - accepted', () => (
    <div>
      <DeleteWalletConfirmationDialog
        walletName="My Wallet"
        hasWalletFunds={false}
        countdownFn={() => 0}
        isBackupNoticeAccepted
      />
    </div>
  ))
  .add('funds & countdown', () => (
    <div>
      <DeleteWalletConfirmationDialog
        walletName="My Wallet"
        hasWalletFunds
        countdownFn={() => 10}
        isBackupNoticeAccepted={false}
      />
    </div>
  ))
  .add('funds & accepted', () => (
    <div>
      <DeleteWalletConfirmationDialog
        walletName="My Wallet"
        hasWalletFunds
        countdownFn={() => 0}
        isBackupNoticeAccepted
      />
    </div>
  ))
  .add('funds & accepted & filled', () => (
    <div>
      <DeleteWalletConfirmationDialog
        walletName="My Wallet"
        hasWalletFunds
        countdownFn={() => 0}
        isBackupNoticeAccepted
        confirmationValue="babushka"
        onConfirmationValueChange={action('onRecoveryWordChange')}
      />
    </div>
  ));

