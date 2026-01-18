import { useRef, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";


const ConfirmPopup = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete"}) => {
    const confirmRef = useRef();

    if(!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-[#1f1f1f] w-[90%] max-w-md rounded-xl p-6 shadow-2xl transform transition-all scale-100 dark:text-white border border-gray-200 dark:border-[#333]">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                        <AlertTriangle />
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button
                        onClick={onClose} 
                        className="ml-auto flex items-center justify-center w-10 h-10 hover:bg-[#d9d9d9] dark:hover:bg-[#3d3d3d] rounded-full transition-colors"
                    >
                        <X />
                    </button>
                </div>
                {/* Message */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {message}
                </p>
                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className="px-5 py-2.5 rounded-lg font-medium text-white shadow-lg transition-colors bg-red-600 hover:bg-red-700 shadow-red-500/20"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;