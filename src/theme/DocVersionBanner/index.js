import React from 'react';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';

export default function DocVersionBanner() {
  const { activeVersion } = useActiveDocContext();
  if (!activeVersion) {
    return null;
  }

  if (activeVersion.label === '1.3.0-beta') {
    return (
      <div style={{ background: '#FFF4DB', padding: '10px', borderRadius: '5px' }}>
        <strong>This is documentation for OCI Registry As Storage <b>1.3.0-beta</b>, which is in a preview status.</strong>
        <br />
        For a stable release documentation, see the <a href="/docs">latest version (1.2)</a>.
      </div>
    );
  }
  return null;
}
