import React from "react";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from "./styles.module.css";

export default function Card(props) {
    return (
        <div className={styles.container}>
            <a
                target="_blank"
                href={props.link}
                className={styles.card}
                rel="noreferrer"
            >
                <div className={styles.cardWrapper}>
                    <div className={styles.imageWrapper}>
                        <ThemedImage className={styles.image}
                            title={props.title}
                            sources={{
                                light: useBaseUrl(`${props.light}`),
                                dark: useBaseUrl(`${props.dark}`),
                            }}
                        />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h4>
                                {props.title}
                            </h4>
                        </div>
                        <div>
                            <p className={styles.description} dangerouslySetInnerHTML={{ __html: props.description }} />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};