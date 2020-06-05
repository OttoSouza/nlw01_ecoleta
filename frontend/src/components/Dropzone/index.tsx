import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";
import { FiUpload } from "react-icons/fi";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
  const [selectedFile, setSelectedFile] = useState("");
  
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fireUrl = URL.createObjectURL(file);
    setSelectedFile(fireUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} accept="image/*" />

      {selectedFile ? (
        <img src={selectedFile} alt="Upload" />
      ) : (
        <p>
          {" "}
          <FiUpload /> Imagem do estabelicimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
