import React from 'react';
import Footer from '@theme-original/Footer';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function FooterWrapper(props) {
  return (
    <>
      <section className={[styles.footer_section, styles.section_padding].join(' ')}>
        <h4>We are a <a href="https://www.cncf.io/" target="_blank">Cloud Native Computing Foundation</a> Sandbox Project.</h4>
        <ThemedImage
          alt="Docusaurus themed image"
          width="300px"
          sources={{
            light: useBaseUrl('/img/cncf_light.svg'),
            dark: useBaseUrl('/img/cncf_dark.svg'),
          }}
        />
      </section>
      <Footer {...props} />
    </>
  );
}
