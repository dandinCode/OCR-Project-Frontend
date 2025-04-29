import React from "react";

interface ConfirmDeleteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string; 
};

export function ConfirmDeleteChatModal ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "este item",
}: ConfirmDeleteChatModalProps)  {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Confirmar exclusão</h2>
        <p className="mb-6">Tem certeza que deseja excluir <strong>{itemName}</strong>?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteChatModal;
