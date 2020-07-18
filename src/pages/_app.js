import React from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head';

import 'antd/dist/antd.css';
import '@/styles/style.scss';
import store from '@/store'

export default function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
  			{/*这里可以加公共头信息*/}
  			<Head>
          <meta 
	        	name="viewport" 
	      		content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" 
	      	/>
          <title>微信集赞❥(^_-)</title>
          {/*<meta name="viewport" content="" />*/}
        </Head>
			<Component {...pageProps} />
		</Provider>
}