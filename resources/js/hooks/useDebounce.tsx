import { DependencyList, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export default function useDebounce<T>(
    initialValue: T,
    delay: number,
    fncallback: (value: T) => void,
    deps?: DependencyList
): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState(initialValue)

    const callBack = useCallback((val: T) => {
        fncallback(val)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps || [])

    useEffect(() => {
        if (value !== undefined) {
            const handler = setTimeout(() => {
                callBack(value)
            }, delay)
            return () => clearTimeout(handler)
        }
    }, [value, delay, callBack])


    return [value, setValue]
}