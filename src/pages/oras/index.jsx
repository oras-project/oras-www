import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="This page will redirect to https://github.com/oras-project/oras">
      <Head>
        <meta name="go-import" content="oras.land/oras git https://github.com/oras-project/oras" />
        <meta name="go-source" content="oras.land/oras git https://github.com/oras-project/oras https://github.com/oras-project/oras/tree/main{/dir} https://github.com/oras-project/oras/blob/main{/dir}/{file}#L{line}" />
        <meta http-equiv="refresh" content="0; url=https://github.com/oras-project/oras" />
      </Head>
    </Layout>
  );
}
