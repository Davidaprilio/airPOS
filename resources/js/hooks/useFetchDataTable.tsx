import { Paginate } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

export type FetchApiOpt  = {
    pagination?: {
        page?: number
        limit?: number
    }
}

export function useFetchDataTable<T extends Record<string, unknown>>(url: string, opt: FetchApiOpt) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Paginate<T>>()

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const resData = await axios.get(url, {
                params: {
                    page: opt.pagination?.page,
                    limit: opt.pagination?.limit,
                },
                baseURL: window.location.origin
            })
            setData(resData.data)
            setIsLoading(false)
        }

        fetchData()
    }, [opt.pagination?.limit, opt.pagination?.page])

    return {
        data: data?.data ?? [], 
        total: data?.total ?? 0, 
        limit: data?.per_page ?? 0, 
        from: data?.from ?? 0,
        to: data?.to ?? 0,
        isLoading
    }
}