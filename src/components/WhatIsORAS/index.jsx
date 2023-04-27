import React from 'react';
import styles from './styles.module.css';

export default function WhatIsORAS() {
    return (
        <div className={[styles.what_is_oras, styles.section_padding].join(' ')}>
            <div className={styles.what_is_oras_heading}>
                <h1>What is ORAS?</h1>
            </div>
            <div className={styles.what_is_oras_content}>
                <p> ORAS is the de facto tool for working with OCI Artifacts.
                    It treats media types as a critical piece of the puzzle.
                    Container images are never assumed to be the artifact in question.
                    ORAS provides CLI and client libraries to distribute artifacts across OCI-compliant registries.
                </p>
            </div>
            <div className={styles.what_is_oras_video}>
                <iframe
                    src="https://www.youtube.com/embed/BpKF_0M37-0"
                    title="Distributing Supply Chain Artifacts with OCI & ORAS Artifacts - Steve Lasker, Microsoft"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    );
}