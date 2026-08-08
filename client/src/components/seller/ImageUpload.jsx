import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUp, Trash } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
function ImageUpload({
    selectedImages, //currently selected image
    setSelectedImages, //func to change selected image
    isUploading, //wether image is currently uploading,
    // setIsUploading, //start and stop uploading func
    isEditMode
}) {
    
    const fileInputRef = useRef(null); // Gives direct access to the hidden file input
    const [previewUrls, setPreviewUrls] = useState([]);
    
    // Revoke object URLs to avoid memory leaks when previews change or unmount
    useEffect(() => {
      return () => {
        previewUrls.forEach(urlObj => URL.revokeObjectURL(urlObj.preview));
      };
    }, [previewUrls]);

    function processFiles(files){
      const imageFiles = Array.from(files);

      setSelectedImages(imageFiles); 

      const previews = imageFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setPreviewUrls(previews);
    }

    function handleSelectImages(event){
      if(event.target.files){
      processFiles(event.target.files);
      }
    }

    function handleOnDragOver(e){
      e.preventDefault(); //prevents files to open in a tab
    }

    function handleOnDrop(e){
      e.preventDefault();
      if(e.dataTransfer.files){
        processFiles(e.dataTransfer.files);
      }
    }

    function removeImage(indexToRemove) {
      const filteredImages = selectedImages.filter((_, idx) => idx !== indexToRemove);
      const filteredPreviews = previewUrls.filter((_, idx) => idx !== indexToRemove);
      
      // Revoke memory reference for the specific deleted preview
      URL.revokeObjectURL(previewUrls[indexToRemove].preview);
      
      setSelectedImages(filteredImages);
      setPreviewUrls(filteredPreviews);
    }
    
    return (
      <div>
        <Label>Upload Images</Label>
        <div onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
          <Input
            id="image-upload"
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleSelectImages}
            disabled={isEditMode}
          />
          {selectedImages.length === 0 && (
            <Label
              htmlFor="image-upload"
              className={`flex flex-col cursor-pointer justify-center items-center ${isEditMode ? "cursor-not-allowed" : ""}`}
            >
              <FileUp />
              <span>Drag or drop to upload images</span>
            </Label>
          )}

          {/* image uploading */}

          {selectedImages.length > 0 && isUploading && (
            <Skeleton className="h-10 bg-gray-100" />
          )}

          {/* upload complete */}

          {selectedImages.length > 0 && !isUploading && (
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap gap-4 justify-center">
                {previewUrls.map((img, index) => (
                  <div key={img.file.name} className="flex flex-col items-center max-w-[150px]">
                    <img
                      src={img.preview}
                      alt={img.file.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <p className="text-xs truncate w-full text-center mt-1">{img.file.name}</p>
                    <Button variant="ghost" size="sm" onClick={() => removeImage(index)}>
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default ImageUpload;