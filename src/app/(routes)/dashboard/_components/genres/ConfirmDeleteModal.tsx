import React from 'react';

// Define the types for the props
interface ConfirmDeleteModalProps {
    isOpen: boolean;          // Whether the modal is open
    onClose: () => void;      // Function to call when closing the modal
    onConfirm: () => void;    // Function to call when confirming the delete
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-80 text-center">
                <p className="text-gray-700 mb-4">Bạn có muốn xóa thể loại này không?</p>
                <div className="flex justify-around">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Xóa
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
