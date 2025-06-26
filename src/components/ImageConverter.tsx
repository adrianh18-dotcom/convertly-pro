
import React, { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useConversions } from '../hooks/useConversions';
import { Upload, Download, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico'];
const OUTPUT_FORMATS = ['jpg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico'];

const ImageConverter = () => {
  const { t } = useLanguage();
  const { conversionsUsed, conversionsLeft, canConvert, useConversion } = useConversions();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const resetConverter = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setIsConverting(false);
  };

  const handleFileSelect = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: t('errorSize'),
        variant: "destructive",
      });
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!SUPPORTED_FORMATS.includes(fileExtension || '')) {
      toast({
        title: t('errorUnsupported'),
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setConvertedUrl(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const convertImage = async () => {
    if (!selectedFile || !canConvert) return;

    const canProceed = useConversion();
    if (!canProceed) return;

    setIsConverting(true);

    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const quality = outputFormat === 'jpg' ? 0.9 : undefined;
        const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : `image/${outputFormat}`;
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
          }
          setIsConverting(false);
        }, mimeType, quality);
      };
      
      img.src = previewUrl!;
      
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: t('errorGeneric'),
        variant: "destructive",
      });
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedUrl || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `${selectedFile.name.split('.')[0]}_converted.${outputFormat}`;
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Usage Counter */}
      <div className="mb-6 text-center">
        <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          {t('conversionsLeft').replace('{count}', conversionsLeft.toString())}
        </span>
      </div>

      {/* Upload Area */}
      {!selectedFile && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            {t('dragDrop')} <span className="text-blue-600 underline">{t('browse')}</span>
          </p>
          <p className="text-sm text-gray-500">
            JPG, PNG, GIF, BMP, TIFF, WEBP, SVG, ICO (max 10MB)
          </p>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </div>
      )}

      {/* Preview and Conversion */}
      {selectedFile && (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                {selectedFile.name}
              </h3>
              <button
                onClick={resetConverter}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {t('newConversion')}
              </button>
            </div>
            
            {previewUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-64 object-contain rounded-lg shadow-sm"
                />
              </div>
            )}
            
            <div className="text-sm text-gray-500 text-center">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>

          {/* Format Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('selectFormat')}
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {OUTPUT_FORMATS.map(format => (
                <option key={format} value={format}>
                  {format.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          {!convertedUrl && (
            <button
              onClick={convertImage}
              disabled={isConverting || !canConvert}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{t('converting')}</span>
                </>
              ) : (
                <span>{t('convert')}</span>
              )}
            </button>
          )}

          {/* Download Button */}
          {convertedUrl && (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg font-medium">
                ✅ Conversion complete!
              </div>
              <button
                onClick={downloadImage}
                className="bg-green-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Download className="w-5 h-5" />
                <span>{t('download')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
