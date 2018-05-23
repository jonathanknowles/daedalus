import React from 'react';
import { storiesOf, action } from '@storybook/react';
import StoryDecorator from './support/StoryDecorator';
import AdaRedemptionForm from '../../source/renderer/app/components/wallet/ada-redemption/AdaRedemptionForm';
import AdaRedemptionChoices from '../../source/renderer/app/components/wallet/ada-redemption/AdaRedemptionChoices';

storiesOf('AdaRedemptionForm', module)

  .addDecorator((story) => (
    <StoryDecorator>
      {story()}
    </StoryDecorator>
  ))

  // ====== Stories ======

  .add('Ada redemption choices', () => (
    <div>
      <AdaRedemptionChoices
        activeChoice="forceVended"
        onSelectChoice={action('selectChoice')}
      />
    </div>
  ))

  .add('Certificate not selected', () => (
    <div>
      <AdaRedemptionForm
        onSubmit={action('submit')}
        isSubmitting={false}
        isRedemptionDisclaimerAccepted
        isCertificateSelected={false}
        isCertificateEncrypted={false}
        onCertificateSelected={action('onCertificateSelected')}
        onPassPhraseChanged={action('onPassPhraseChanged')}
        onRedemptionCodeChanged={action('onRedemptionCodeChanged')}
        onChooseRedemptionType={action('onChooseRedemptionType')}
        redemptionCode=""
        redemptionType="regular"
        getSelectedWallet={() => ({})}
        wallets={[
          { value: 'wallet-1', label: 'First Wallet' },
          { value: 'wallet-2', label: 'Second Wallet' },
          { value: 'wallet-3', label: 'Third Wallet' },
        ]}
      />
    </div>
  ))

  .add('Certificate selected - not encrypted', () => (
    <div>
      <AdaRedemptionForm
        onSubmit={action('submit')}
        isSubmitting={false}
        isRedemptionDisclaimerAccepted
        isCertificateSelected
        isCertificateEncrypted={false}
        onCertificateSelected={action('onCertificateSelected')}
        onPassPhraseChanged={action('onPassPhraseChanged')}
        onRedemptionCodeChanged={action('onRedemptionCodeChanged')}
        onChooseRedemptionType={action('onChooseRedemptionType')}
        redemptionCode=""
        redemptionType="regular"
        getSelectedWallet={() => ({})}
        wallets={[
          { value: 'wallet-1', label: 'First Wallet' },
          { value: 'wallet-2', label: 'Second Wallet' },
          { value: 'wallet-3', label: 'Third Wallet' },
        ]}
      />
    </div>
  ))

  .add('Certificate selected - encrypted', () => (
    <div>
      <AdaRedemptionForm
        onSubmit={action('submit')}
        isSubmitting={false}
        isRedemptionDisclaimerAccepted
        isCertificateSelected
        isCertificateEncrypted
        onCertificateSelected={action('onCertificateSelected')}
        onPassPhraseChanged={action('onPassPhraseChanged')}
        onRedemptionCodeChanged={action('onRedemptionCodeChanged')}
        onChooseRedemptionType={action('onChooseRedemptionType')}
        redemptionCode=""
        redemptionType="regular"
        getSelectedWallet={() => ({})}
        wallets={[
          { value: 'wallet-1', label: 'First Wallet' },
          { value: 'wallet-2', label: 'Second Wallet' },
          { value: 'wallet-3', label: 'Third Wallet' },
        ]}
      />
    </div>
  ));
