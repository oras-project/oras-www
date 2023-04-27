import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Header from '@site/src/components/Header';
import WhatIsORAS from '@site/src/components/WhatIsORAS';
import Workflow from '@site/src/components/Workflow';
import CommunityLogos from '../components/CommunityLogos';
import Libraries from '../components/Libraries';
import Features from '../components/Features';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <main>
        <Header />
        <CommunityLogos />
        <WhatIsORAS />
        <Features />
        <Workflow />
        <Libraries />
      </main>
    </Layout>
  );
}
