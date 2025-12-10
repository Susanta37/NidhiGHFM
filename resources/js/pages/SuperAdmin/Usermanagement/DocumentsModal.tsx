import React from "react";
import Modal from "@/components/Modal";
import { useForm, router } from "@inertiajs/react";
import { CheckCircle, XCircle, FileIcon, Trash2 } from "lucide-react";
import type { UserDocument } from "@/types/UserDocument";

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
    existingDocs: UserDocument[];
    onSuccess: () => void;
}) {
    /* -------------------------------------------------
        UPLOAD FORM
    ------------------------------------------------- */
    const uploadForm = useForm({
        documents: [] as File[],
        doc_type: "",
        expiry_date: "",
    });

    /* -------------------------------------------------
        HANDLE DOCUMENT UPLOAD
    ------------------------------------------------- */
    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        const data = new FormData();

        uploadForm.data.documents.forEach((file, idx) => {
            data.append(`documents[${idx}]`, file);
        });

        data.append("doc_type", uploadForm.data.doc_type);
        data.append("expiry_date", uploadForm.data.expiry_date || "");

        uploadForm.post(`/super-admin/users/${userId}/documents`, {
            forceFormData: true,
            onSuccess: () => {
                uploadForm.reset();
                onSuccess();
                onClose();
            },
        });
    };

    /* -------------------------------------------------
        VERIFY DOCUMENT (APPROVE / REJECT)
    ------------------------------------------------- */
    const verifyDoc = (docId: number, action: "approve" | "reject") => {
        router.post(
            `/super-admin/users/${userId}/documents/${docId}/verify`,
            { action },
            {
                onSuccess: () => {
                onSuccess();
                onClose(); 
            }
            }
        );
    };

    /* -------------------------------------------------
        DELETE DOCUMENT
    ------------------------------------------------- */
    const deleteDoc = (docId: number) => {
        router.delete(`/super-admin/users/${userId}/documents/${docId}`, {
            onSuccess: () => {
                onSuccess();
                onClose(); 
            }
        });
    };

    /* -------------------------------------------------
        UI: FULL MODAL
    ------------------------------------------------- */
    return (
        <Modal show={show} onClose={onClose} title="Manage Documents">
            {/* ------------------------ UPLOAD SECTION ------------------------ */}
            <form onSubmit={handleUpload} className="mb-6 space-y-4">
                {/* Doc Type */}
                <div>
                    <label className="block text-sm font-medium mb-2">Document Type</label>
                    <select
                        className="w-full border border-neutral-300 rounded-lg p-2 dark:bg-neutral-800 dark:text-white"
                        value={uploadForm.data.doc_type}
                        onChange={(e) => uploadForm.setData("doc_type", e.target.value)}
                    >
                        <option value="">Select Document Type</option>
                        <option value="aadhaar">Aadhaar</option>
                        <option value="pan">PAN</option>
                        <option value="bank_passbook">Bank Passbook</option>
                        <option value="offer_letter">Offer Letter</option>
                        <option value="experience">Experience</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Expiry Date (Optional) */}
                <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
                    <input
                        type="date"
                        className="w-full border border-neutral-300 rounded-lg p-2 dark:bg-neutral-800 dark:text-white"
                        value={uploadForm.data.expiry_date}
                        onChange={(e) => uploadForm.setData("expiry_date", e.target.value)}
                    />
                </div>

                {/* Files */}
                <div>
                    <label className="block text-sm font-medium mb-2">Upload Files</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) =>
                            uploadForm.setData(
                                "documents",
                                e.target.files ? Array.from(e.target.files) : []
                            )
                        }
                        className="w-full border border-neutral-300 rounded-lg p-2 dark:bg-neutral-800 dark:text-white"
                    />
                </div>

                {/* Upload button */}
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                    disabled={uploadForm.processing}
                >
                    {uploadForm.processing ? "Uploading..." : "Upload Document"}
                </button>
            </form>

            {/* ------------------------ EXISTING DOCUMENTS ------------------------ */}
            <h3 className="text-lg font-semibold mb-3">Existing Documents</h3>

            {existingDocs.length === 0 && (
                <p className="text-neutral-500 text-sm">No documents uploaded.</p>
            )}

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                {existingDocs.map((doc) => (
                    <div
                        key={doc.id}
                        className="p-4 border rounded-lg dark:border-neutral-700 flex justify-between items-center"
                    >
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-3">
                            <FileIcon className="text-blue-500" size={32} />

                            <div>
                                {/* Doc Type */}
                                <p className="font-medium capitalize">
                                    {doc.doc_type.replace("_", " ")}
                                </p>

                                {/* Link */}
                                <a
                                    href={`/storage/${doc.file_path}`}
                                    target="_blank"
                                    className="text-blue-600 dark:text-blue-400 text-sm underline"
                                >
                                    View / Download
                                </a>

                                {/* Status */}
                                <p className="text-xs text-neutral-500 capitalize">
                                    Status: {doc.status}
                                </p>

                                {/* Expiry Date */}
                                {doc.expiry_date && (
                                    <p className="text-xs text-red-500">
                                        Expires: {doc.expiry_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex items-center gap-2">
                            {/* Approve */}
                            <button
                                className="px-3 py-1 bg-green-600 text-white rounded-full flex items-center gap-1 text-sm"
                                onClick={() => verifyDoc(doc.id, "approve")}
                            >
                                <CheckCircle size={14} /> Approve
                            </button>

                            {/* Reject */}
                            <button
                                className="px-3 py-1 bg-red-600 text-white rounded-full flex items-center gap-1 text-sm"
                                onClick={() => verifyDoc(doc.id, "reject")}
                            >
                                <XCircle size={14} /> Reject
                            </button>

                            {/* Delete */}
                            <button
                                className="px-3 py-1 bg-neutral-700 text-white rounded-full flex items-center gap-1 text-sm"
                                onClick={() => deleteDoc(doc.id)}
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
}
