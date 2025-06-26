
import React, { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useConversions } from '../hooks/useConversions';
import { Upload, Download, Image as ImageIcon, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];
const QUALITY_LEVELS = {
  high: { value: 0.9, label: 'High Quality (90%)' },
  medium: { value: 0.7, label: 'Medium Quality (70%)' },
  low: { value: 0.5, label: 'Low Quality (50%)' }
};

interface CompressedFile {
  id: string;
  originalFile: File;
  compressedBlob: Blob | null;
  compressionRatio: number;
  originalSize: number;
  compressedSize: number;
  previewUrl: string;
  isProcessing: boolean;
}

const ImageCompressor = () => {
  const { t } = useLanguage();
  const { conversionsUsed, conversionsLeft, canConvert, useConversion } = useConversions();
  
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState<keyof typeof QUALITY_LEVELS>('medium');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: t('errorSize'),
          variant: "destructive",
        });
        return false;
      }

      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!SUPPORTED_FORMATS.includes(fileExtension || '')) {
        toast({
          title: t('errorUnsupported'),
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    const newFiles: CompressedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      compressedBlob: null,
      compressionRatio: 0,
      originalSize: file.size,
      compressedSize: 0,
      previewUrl: URL.createObjectURL(file),
      isProcessing: false
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, [t]);

  const compressFile = async (fileId: string) => {
    if (!canConvert) return;

    const canProceed = useConversion();
    if (!canProceed) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, isProcessing: true } : f
    ));

    try {
      const fileIndex = files.findIndex(f => f.id === fileId);
      const file = files[fileIndex];
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const qualityValue = QUALITY_LEVELS[quality].value;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressionRatio = Math.round((1 - blob.size / file.originalSize) * 100);
            
            setFiles(prev => prev.map(f => 
              f.id === fileId ? {
                ...f,
                compressedBlob: blob,
                compressedSize: blob.size,
                compressionRatio,
                isProcessing: false
              } : f
            ));
          }
        }, 'image/jpeg', qualityValue);
      };
      
      img.src = file.previewUrl;
      
    } catch (error) {
      console.error('Compression error:', error);
      toast({
        title: t('errorGeneric'),
        variant: "destructive",
      });
      
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, isProcessing: false } : f
      ));
    }
  };

  const downloadFile = (file: CompressedFile) => {
    if (!file.compressedBlob) return;
    
    const url = URL.createObjectURL(file.compressedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.originalFile.name.split('.')[0]}_compressed.jpg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Usage Counter */}
      <div className="mb-6 text-center">
        <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          {t('conversionsLeft').replace('{count}', conversionsLeft.toString())}
        </span>
      </div>

      {/* Quality Selection */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('compressionQuality')}
        </label>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(QUALITY_LEVELS).map(([key, level]) => (
            <button
              key={key}
              onClick={() => setQuality(key as keyof typeof QUALITY_LEVELS)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                quality === key 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{level.label.split(' ')[0]}</div>
              <div className="text-sm text-gray-500">{level.label.split(' ').slice(1).join(' ')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer mb-6 ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
        onClick={() => document.getElementById('compressFileInput')?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-2">
          {t('dragDrop')} <span className="text-blue-600 underline">{t('browse')}</span>
        </p>
        <p className="text-sm text-gray-500">
          JPG, PNG, WEBP (max 10MB per file)
        </p>
        <input
          id="compressFileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{file.originalFile.name}</h3>
                    <p className="text-sm text-gray-500">
                      {t('originalSize')}: {formatFileSize(file.originalSize)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {file.compressedBlob ? (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">
                          {t('compressed')}: {formatFileSize(file.compressedSize)}
                        </span>
                        <span className="ml-2 text-gray-500">
                          ({t('reduced')} {file.compressionRatio}%)
                        </span>
                      </div>
                      <button
                        onClick={() => downloadFile(file)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t('download')}</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => compressFile(file.id)}
                      disabled={file.isProcessing || !canConvert}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {file.isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{t('compressing')}</span>
                        </>
                      ) : (
                        <span>{t('compress')}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
