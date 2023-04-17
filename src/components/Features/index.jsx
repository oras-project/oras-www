import React from 'react';
import styles from './styles.module.css';

const features = [
    {
        title: 'Artifact Reference',
        content: (
            <>
                Able to attach supply chain artifacts to container images and show the artifact reference relationship.
            </>
        ),
    },
    {
        title: 'Distributed Software Artifacts',
        content: (
            <>
                Pull, push, and move any software artifacts across cloud and on-prem OCI registries.
            </>
        ),
    },
    {
        title: 'Manage Registry and Repository',
        content: (
            <>
                Able to manage tags, repositories in OCI registry with fine-grained capabilities.
            </>
        ),
    },
];

export default function Features() {
    return (
        <div className={[styles.features, styles.section_padding].join(' ')}>
            <div className={styles.features_oras}>
                <h1>Features of ORAS</h1>
            </div>
            {features.map(({ title, content }, index) => (
                <div className={styles.feature_card} key={index}>
                    <div />
                    <h3>{title}</h3>
                    <p className={styles.info}>{content}</p>
                </div>
            ))}
        </div>
    );
}
