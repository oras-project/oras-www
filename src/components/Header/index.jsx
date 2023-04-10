import React from 'react';
import ORAScubes from '@site/static/img/oras_cubes.svg';
import styles from './styles.module.css';

export default function Header() {
    return (
        <div className={[styles.header, styles.section_padding].join(' ')}>
            <div className={styles.header_content}>
                <h1>ORAS</h1>
                <h3>Distribute Artifacts Across OCI Registries With Ease</h3>
                <div className={styles.header_content_input}>
                    <a class="button button--secondary button--lg" href="/docs/intro">Get Started</a>
                </div>
            </div>
            <div className={styles.header_image}>
                <ORAScubes title="ORAS Cubes" width="100%" />
            </div>
        </div>
    );
}