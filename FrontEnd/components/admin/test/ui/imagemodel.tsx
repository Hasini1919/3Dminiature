"use client";

interface ModalProps {
  imagePaths: string[];
  onClose: () => void;
}

export default function ImageModal({ imagePaths, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-lg w-full max-h-[80vh] overflow-auto">
        <h3 className="text-lg font-semibold mb-4">Design Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {imagePaths.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Design ${index + 1}`}
              className="w-full h-auto border rounded"
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
