import { Paginate } from "@/types"
import axios, { AxiosError, CanceledError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export type FetchApiOpt  = {
    pagination?: {
        page?: number
        limit?: number
    },
    search?: string
}

export function useFetchDataTable<T extends Record<string, unknown>>(url: string, opt: FetchApiOpt) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Paginate<T>>()
    
    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        async function fetchData() {
            setIsLoading(true)

            try {
                const resData = await axios.get(url, {
                    params: {
                        page: opt.pagination?.page,
                        limit: opt.pagination?.limit,
                        search: opt.search?.length ? opt.search : undefined
                    },
                    baseURL: window.location.origin,
                    cancelToken: cancelTokenSource.token
                })
                setData(resData.data)
            } catch (error) {
                if (error instanceof CanceledError) return
                if (error instanceof AxiosError) {
                    return toast.error(error.status === 500 ? 'Internal Server Error' : error.message)
                }
                toast.error('Unhadled Error')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
      
        return () => {
            cancelTokenSource.cancel('Request canceled by user action.');
        };
    }, [opt.pagination?.limit, opt.pagination?.page, opt.search])

    return {
        data: data?.data ?? [], 
        total: data?.total ?? 0, 
        limit: data?.per_page ?? 0, 
        from: data?.from ?? 0,
        to: data?.to ?? 0,
        isLoading
    }
}