import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { Camera, Settings, Save } from "lucide-react";

interface Props {
    settings: any;
}

export default function SettingsPage({ settings }: Props) {

    const form = useForm({
        face_enabled: settings?.face_enabled ?? true,
        match_threshold: settings?.match_threshold ?? 0.45,
        model: settings?.model ?? "facenet",
        auto_check_interval: settings?.auto_check_interval ?? 30,
    });

    const breadcrumbs = [
        { title: "Face Recognition", href: "/hr/face/records" },
        { title: "Settings", href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Face Recognition Settings" />

            <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen">

                <h1 className="text-2xl font-semibold mb-8 text-neutral-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-6 h-6" /> Face Recognition Settings
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.post("/hr/face/settings/save");
                    }}
                    className="grid gap-6 md:grid-cols-2"
                >
                    {/* ---------------------- Toggle Face System ---------------------- */}
                    <div className="p-6 rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white flex items-center gap-2">
                            <Camera /> System Status
                        </h2>

                        <label className="flex items-center gap-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.data.face_enabled}
                                // onChange={(e) =>
                                //     form.setData("face_enabled", e.target.checked)
                                // }
                                className="w-5 h-5 rounded border-neutral-400"
                            />
                            <span className="text-neutral-700 dark:text-neutral-300">
                                Enable Face Recognition for Attendance
                            </span>
                        </label>
                    </div>

                    {/* ---------------------- Model Selection ---------------------- */}
                    <div className="p-6 rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                            Recognition Model
                        </h2>

                        <select
                            className="w-full px-4 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                            value={form.data.model}
                            // onChange={(e) => form.setData("model", e.target.value)}
                        >
                            <option value="facenet">FaceNet (Recommended)</option>
                            <option value="dlib">Dlib (Fast)</option>
                            <option value="resnet">ResNet (Accurate)</option>
                            <option value="mobileface">MobileFace (Lightweight)</option>
                        </select>
                    </div>

                    {/* ---------------------- Threshold Slider ---------------------- */}
                    <div className="p-6 rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                            Matching Threshold
                        </h2>

                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.01"
                            value={form.data.match_threshold}
                            // onChange={(e) =>
                            //     form.setData("match_threshold", parseFloat(e.target.value))
                            // }
                            className="w-full"
                        />

                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Value: <strong>{form.data.match_threshold}</strong>
                        </p>
                    </div>

                    {/* ---------------------- Auto Check Interval ---------------------- */}
                    <div className="p-6 rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                            Auto Verification Interval (seconds)
                        </h2>

                        <input
                            type="number"
                            min={5}
                            max={300}
                            className="px-4 py-2 border rounded-lg w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                            value={form.data.auto_check_interval}
                            // onChange={(e) =>
                            //     form.setData(
                            //         "auto_check_interval",
                            //         parseInt(e.target.value)
                            //     )
                            // }
                        />
                    </div>

                    {/* ---------------------- Save Button ---------------------- */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
                        >
                            <Save className="w-5 h-5" />
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
