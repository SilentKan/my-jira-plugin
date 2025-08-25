import React from 'react';

export default function WrmBootstrapPage({ bootstrap }: { bootstrap: any }) {
    return (
        <div style={{ maxWidth: 960, marginTop: 32 }}>
            <h3>WRM Bootstrap (без REST)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 8 }}>
                <strong>message:</strong> <span>{bootstrap?.message ?? '—'}</span>
                <strong>user:</strong> <span>{bootstrap?.user ?? '—'}</span>
            </div>
            <pre style={{ marginTop: 16, background: '#F4F5F7', padding: 12, borderRadius: 8, overflow: 'auto' }}>
        {JSON.stringify(bootstrap, null, 2)}
      </pre>
        </div>
    );
}
