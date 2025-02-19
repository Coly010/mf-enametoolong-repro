import { ModuleFederationConfig } from '@nx/module-federation';
import { NxModuleFederationPlugin } from '@nx/module-federation/webpack';
import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';
import { NxReactWebpackPlugin } from '@nx/react/webpack-plugin';
import { join } from 'path';

import baseConfig from './module-federation.config';

const config: ModuleFederationConfig = {
  ...baseConfig,
};

export default {
  output: {
    path: join(__dirname, 'dist'),
    uniqueName: 'shell',
  },
  devServer: {
    port: 4200,
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
    new NxModuleFederationPlugin(
      {
        config,
      },
      { dts: false }
    ),
  ],
};
