import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, X, Type as TypeIcon } from 'lucide-react';
import { InputData } from '../types';

interface InputSectionProps {
  label: string;
  placeholder: string;
  value: InputData | null;
  onChange: (data: InputData | null) => void;
}

type InputMode = 'file' | 'text';

const InputSection: React.FC<InputSectionProps> = ({ label, placeholder, value, onChange }) => {
  const [mode, setMode] = useState<InputMode>(value?.type === 'text' ? 'text' : 'file');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    if (!file) return;
    
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.txt')) {
      alert("Please upload a PDF or TXT file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64 = result.split(',')[1];
      onChange({
        type: 'file',
        content: base64,
        mimeType: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'text/plain'),
        fileName: file.name
      });
      setMode('file');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const clearInput = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleModeSwitch = (newMode: InputMode) => {
    if (mode !== newMode) {
      setMode(newMode);
      if (value && value.type !== newMode) {
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between ml-1">
        <label className="text-sm font-semibold text-zinc-200">{label}</label>
      </div>

      <div className="bg-surfaceHighlight/30 rounded-2xl border border-white/5 overflow-hidden flex flex-col transition-all">
        
        {/* Tab Switcher */}
        <div className="flex p-1 bg-black/20 border-b border-white/5">
          <button
            onClick={() => handleModeSwitch('file')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-xl transition-all ${
              mode === 'file' ? 'bg-surfaceHighlight text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <UploadCloud size={14} />
            Upload PDF
          </button>
          <button
            onClick={() => handleModeSwitch('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-xl transition-all ${
              mode === 'text' ? 'bg-surfaceHighlight text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <TypeIcon size={14} />
            Enter Text
          </button>
        </div>

        {/* Input Areas based on mode */}
        <div className="relative">
          {mode === 'file' && value?.type === 'file' ? (
            <div className="p-4 bg-primary/10 flex items-start justify-between group min-h-[160px]">
              <div className="flex items-center gap-3 overflow-hidden mt-8 w-full justify-center">
                <div className="p-3 bg-primary/20 rounded-xl text-primary shrink-0">
                  <FileText size={24} />
                </div>
                <div className="flex flex-col overflow-hidden max-w-[200px]">
                  <span className="text-sm font-medium text-zinc-200 truncate" title={value.fileName}>
                    {value.fileName}
                  </span>
                  <span className="text-xs text-primary/70">
                    PDF Document Attached
                  </span>
                </div>
              </div>
              <button 
                onClick={clearInput}
                className="absolute top-3 right-3 p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                title="Remove File"
              >
                <X size={18} />
              </button>
            </div>
          ) : mode === 'file' ? (
            <div 
              className={`relative flex flex-col items-center justify-center min-h-[160px] p-6 transition-colors duration-200 cursor-pointer ${
                isDragging ? 'bg-primary/5' : 'hover:bg-white/[0.02]'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={`p-4 rounded-full mb-3 transition-colors ${isDragging ? 'bg-primary/20 text-primary' : 'bg-surfaceHighlight text-zinc-400'}`}>
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-medium text-zinc-300 text-center">
                {isDragging ? 'Drop file to upload' : 'Click or drag PDF here'}
              </p>
              <p className="text-xs text-zinc-500 mt-1 text-center">Supports .pdf, .txt</p>
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.txt"
                className="hidden" 
              />
            </div>
          ) : (
            <div className="relative flex flex-col">
              <textarea
                className="w-full min-h-[160px] p-4 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 resize-none outline-none focus:bg-white/[0.02] transition-colors"
                placeholder={placeholder}
                value={value?.type === 'text' ? value.content : ''}
                onChange={(e) => onChange({ type: 'text', content: e.target.value })}
              />
              {value?.type === 'text' && value.content.length > 0 && (
                <button
                  onClick={clearInput}
                  className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors"
                  title="Clear Text"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}
          
          {/* Overlay for drag state when in text mode but user drags a file anyway */}
          {mode === 'text' && isDragging && (
            <div 
              className="absolute inset-0 bg-background/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center pointer-events-none border-2 border-primary/50 border-dashed m-2 rounded-xl"
            >
              <UploadCloud size={32} className="text-primary mb-2 animate-bounce" />
              <p className="text-primary font-semibold">Drop to switch to file</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputSection;
