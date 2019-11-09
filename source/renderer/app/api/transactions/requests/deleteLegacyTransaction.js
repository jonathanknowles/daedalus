// @flow
import type { RequestConfig } from '../../common/types';
import { request } from '../../utils/request';

export const deleteLegacyTransaction = (
  config: RequestConfig,
  { walletId, transactionId }: { walletId: string, transactionId: string }
): Promise<*> =>
  request({
    method: 'DELETE',
    path: `/v2/byron-wallets/${walletId}/transactions/${transactionId}`,
    ...config,
  });
