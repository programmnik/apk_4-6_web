import React from 'react';
import {
  Download, File, FilePdf, FileImage,
  FileCode, FileText,
} from 'phosphor-react';
import {
  Container, FileIcon, FileInfo, FileName,
  FileMeta, FileDescription, DownloadButton,
} from './FileDownload.styles';
import type { FileDownloadProps, FileType } from './types/FileDownload.types';
import {
  getFileColor, getFileTypeFromExtension,
  getFileNameFromUrl, formatFileSize,
} from './utils/FileDownload.utils';

// Маппинг типов файлов на иконки
const FILE_ICONS: Record<FileType, React.ReactNode> = {
  pdf: <FilePdf size={28} weight="fill" />,
  doc: <FileText size={28} weight="fill" />,
  docx: <FileText size={28} weight="fill" />,
  xls: <FileText size={28} weight="fill" />,
  xlsx: <FileText size={28} weight="fill" />,
  ppt: <FileText size={28} weight="fill" />,
  pptx: <FileText size={28} weight="fill" />,
  zip: <File size={28} weight="fill" />,
  rar: <File size={28} weight="fill" />,
  '7z': <File size={28} weight="fill" />,
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

const getFileIcon = (type?: FileType): React.ReactNode => {
  return FILE_ICONS[type || 'unknown'] || FILE_ICONS.unknown;
};

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