import type { FileType } from '../types/FileDownload.types';

// Цвета для типов файлов
const FILE_COLORS: Record<FileType, string> = {
    pdf: '#e74c3c',
    doc: '#2b5797',
    docx: '#2b5797',
    xls: '#217346',
    xlsx: '#217346',
    ppt: '#d24726',
    pptx: '#d24726',
    zip: '#f39c12',
    rar: '#f39c12',
    '7z': '#f39c12',
    txt: '#6c757d',
    md: '#6c757d',
    json: '#f7df1e',
    xml: '#f7df1e',
    html: '#e34c26',
    css: '#264de4',
    js: '#f7df1e',
    ts: '#3178c6',
    png: '#1e8bc3',
    jpg: '#1e8bc3',
    jpeg: '#1e8bc3',
    gif: '#1e8bc3',
    svg: '#1e8bc3',
    mp4: '#e91e63',
    mp3: '#e91e63',
    unknown: '#6c757d',
};

// Маппинг типов файлов на расширения
const EXTENSION_TO_TYPE: Record<string, FileType> = {
    pdf: 'pdf',
    doc: 'doc',
    docx: 'docx',
    xls: 'xls',
    xlsx: 'xlsx',
    ppt: 'ppt',
    pptx: 'pptx',
    zip: 'zip',
    rar: 'rar',
    '7z': '7z',
    txt: 'txt',
    md: 'md',
    json: 'json',
    xml: 'xml',
    html: 'html',
    css: 'css',
    js: 'js',
    ts: 'ts',
    png: 'png',
    jpg: 'jpg',
    jpeg: 'jpeg',
    gif: 'gif',
    svg: 'svg',
    mp4: 'mp4',
    mp3: 'mp3',
};

export const getFileColor = (type?: FileType): string => {
    return FILE_COLORS[type || 'unknown'] || FILE_COLORS.unknown;
};

export const getFileTypeFromExtension = (filename: string): FileType => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    return EXTENSION_TO_TYPE[ext] || 'unknown';
};

export const getFileNameFromUrl = (url: string): string => {
    try {
        const cleanUrl = url.split('?')[0];
        const parts = cleanUrl.split('/');
        return parts[parts.length - 1] || 'file';
    } catch {
        return 'file';
    }
};

export const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '—';

    const units = ['Б', 'КБ', 'МБ', 'ГБ'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
};