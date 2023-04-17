import React from 'react';
import styles from './styles.module.css';

const features = [
    {
        title: 'Artifact Reference',
        content: [
            "Attach supply chain artifacts to container images.",
            "Discover and show the artifact reference relations.",
            "Extend the registries not just for storing container images.",
        ],
    },
    {
        title: 'Distributed Software Artifacts',
        content: [
            "Manage artifacts in OCI registries.",
            "Migrate artifacts across registries.",
            "Manage artifacts in file system through OCI image layout.",
        ],
    },
    {
        title: 'Explore and Manage OCI Image',
        content: [
            "Manage image manifest and layer in an OCI registry.",
            "Operate tag and repository in an OCI registry.",
            "Explore the detailed content of an OCI image.",
        ],
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

                    <ul className={styles.list}>
                        {content.map((use, index) => (
                            <li key={index} className={styles.listItem}>
                                {use}
                            </li>
                        ))}
                    </ul>

                </div>
            ))}
        </div>
    );
}
