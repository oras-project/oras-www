import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const LibraryList = [
    {
        title: 'Python Logo',
        alt: 'Python Logo',
        Svg: require('@site/static/img/libraries/python.svg').default,
        link: 'https://github.com/oras-project/oras-py',
        width: 70,
    },
    {
        title: 'Go Logo',
        alt: 'Go Logo',
        Svg: require('@site/static/img/libraries/go.svg').default,
        link: 'https://github.com/oras-project/oras-go',
        width: 100,
    },
    {
        title: '.Net Logo',
        alt: '.Net Logo',
        Svg: require('@site/static/img/libraries/net.svg').default,
        link: 'https://github.com/oras-project/oras-dotnet',
        width: 100,
    },
    {
        title: 'Java Logo',
        alt: 'Java Logo',
        Svg: require('@site/static/img/libraries/duke.svg').default,
        link: 'https://github.com/oras-project/oras-java',
        width: 50,
    },
    {
        title: 'Quarkus Logo',
        alt: 'Quarkus Logo',
        Svg: require('@site/static/img/libraries/quarkus.svg').default,
        link: 'https://github.com/quarkiverse/quarkus-oras',
        width: 80,
    },
];

function Logo({ title, alt, Svg, width, link }) {
    return (
        <div className={styles.ind_logo}>
            <Link href={link}><Svg
                alt={alt}
                title={title}
                width={width}
                role="img"
            /></Link>
        </div>
    );
}

export default function Libraries() {
    return (
        <div className={[styles.libraries, styles.section_padding].join(' ')}>
            <div className={styles.libraries_heading}>
                <h2>Build Your Own Registry Client With Rich Libraries</h2>
            </div>
            <div className={styles.libraries_logos}>
                {LibraryList.map((props, idx) => (
                    <Logo key={idx} {...props} />
                ))}
            </div>
        </div>
    )
}