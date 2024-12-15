import CounterBtn from "@/Components/atoms/CounterBtn"
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function Counter({ value, onChange}: {
    value: number
    onChange: (type: 'increment' | 'decrement') => void
}) {
    return (
        <div className="flex items-center w-full justify-between">
            <CounterBtn Icon={FaMinus} onClick={() => onChange('decrement')} />
            <div className="text-center border-b-2 px-2 border-primary">{value}</div>
            <CounterBtn Icon={FaPlus} onClick={() => onChange('increment')} />
        </div>
    )
}

