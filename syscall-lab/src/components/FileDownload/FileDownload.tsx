// src/components/FileDownload/FileDownload.tsx
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  Download,
  File,
  FilePdf,
  FileImage,
  FileCode,
  FileText,
} from 'phosphor-react';

export type FileType = 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'zip' | 'rar' | '7z' | 'txt' | 'md' | 'json' | 'xml' | 'html' | 'css' | 'js' | 'ts' | 'png' | 'jpg' | 'jpeg' | 'gif' | 'svg' | 'mp4' | 'mp3' | 'unknown';

export interface FileDownloadProps {
  /** URL файла для скачивания */
  fileUrl: string;
  /** Имя файла (опционально, будет взято из URL) */
  fileName?: string;
  /** Тип файла (опционально, будет определен автоматически) */
  fileType?: FileType;
  /** Размер файла в байтах (опционально) */
  fileSize?: number;
  /** Дополнительное описание (опционально) */
  description?: string;
  /** Показывать ли кнопку скачивания */
  showDownloadButton?: boolean;
}

// ============ СТИЛИ ============

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.cardBg || '#f8f9fa'};
  border: 1px solid ${({ theme }) => theme.cardBorder || '#e9ecef'};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: default;
  width: 100%; /* Добавлено */
  box-sizing: border-box; /* Добавлено */

  &:hover {
    border-color: ${({ theme }) => theme.accent || '#007bff'};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 12px 16px;
  }
`;

const FileIcon = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${({ $color }) => $color || '#e9ecef'};
  color: #fff;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text || '#212529'};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const FileMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary || '#6c757d'};

  @media (max-width: 768px) {
    font-size: 12px;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

const FileDescription = styled.span`
  color: ${({ theme }) => theme.textSecondary || '#6c757d'};
  font-size: 13px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: ${({ theme }) => theme.accent || '#007bff'};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.accentHover || '#0056b3'};
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 6px 14px;
    font-size: 13px;
    width: 100%;
    justify-content: center;
  }
`;

// ============ ПОМОЩНИКИ ============

// Определяем цвет иконки по типу файла
const getFileColor = (type?: FileType): string => {
  const colors: Record<FileType, string> = {
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
  return colors[type || 'unknown'] || colors.unknown;
};

// Получаем иконку по типу файла
const getFileIcon = (type?: FileType) => {
  const icons: Record<FileType, React.ReactNode> = {
    pdf: <FilePdf size={28} weight="fill" />,
    doc: <FileText size={28} weight="fill" />,
    docx: <FileText size={28} weight="fill" />,
    xls: <FileText size={28} weight="fill" />,
    xlsx: <FileText size={28} weight="fill" />,
    ppt: <FileText size={28} weight="fill" />,
    pptx: <FileText size={28} weight="fill" />,
    zip: <File size={28} weight="fill" />,      // Вместо FileArchive
    rar: <File size={28} weight="fill" />,      // Вместо FileArchive
    '7z': <File size={28} weight="fill" />,     // Вместо FileArchive
    txt: <FileText size={28} weight="fill" />,
    md: <FileCode size={28} weight="fill" />,
    json: <FileCode size={28} weight="fill" />,
    xml: <FileCode size={28} weight="fill" />,
    html: <FileCode size={28} weight="fill" />,
    css: <FileCode size={28} weight="fill" />,
    js: <FileCode size={28} weight="fill" />,
    ts: <FileCode size={28} weight="fill" />,
    png: <FileImage size={28} weight="fill" />,
    jpg: <FileImage size={28} weight="fill" />,
    jpeg: <FileImage size={28} weight="fill" />,
    gif: <FileImage size={28} weight="fill" />,
    svg: <FileImage size={28} weight="fill" />,
    mp4: <File size={28} weight="fill" />,
    mp3: <File size={28} weight="fill" />,
    unknown: <File size={28} weight="fill" />,
  };
  return icons[type || 'unknown'] || icons.unknown;
};

// Определяем тип файла по расширению
const getFileTypeFromExtension = (filename: string): FileType => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const types: Record<string, FileType> = {
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
  return types[ext] || 'unknown';
};

// Получаем имя файла из URL
const getFileNameFromUrl = (url: string): string => {
  try {
    const cleanUrl = url.split('?')[0];
    const parts = cleanUrl.split('/');
    return parts[parts.length - 1] || 'file';
  } catch {
    return 'file';
  }
};

// Форматирование размера файла
const formatFileSize = (bytes?: number): string => {
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

// ============ КОМПОНЕНТ ============

export const FileDownload: React.FC<FileDownloadProps> = ({
  fileUrl,
  fileName: customFileName,
  fileType: customFileType,
  fileSize,
  description,
  showDownloadButton = true,
}) => {
  const fileName = customFileName || getFileNameFromUrl(fileUrl);
  const detectedType = customFileType || getFileTypeFromExtension(fileName);
  const color = getFileColor(detectedType);
  const icon = getFileIcon(detectedType);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <FileIcon $color={color}>{icon}</FileIcon>

      <FileInfo>
        <FileName title={fileName}>{fileName}</FileName>
        <FileMeta>
          {description && <FileDescription>{description}</FileDescription>}
          <span>• {formatFileSize(fileSize)}</span>
          <span>• {detectedType.toUpperCase()}</span>
        </FileMeta>
      </FileInfo>

      {showDownloadButton && (
        <DownloadButton href={fileUrl} onClick={handleDownload}>
          <Download size={18} weight="bold" />
          Скачать
        </DownloadButton>
      )}
    </Container>
  );
};

// ============ ХУК ============

export const useFileDownload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileData, setFileData] = useState<{
    fileUrl: string;
    fileName?: string;
    fileType?: FileType;
    fileSize?: number;
    description?: string;
  } | null>(null);

  const open = useCallback((data: {
    fileUrl: string;
    fileName?: string;
    fileType?: FileType;
    fileSize?: number;
    description?: string;
  }) => {
    setFileData(data);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ModalComponent = useCallback(() => {
    if (!fileData) return null;
    return (
      <FileDownload
        fileUrl={fileData.fileUrl}
        fileName={fileData.fileName}
        fileType={fileData.fileType}
        fileSize={fileData.fileSize}
        description={fileData.description}
      />
    );
  }, [fileData]);

  return {
    open,
    close,
    isOpen,
    ModalComponent,
  };
};