
'use client'
import Image from "next/image";
import { useEffect, useMemo } from "react";

// Tạo một component nhỏ bên ngoài hoặc phía trên ReviewModal của bạn


export default function ImagePreviewItem({ file, onRemove, status }: { file: File; onRemove: () => void; status: string }) {


    // Trong Component của bạn, xóa bỏ useState của previewUrl đi và thay bằng:
    const previewUrl = useMemo(() => {
        if (!file) return "";
        return URL.createObjectURL(file);
    }, [file]);

    // Vẫn cần useEffect này ĐỂ CHỈ LÀM NHIỆM VỤ dọn dẹp bộ nhớ (không gọi setState ở đây)
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    if (!previewUrl) return null;

    return (
        <div className="relative aspect-square rounded overflow-hidden border bg-white">
            <Image
                fill sizes=""
                src={previewUrl}
                alt="preview"
                className="w-full h-full object-cover"
            />
            {status !== "loading" && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100"
                >
                    &times;
                </button>
            )}
        </div>
    );
}
