import React from 'react';
import styles from './styles.module.css';

function TerminalWindow({ children, minHeight, style, bodyStyle }) {
    return (
        <div className={styles.terminalWindow} style={{ ...style, minHeight }}>
            <div className={styles.terminalWindowHeader}>
                <div className={styles.buttons}>
                    <span className={styles.dot} style={{ background: '#f25f58' }} />
                    <span className={styles.dot} style={{ background: '#fbbe3c' }} />
                    <span className={styles.dot} style={{ background: '#58cb42' }} />
                </div>
                <div className={styles.terminalWindowMenuIcon}>
                    <div>
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                    </div>
                </div>
            </div>

            <div className={styles.terminalWindowBody} style={bodyStyle}>
                {children}
            </div>
        </div>
    );
}

export default TerminalWindow;