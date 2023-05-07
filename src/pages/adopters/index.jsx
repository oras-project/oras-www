import React from 'react';
import Layout from '@theme/Layout';
import { projects, registries, regsitries } from './data'
import ProjectCard from '../../components/adopters/project_card';
import RegistryCard from '../../components/adopters/registry_card';
import styles from './styles.module.css';

export default function Adopters() {

    const ProjectCards = projects.map((item, index) => {

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

    const RegistryCards = registries.map((item, index) => {

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
                    <div className={styles.projects_oras}>
                        <h1>Projects using ORAS</h1>
                    </div>
                    <div className={styles.projectcards}>
                        {ProjectCards}
                    </div>
                </div>
                <div>
                    <div className={styles.regsitries_oras}>
                        <h1>Registries supporting OCI Artifacts</h1>
                    </div>
                    <div className={styles.registrycards}>
                        {RegistryCards}
                    </div>
                </div>
            </main>
        </Layout>
    );
}