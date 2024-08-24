export default function MenuTobBar({ label, text }: { label: string, text: string }) {
    return (
        <div className="flex flex-col text-nowrap">
            <div className="-mb-2 text-sm text-gray-600 font-medium">{label}</div>
            <strong className="text-gray-700">{text}</strong>
        </div>
    )
}