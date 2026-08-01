import React from 'react';
import { SkeletonLine } from './Loader.styles'

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            width: '100%',
            maxWidth: '1200px',
        }}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '16px',
                    padding: '24px',
                }}>
                    <SkeletonLine $width="40px" $height="20px" />
                    <SkeletonLine $width="80%" $height="24px" style={{ marginTop: '12px' }} />
                    <SkeletonLine $width="60%" $height="16px" style={{ marginTop: '8px' }} />
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                        <SkeletonLine $width="60px" $height="20px" />
                        <SkeletonLine $width="60px" $height="20px" />
                    </div>
                </div>
            ))}
        </div>
    );
};