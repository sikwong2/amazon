import React from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import { App } from '../views/App'

export default function Index() {
  const title = 'CSE187 Admin App'
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App/>
    </Fragment>
  )
}