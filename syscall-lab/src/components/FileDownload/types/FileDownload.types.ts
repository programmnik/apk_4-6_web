export type FileType =
    | 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx'
    | 'ppt' | 'pptx' | 'zip' | 'rar' | '7z'
    | 'txt' | 'md' | 'json' | 'xml' | 'html'
    | 'css' | 'js' | 'ts' | 'png' | 'jpg'
    | 'jpeg' | 'gif' | 'svg' | 'mp4' | 'mp3'
    | 'unknown';

export interface FileDownloadProps {
    fileUrl: string;
    fileName?: string;
    fileType?: FileType;
    fileSize?: number;
    description?: string;
    showDownloadButton?: boolean;
}

export interface FileData {
    fileUrl: string;
    fileName?: string;
    fileType?: FileType;
    fileSize?: number;
    description?: string;
}