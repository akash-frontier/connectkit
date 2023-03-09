import {
  WalletProps,
  WalletOptions,
  getDefaultWalletConnectConnector,
  getProviderUri,
} from './../wallet';

import { isAndroid, isMobile } from '../../utils';
import Logos from './../../assets/logos';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const trust = ({ chains }: WalletOptions): WalletProps => {
  const isInstalled =
    typeof window !== 'undefined' && window.ethereum?.isTrust === true;
  return {
    id: 'trust',
    name: 'Trust Wallet',
    shortName: 'Trust',
    logos: {
      default: <Logos.Trust />,
    },
    logoBackground: '#fff',
    scannable: false,
    downloadUrls: {
      download: 'https://connect.family.co/v0/download/trust',
      android:
        'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      ios: 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409',
    },
    installed: isInstalled,
    createConnector: () => {
      const connector = !isMobile()
        ? new InjectedConnector({
            chains,
            options: { shimDisconnect: true },
          })
        : getDefaultWalletConnectConnector(chains);

      return {
        connector,
        mobile: {
          getUri: async () => {
            const uri = await getProviderUri(connector);

            return isAndroid()
              ? uri
              : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(
                  uri
                )}`;
          },
        },
        qrCode: {
          getUri: async () => await getProviderUri(connector),
        },
      };
    },
  };
};
