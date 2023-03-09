import {
  WalletProps,
  WalletOptions,
  getDefaultWalletConnectConnector,
  getProviderUri,
} from './../wallet';

import { isAndroid } from '../../utils';
import Logos from './../../assets/logos';
import { InjectedConnector } from 'wagmi/connectors/injected';
export const frontier = ({ chains }: WalletOptions): WalletProps => {
  const isInstalled =
    typeof window !== 'undefined' && window.ethereum?.isFrontier === true;
  return {
    id: 'frontier',
    name: 'Frontier',
    logos: {
      default: <Logos.Frontier />,
    },
    logoBackground: '#CC703C',
    scannable: false,
    downloadUrls: {
      download: 'https://connect.family.co/v0/download/frontier',
      ios: 'https://apps.apple.com/app/frontier-crypto-defi-wallet/id1482380988',
      android:
        'https://play.google.com/store/apps/details?id=com.frontierwallet',
      website: 'https://frontier.xyz/',
    },
    installed: isInstalled,
    createConnector: () => {
      // const connector = getDefaultWalletConnectConnector(chains);
      const connector = new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      });
      return {
        connector,
        mobile: {
          getUri: async () => {
            const uri = await getProviderUri(connector);

            return isAndroid()
              ? uri
              : `frontier://wc?uri=${encodeURIComponent(uri)}`;
          },
        },
        qrCode: {
          getUri: async () => await getProviderUri(connector),
        },
      };
    },
  };
};
