import React from 'react';
import styles from './styles.module.css';
import LinkCard from './community_links';

export default function Community() {
    return (
        <div className={[styles.community, styles.section_padding].join(' ')}>
            <div className={styles.join_community}>
                <h1>Join the Community</h1>
                <p>Join the ever-growing ORAS community for updates, support, and collaboration.</p>
            </div>
            <div className={styles.community_links}>
                <div className={styles.links}>
                    <LinkCard link="https://cloud-native.slack.com/archives/CJ1KHJM5Z" title="Slack" light="img/community_links/slack.svg" dark="img/community_links/slack.svg" />
                    <LinkCard link="https://github.com/oras-project" title="GitHub" light="img/community_links/github_light.svg" dark="img/community_links/github_dark.svg" />
                    <LinkCard link="https://twitter.com/orasproject" title="Twitter" light="img/community_links/twitter.svg" dark="img/community_links/twitter.svg" />
                </div>
                <div className={styles.add_to_calendar}>
                    <div className={styles.calendar_heading}>
                        <h2>ORAS Community Call</h2>
                        <h4>Biweekly Tuesday of every month | 5:00 PM PDT</h4>
                    </div>
                    <div className={styles.calendar_link}>
                        <a class="button button--secondary button--lg" target='_blank' href="https://hackmd.io/P-O6n222TcSMoJgHmTTduw">Add to Calendar</a>
                    </div>
                </div>
            </div>
        </div>
    );
}