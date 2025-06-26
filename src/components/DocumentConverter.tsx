
import React, { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useConversions } from '../hooks/useConversions';
import { Upload, Download, FileText, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DOCUMENT_FORMATS = {
  pdf: ['doc', 'docx', 'txt', 'rtf'],
  doc: ['pdf', 'docx', 'txt', 'rtf'],
  docx: ['pdf', 'doc', 'txt', 'rtf'],
  txt: ['pdf', 'doc', 'docx', 'rtf'],
  rtf: ['pdf', 'doc', 'docx', 'txt'],
  xls: ['pdf', 'xlsx', 'csv'],
  xlsx: ['pdf', 'xls', 'csv'],
  csv: ['pdf', 'xls', 'xlsx'],
  ppt: ['pdf', 'pptx'],
  pptx: ['pdf', 'ppt']
};

interface DocumentFile {
  id: string;
  originalFile: File;
  outputFormat: string;
  convertedBlob: Blob | null;
  isProcessing: boolean;
}

const DocumentConverter = () => {
  const { t } = useLanguage();
  const { conversionsUsed, conversionsLeft, canConvert, useConversion } = useConversions();
  
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getAvailableFormats = (inputFormat: string) => {
    return DOCUMENT_FORMATS[inputFormat as keyof typeof DOCUMENT_FORMATS] || [];
  };

  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit for documents
        toast({
          title: t('errorSizeDocument'),
          variant: "destructive",
        });
        return false;
      }

      const fileExtension = getFileExtension(file.name);
      if (!Object.keys(DOCUMENT_FORMATS).includes(fileExtension)) {
        toast({
          title: t('errorUnsupportedDocument'),
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    const newFiles: DocumentFile[] = validFiles.map(file => {
      const inputFormat = getFileExtension(file.name);
      const availableFormats = getAvailableFormats(inputFormat);
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        outputFormat: availableFormats[0] || 'pdf',
        convertedBlob: null,
        isProcessing: false
      };
    });

    setFiles(prev => [...prev, ...newFiles]);
  }, [t]);

  const convertFile = async (fileId: string) => {
    if (!canConvert) return;

    const canProceed = useConversion();
    if (!canProceed) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, isProcessing: true } : f
    ));

    try {
      // Simulate document conversion process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a mock converted file (in reality, this would use a proper conversion library)
      const file = files.find(f => f.id === fileId);
      if (file) {
        const mockContent = `Converted document from ${getFileExtension(file.originalFile.name)} to ${file.outputFormat}`;
        const blob = new Blob([mockContent], { type: 'application/octet-stream' });
        
        setFiles(prev => prev.map(f => 
          f.id === fileId ? {
            ...f,
            convertedBlob: blob,
            isProcessing: false
          } : f
        ));
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: t('errorGeneric'),
        variant: "destructive",
      });
      
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, isProcessing: false } : f
      ));
    }
  };

  const downloadFile = (file: DocumentFile) => {
    if (!file.convertedBlob) return;
    
    const url = URL.createObjectURL(file.convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.originalFile.name.split('.')[0]}_converted.${file.outputFormat}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const updateOutputFormat = (fileId: string, format: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, outputFormat: format, convertedBlob: null } : f
    ));
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
        onClick={() => document.getElementById('documentFileInput')?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-2">
          {t('dragDropDocuments')} <span className="text-blue-600 underline">{t('browse')}</span>
        </p>
        <p className="text-sm text-gray-500">
          PDF, DOC, DOCX, TXT, RTF, XLS, XLSX, CSV, PPT, PPTX (max 50MB per file)
        </p>
        <input
          id="documentFileInput"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx,.csv,.ppt,.pptx"
          multiple
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => {
            const inputFormat = getFileExtension(file.originalFile.name);
            const availableFormats = getAvailableFormats(inputFormat);
            
            return (
              <div key={file.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">{file.originalFile.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.originalFile.size)} • {inputFormat.toUpperCase()}
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
                
                {!file.convertedBlob && !file.isProcessing && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('selectOutputFormat')}
                    </label>
                    <select
                      value={file.outputFormat}
                      onChange={(e) => updateOutputFormat(file.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {availableFormats.map(format => (
                        <option key={format} value={format}>
                          {format.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {file.convertedBlob ? (
                      <div className="space-y-2">
                        <div className="text-sm text-green-600 font-medium">
                          ✅ {t('conversionComplete')}
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
                        onClick={() => convertFile(file.id)}
                        disabled={file.isProcessing || !canConvert}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {file.isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>{t('converting')}</span>
                          </>
                        ) : (
                          <span>{t('convertDocument')}</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentConverter;
