import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Marquee from "react-fast-marquee";
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const LogoList = [
    {
        title: 'AWS Logo',
        alt: 'AWS Logo',
        light: 'img/community_logos/aws_light.svg',
        dark: 'img/community_logos/aws_dark.svg',
        width: 60,
    },
    {
        title: 'CNCF Logo',
        alt: 'CNCF Logo',
        light: 'img/community_logos/cncf_light.svg',
        dark: 'img/community_logos/cncf_dark.svg',
        width: 200,
    },
    {
        title: 'Microsoft Logo',
        alt: 'Microsoft Logo',
        light: 'img/community_logos/msft_light.svg',
        dark: 'img/community_logos/msft_dark.svg',
        width: 200,
    },
    {
        title: 'Redhat Logo',
        alt: 'Redhat Logo',
        light: 'img/community_logos/redhat_light.svg',
        dark: 'img/community_logos/redhat_dark.svg',
        width: 200,
    },
    {
        title: 'Sylabs Logo',
        alt: 'Sylabs Logo',
        light: 'img/community_logos/sylabs_light.svg',
        dark: 'img/community_logos/sylabs_dark.svg',
        width: 150,
    },
    {
        title: 'Helm Logo',
        alt: 'Helm Logo',
        light: 'img/community_logos/helm_light.svg',
        dark: 'img/community_logos/helm_dark.svg',
        width: 70,
    },
];

function Logo({ title, alt, light, dark, width }) {
    return (
        <div className={styles.ind_logo}>
            <ThemedImage
                alt={alt}
                title={title}
                width={width}
                sources={{
                    light: useBaseUrl(`${light}`),
                    dark: useBaseUrl(`${dark}`),
                }}
            />
        </div>
    );
}

export default function CommunityLogos() {
    const { isDarkTheme } = useColorMode()
    return (
        <div className={[styles.logo, styles.section_padding].join(' ')}>
            <div className={styles.community_title}>
                <h2>Contributed by the community, in collaboration with</h2>
            </div>
            <Marquee gradientColor={isDarkTheme ? [27, 27, 29] : [255, 255, 255]} gradientWidth={50} speed='30'>
                <div className={styles.logo_image}>
                    {
                        LogoList.map((props, idx) => (
                            <Logo key={idx} {...props} />
                        ))
                    }
                </div>
            </Marquee>
        </div>
    );
};