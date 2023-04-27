import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
        <Head>
        <meta charset="utf-8"/>
        <meta name="go-import" content="oras.land/oras-go git https://github.com/oras-project/oras-go"/>
        <meta name="go-source" content="oras.land/oras-go git https://github.com/oras-project/oras-go https://github.com/oras-project/oras-go/tree/main{/dir} https://github.com/oras-project/oras-go/blob/main{/dir}/{file}#L{line}"/>
        <meta http-equiv="refresh" content="0; url=https://github.com/oras-project/oras-go"/>
      </Head>
    </Layout>
  );
}
