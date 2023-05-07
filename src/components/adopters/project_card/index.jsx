import React from "react";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from "./styles.module.css";

export default function ProjectCard(props) {
    return (
        <div className={styles.container}>
            <a
                target="_blank"
                href={props.link}
                className={styles.card}
                rel="noreferrer"
            >
                <div className={styles.cardWrapper}>
                    <div className={styles.header}>
                        <div className={styles.imageWrapper}>
                            <ThemedImage className={styles.image}
                                title={props.title}
                                sources={{
                                    light: useBaseUrl(`${props.light}`),
                                    dark: useBaseUrl(`${props.dark}`),
                                }}
                            />
                        </div>
                        <div className={styles.title}>{props.title}</div>
                    </div>
                    <div className={styles.content}>
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: props.description }}
                        />
                    </div>
                </div>
            </a>
        </div>
    );
};