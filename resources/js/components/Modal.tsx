import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
    show,
    onClose,
    title,
    children,
}: {
    show: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    {/* Modal Box */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        
                        /* ⬅ HERE: WIDER MODAL */
                        className="
                            relative w-full max-w-4xl 
                            bg-white dark:bg-neutral-900 
                            rounded-xl shadow-xl 
                            border border-neutral-200 dark:border-neutral-700 
                            p-6
                        "
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full 
                            bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 
                            hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                        >
                            ✕
                        </button>

                        {/* Title */}
                        {title && (
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                                {title}
                            </h2>
                        )}

                        <hr className="my-4" />

                        {/* Scrollable Content */}
                        <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
