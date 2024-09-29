import { useEffect, useState } from "react";

export function useImagePreview(imageFile: FileList | null) {
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const fileUrl = URL.createObjectURL(imageFile[0]);
      console.log(fileUrl);
      setPreviewImageUrl(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [imageFile]);

  return previewImageUrl;
}
