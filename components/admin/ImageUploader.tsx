'use client';

import { Upload, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface ImageUploaderProps {
  productId: string;
  productName: string;
  currentImages: string[];
  onImagesUpdate: (newImages: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  productId,
  productName,
  currentImages,
  onImagesUpdate,
  maxImages = 5
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Validar se não excede o limite
    if (currentImages.length + files.length > maxImages) {
      setError(`Máximo de ${maxImages} imagens permitidas por produto`);
      return;
    }

    // Validar tipos de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError('Apenas arquivos JPG, PNG e WEBP são permitidos');
      return;
    }

    // Validar tamanho dos arquivos (max 5MB cada)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError('Cada imagem deve ter no máximo 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);
    
    try {
      const uploadedUrls: string[] = [];
      
      for (const file of files) {
        const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const fileName = `${productId}/${fileId}.${file.name.split('.').pop()}`;
        
        // Simular progresso
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Upload para o Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Erro no upload:', uploadError);
          setError(`Erro ao fazer upload de ${file.name}: ${uploadError.message}`);
          continue;
        }

        // Obter URL pública
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        if (urlData.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        }
      }

      if (uploadedUrls.length > 0) {
        const newImages = [...currentImages, ...uploadedUrls];
        onImagesUpdate(newImages);
        setSuccess(`${uploadedUrls.length} imagem(ns) carregada(s) com sucesso!`);
        
        // Limpar success após 3 segundos
        setTimeout(() => setSuccess(null), 3000);
      }

    } catch (err) {
      console.error('Erro durante upload:', err);
      setError('Erro inesperado durante o upload');
    } finally {
      setIsUploading(false);
      setUploadProgress({});
      
      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Extrair o path do arquivo da URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const productPath = urlParts[urlParts.length - 2];
      const filePath = `${productPath}/${fileName}`;

      // Remover do Supabase Storage
      const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (error) {
        console.error('Erro ao remover imagem:', error);
        setError('Erro ao remover imagem do servidor');
        return;
      }

      // Atualizar lista local
      const newImages = currentImages.filter((_, i) => i !== index);
      onImagesUpdate(newImages);
      setSuccess('Imagem removida com sucesso!');
      
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (err) {
      console.error('Erro ao remover imagem:', err);
      setError('Erro inesperado ao remover imagem');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-vitale-primary flex items-center gap-2">
          <ImageIcon className="w-6 h-6" />
          Gerenciar Imagens do Produto
        </h3>
        <p className="text-neutral-600">
          <strong>{productName}</strong> - {currentImages.length}/{maxImages} imagens
        </p>
      </div>

      {/* Mensagens de feedback */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Erro</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Sucesso</p>
            <p className="text-green-700 text-sm">{success}</p>
          </div>
          <button
            onClick={() => setSuccess(null)}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isUploading
              ? 'border-vitale-primary bg-vitale-primary/5'
              : 'border-vitale-primary/30 hover:border-vitale-primary hover:bg-vitale-primary/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={isUploading || currentImages.length >= maxImages}
            className="hidden"
            id="image-upload"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-vitale-primary/10 rounded-full flex items-center justify-center">
                <Upload className={`w-8 h-8 text-vitale-primary ${isUploading ? 'animate-bounce' : ''}`} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-vitale-primary">
                {isUploading ? 'Enviando imagens...' : 'Adicionar Novas Imagens'}
              </h4>
              <p className="text-neutral-600">
                Clique para selecionar ou arraste as imagens aqui
              </p>
              <p className="text-sm text-neutral-500">
                JPG, PNG, WEBP até 5MB cada • Máximo {maxImages} imagens
              </p>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || currentImages.length >= maxImages}
              className="bg-vitale-primary hover:bg-vitale-secondary text-white px-6 py-3 rounded-xl"
            >
              {isUploading ? 'Enviando...' : 'Selecionar Imagens'}
            </Button>
          </div>
        </div>

        {/* Progress bars */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="space-y-2">
            {Object.entries(uploadProgress).map(([fileName, progress]) => (
              <div key={fileName} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-700 truncate">{fileName}</span>
                  <span className="text-vitale-primary font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-vitale-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Images Grid */}
      {currentImages.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-vitale-primary">
            Imagens Atuais ({currentImages.length})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-xl border-2 border-vitale-primary/20 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image
                    src={imageUrl}
                    alt={`${productName} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Overlay com botão remover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => handleRemoveImage(imageUrl, index)}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-2">
                  <p className="text-xs text-neutral-600 text-center truncate">
                    Imagem {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <h5 className="font-semibold text-blue-800 mb-2">💡 Dicas importantes:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use imagens de alta qualidade (mínimo 800x800px)</li>
          <li>• A primeira imagem será a principal do produto</li>
          <li>• Imagens em formato quadrado funcionam melhor</li>
          <li>• Evite fundos muito escuros ou com muito contraste</li>
          <li>• As alterações são salvas automaticamente</li>
        </ul>
      </div>
    </div>
  );
}