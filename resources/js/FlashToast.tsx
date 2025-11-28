import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

type PageProps = {
    flash?: {
        success?: string;
        error?: string;
    };
};

export default function FlashToast() {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return null;
}
