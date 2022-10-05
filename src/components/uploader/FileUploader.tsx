import {
  Dropzone,
  FileItem,
  FileValidated,
  FullScreenPreview,
  VideoPreview,
} from "@dropzone-ui/react";
import { useState } from "react";

export const FileUploader = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [imageSrc, setImageSrc] = useState<any>(undefined);
  const [videoSrc, setVideoSrc] = useState<any>(undefined);

  const updateFiles = (incomingFiles: FileValidated[]) => {
    setFiles(incomingFiles);
  };

  const handleWatch = (file: any) => {
    setVideoSrc(file.src);
  };

  const removeFile = (id: string | number | undefined) => {
    if (id) {
      setFiles(files.filter((file) => file.id !== id));
    }
  };

  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files: FileValidated[]) => {
    console.log("list cleaned", files);
  };

  const handleUpload = (response: any) => {
    console.log("uploading files", files);
  };

  return (
    <div>
      <Dropzone
        onChange={updateFiles}
        onClean={handleClean}
        value={files}
        minHeight="195px"
        maxFiles={5}
        url="http://localhost:8000/api/katas/uploadFile"
        style={{ minWidth: "505px" }}
        label="Drag'n drop files here or click to browse"
        maxFileSize={2998000}
        disableScroll
        onUploadFinish={handleUpload}
      >
        {files.map((file: FileValidated) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={() => removeFile(file.id)}
            onSee={handleSee}
            onWatch={handleWatch}
            resultOnTooltip
            preview
            info
            hd
          />
        ))}
      </Dropzone>
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e: any) => handleSee(undefined)}
      />
      <VideoPreview
        videoSrc={videoSrc}
        openVideo={videoSrc}
        onClose={(e: any) => handleWatch(undefined)}
        controls
        autoplay
      />
    </div>
  );
};
