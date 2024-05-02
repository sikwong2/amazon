import Head from 'next/head'
import { Fragment } from 'react';

export default function Index() {
  return (
    <Fragment>
      <Head>
        <title>ucsc-amazon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Fragment>
  )
}