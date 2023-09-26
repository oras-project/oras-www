import React from 'react';
import styles from './styles.module.css';
import TerminalWindow from '../TerminalWindow';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

const os = [
    {
        label: 'macOS',
        value: 'macosbrew',
        content: 'brew install oras',
    },
    {
        label: 'Windows',
        value: 'windows',
        content: 'winget install oras',
    },
    {
        label: 'Linux',
        value: 'linux',
        content: 'VERSION=\"1.1.0\"\ncurl -LO \"https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_linux_amd64.tar.gz\"\nmkdir -p oras-install/\ntar -zxf oras_${VERSION}_*.tar.gz -C oras-install/\nsudo mv oras-install/oras /usr/local/bin/\nrm -rf oras_${VERSION}_*.tar.gz oras-install/',
    },
];

export default function ORASCLI() {
    return (
        <div className={[styles.orascli, styles.section_padding].join(' ')}>
            <div className={styles.orascli_content}>
                <h1>Install ORAS CLI in seconds</h1>
                <p>You can install ORAS CLI on different systems or set up in GitHub Actions in just a few seconds. See more <Link href="/docs/installation">installation methods</Link>.</p>
            </div>
            <div className={styles.orascli_cli}>
                <TerminalWindow>
                    <Tabs className={styles.orascli_cli_font}>
                        {os.map(({ label, value, content }, index) => (
                            <TabItem key={index} className={styles.orascli_cli_font} value={value} label={label}>
                                <CodeBlock>
                                    {content}
                                </CodeBlock>
                            </TabItem>
                        ))}
                    </Tabs>
                </TerminalWindow>
            </div>
        </div>
    );
}