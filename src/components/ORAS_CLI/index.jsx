import React from 'react';
import styles from './styles.module.css';
import TerminalWindow from '../TerminalWindow';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

const os = [
    {
        label: 'Linux',
        value: 'linux',
        content: 'VERSION=\"1.0.0\"\ncurl -LO \"https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_linux_amd64.tar.gz\"\nmkdir -p oras-install/\ntar -zxf oras_${VERSION}_*.tar.gz -C oras-install/\nsudo mv oras-install/oras /usr/local/bin/\nrm -rf oras_${VERSION}_*.tar.gz oras-install/',
    },
    {
        label: 'MacOS',
        value: 'macos',
        content: 'VERSION=\"1.0.0\"\ncurl -LO \"https://github.com/oras-project/oras/releases/download/v${VERSION}/oras_${VERSION}_darwin_arm64.tar.gz\"\nmkdir -p oras-install/\ntar -zxf oras_${VERSION}_*.tar.gz -C oras-install/\nsudo mv oras-install/oras /usr/local/bin/\nrm -rf oras_${VERSION}_*.tar.gz oras-install/',
    },
    {
        label: 'MacOS (Homebrew)',
        value: 'macosbrew',
        content: 'brew install oras',
    },
    {
        label: 'Windows',
        value: 'windows',
        content: 'set VERSION=\"1.0.0\"\ncurl.exe -sLO \"https://github.com/oras-project/oras/releases/download/v%VERSION%/oras_%VERSION%_windows_amd64.zip\"\ntar.exe -xvzf oras_%VERSION%_windows_amd64.zip\nmkdir -p %USERPROFILE%\\bin\\\ncopy oras.exe %USERPROFILE%\\bin\\\nset PATH=%USERPROFILE%\\bin\\;%PATH%',
    },
];

export default function ORASCLI() {
    return (
        <div className={[styles.orascli, styles.section_padding].join(' ')}>
            <div className={styles.orascli_content}>
                <h1>ORAS CLI</h1>
                <p>The simplest way to install ORAS with one line cmd is to use <code>brew install oras</code>. See all <a href="/docs/CLI/installation">installation methods</a>.</p>
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