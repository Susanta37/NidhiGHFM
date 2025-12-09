import React from "react";
import Modal from "@/components/Modal";
import { useForm, router } from "@inertiajs/react";
import { CheckCircle, XCircle, Trash2, FileIcon } from "lucide-react";

export default function DocumentsModal({
    show,
    onClose,
    userId,
    existingDocs = [],
    onSuccess,
}: {
    show: boolean;
    onClose: () => void;
    userId?: number;
    existingDocs: any[];
    onSuccess: () => void;
}) {
    const uploadForm = useForm({
        documents: [] as File[],
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        const data = new FormData();
        uploadForm.data.documents.forEach((file, idx) => {
            data.append(`documents[${idx}]`, file);
        });

        uploadForm.post(`/super-admin/users/${userId}/documents`, {
            forceFormData: true,
            onSuccess: () => {
                uploadForm.reset();
                onSuccess();
                onClose();
            },
        });
    };

    const verifyDoc = (docId: number, action: "approve" | "reject") => {
        router.post(
            `/super-admin/users/${userId}/documents/${docId}/verify`,
            { action },
            {
                onSuccess: () => onSuccess(),
            }
        );
    };

    return (
        <Modal show={show} onClose={onClose}>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Manage Documents
            </h2>

            {/* Upload Section */}
            <form onSubmit={handleUpload} className="mb-6">
                <label className="block mb-2 text-sm font-medium">Upload New Documents</label>
                <input
                    type="file"
                    multiple
                    onChange={(e) =>
                        uploadForm.setData(
                            "documents",
                            e.target.files ? Array.from(e.target.files) : []
                        )
                    }
                    className="w-full mb-3 border border-neutral-300 rounded-lg p-2 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />

                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    disabled={uploadForm.processing}
                >
                    {uploadForm.processing ? "Uploading..." : "Upload"}
                </button>
            </form>

            {/* Listing documents */}
            <h3 className="text-lg font-semibold mb-3">Existing Documents</h3>

            {existingDocs.length === 0 && (
                <p className="text-neutral-500 text-sm">No documents uploaded.</p>
            )}

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {existingDocs.map((doc: any) => (
                    <div
                        key={doc.id}
                        className="p-3 border rounded-lg flex justify-between items-center dark:border-neutral-700"
                    >
                        <div className="flex items-center gap-3">
                            <FileIcon className="text-blue-500" />
                            <div>
                                <p className="font-medium">Document #{doc.id}</p>
                                <a
                                    href={`/storage/${doc.file_path}`}
                                    target="_blank"
                                    className="text-blue-600 text-sm underline"
                                >
                                    View / Download
                                </a>
                                <p className="text-xs text-neutral-500 capitalize">
                                    Status: {doc.status}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1 bg-green-600 text-white rounded-full flex items-center gap-1 text-sm"
                                onClick={() => verifyDoc(doc.id, "approve")}
                            >
                                <CheckCircle size={14} /> Approve
                            </button>

                            <button
                                className="px-3 py-1 bg-red-600 text-white rounded-full flex items-center gap-1 text-sm"
                                onClick={() => verifyDoc(doc.id, "reject")}
                            >
                                <XCircle size={14} /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}
