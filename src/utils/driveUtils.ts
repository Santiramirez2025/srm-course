export const openDriveFile = (url: string): void => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  export const getDriveFileId = (url: string): string | null => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };
  
  export const getEmbedUrl = (driveUrl: string): string | null => {
    const fileId = getDriveFileId(driveUrl);
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
  };
  
  export const isValidDriveUrl = (url: string): boolean => {
    return url.includes('drive.google.com') && getDriveFileId(url) !== null;
  };
  
  export const getYouTubeEmbedUrl = (url: string): string | null => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };