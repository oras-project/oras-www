import React from 'react';
import styles from './styles.module.css';

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
];

function Logo({ title, alt, Svg, width, link }) {
    return (
        <div className={styles.ind_logo}>
            <a href={link}><Svg
                alt={alt}
                title={title}
                width={width}
                role="img"
            /></a>
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