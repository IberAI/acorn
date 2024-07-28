
import React, { ChangeEvent } from 'react';

interface FileUploadProps {
  fileName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ fileName, onChange }) => {
  return (
    <div>
      <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
        Upload README.md
      </label>
      <input
        type="file"
        id="fileUpload"
        name="fileUpload"
        accept=".md"
        onChange={onChange}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-400 file:text-white hover:file:bg-primary-500"
      />
      {fileName && <p className="mt-2 text-sm text-gray-600">Uploaded file: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
