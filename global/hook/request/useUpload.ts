import { Upload } from "@global/request/builder/Upload";
import { useState } from "react";
import { Upload as UploadResponseHandler } from "@global/request/response/handler/api/Upload";

type UseUploadProps = {
  entity: string;
  field?: string;
  needsAuthorization?: boolean;
};

type UseUploadReturn<T> = {
  loading: boolean;
  error: string | null;
  uploadFile: (file: File | undefined) => Promise<string | null>;
};

export function useUpload<T = any>({
  entity,
  field = "url-imagem",
  needsAuthorization = false,
}: UseUploadProps): UseUploadReturn<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File | undefined): Promise<string | null> => {
    setLoading(true);
    setError(null);

    if (!file) {
      setError("Nenhum arquivo selecionado");
      setLoading(false);
      return null;
    }

    let formData = new FormData();

    formData.append(`${entity}_${field}`.replace(/-/g, "_"), file);
    formData.append("profile", "image");

    const update = new Upload({
      entity: entity,
      body: formData,
      data: new Map([["field", field]]),
      responseHandler: new UploadResponseHandler({
        onSuccessCallback: (result) => {
          console.log(result);
        }
      })
    });

    const response = await update.build(needsAuthorization);

    if (!response.data.filesNames[0]) {
      setError("Erro ao fazer upload do arquivo");
      setLoading(false);
      return null;
    }

    setLoading(false);

    return response.data.filesNames[0];
  };

  return {
    loading,
    error,
    uploadFile,
  };
}
