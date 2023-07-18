import React from 'react';
import Layout from '@theme/Layout';
import data from '@site/static/adopters/data.js';
import ProjectCard from '../../components/adopters/project_card';
import RegistryCard from '../../components/adopters/registry_card';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Adopters() {

    const ProjectCards = data.projects.map((item, index) => {

        return (
            <ProjectCard
                key={index}
                title={item.title}
                light={item.light}
                dark={item.dark}
                description={item.description}
                link={item.link}
            />
        )
    })

    const RegistryCards = data.registries.map((item, index) => {

        return (
            <RegistryCard
                key={index}
                title={item.title}
                light={item.light}
                dark={item.dark}
                description={item.description}
                link={item.link}
            />
        )
    })

    return (
        <Layout
            title="ORAS Adopters"
            description="A list of projects leveraging ORAS, as well as registries that are known to support OCI Artifacts.">
            <main>
                <div className={[styles.header, styles.section_padding].join(' ')}>
                    <div className={styles.header_content}>
                        <h1>Adopters</h1>
                        <h3>This page contains a list of projects leveraging ORAS, as well as registries that are known to support OCI Artifacts.</h3>
                    </div>
                </div>
                <div>
                    <div className={[styles.projects_oras, styles.section_padding].join(' ')}>
                        <h1>Projects using ORAS</h1>
                    </div>
                    <div className={styles.projectcards}>
                        {ProjectCards}
                    </div>
                </div>
                <div>
                    <div className={[styles.regsitries_oras, styles.section_padding].join(' ')}>
                        <h1>Registries supporting OCI Artifacts</h1>
                    </div>
                    <div className={styles.registrycards}>
                        {RegistryCards}
                    </div>
                </div>
                <div className={[styles.adopters_issue, styles.section_padding].join(' ')}>
                    <div className={styles.adopters_heading}>
                        <h4>Would like your registries and/or projects listed here? Please submit an issue. We're happy to promote all usage, as well as provide feedback.</h4>
                    </div>
                    <div className={styles.adopters_submit_issue}>
                        <Link class="button button--secondary button--lg" target='_blank' href="https://github.com/oras-project/oras-www/issues/new?assignees=&labels=adopter&template=submit_adopter.yml&title=%5BAdd+adopter%5D%3A">Submit an issue</Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}