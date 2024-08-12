import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { uploadImageServices } from "../Redux/APIs/ImageUploadServices";
import Loader from "./Notfications/Loader";

function Uploader({ setImageUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);

      try {
        setLoading(true);
        const data = await uploadImageServices(file);
        setImageUrl(data);
      } catch (err) {
        setError("Error uploading file. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: "image/jpeg, image/png", // Accepting only jpeg and png files
    });

  return (
    <div className="w-full flex-colo gap-6 text-center">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md cursor-pointer">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Upload your Images Here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop it like it's hot!"
              : isDragReject
              ? "Unsupported file type..."
              : "Only *.jpeg and *.png images will be accepted"}
          </em>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}

export default Uploader;
