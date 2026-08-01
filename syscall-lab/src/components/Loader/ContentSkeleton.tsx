import React from 'react';
import { SkeletonLine, SkeletonContainer } from './Loader.styles'

interface ContentSkeletonProps {
    /** Количество блоков */
    lines?: number;
    /** Список для отображения */
    withList?: boolean;
}

export const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
    lines = 5,
    withList = false
}) => {
    return (
        <div style={{ padding: '100px 24px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SkeletonContainer>
                {/* Заголовок */}
                <SkeletonLine $width="60%" $height="28px" />
                <SkeletonLine $width="80%" $height="16px" />

                {/* Основные строки */}
                {Array.from({ length: lines }).map((_, i) => (
                    <SkeletonLine
                        key={i}
                        $width={i === lines - 1 ? '70%' : '100%'}
                    />
                ))}

                {/* Список */}
                {withList && (
                    <>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} style={{ display: 'flex', gap: '12px', paddingLeft: '24px' }}>
                                <div style={{ width: '8px', height: '8px', marginTop: '8px', flexShrink: 0 }}>
                                    <SkeletonLine $width="8px" $height="8px" />
                                </div>
                                <SkeletonLine $width={i === 0 ? '90%' : i === 1 ? '85%' : i === 2 ? '95%' : '80%'} />
                            </div>
                        ))}
                    </>
                )}
            </SkeletonContainer>
        </div>
    );
};