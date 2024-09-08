import { useFetchDataTable } from "./useFetchDataTable";
import useDataTable, { HookDataTableOptions } from "./useDataTable";
import useDebounce from "./useDebounce";

export default function useDataTableApi<T extends Record<string, unknown>>(url: string, opts?: HookDataTableOptions & {
    searchDebounceTime?: number,
}) {
    const {page, limit, paginateReset, attrs} = useDataTable({
        paginate: opts?.paginate
    })

    const [search, setSearch] = useDebounce<string>('', opts?.searchDebounceTime ?? 500, (val) => {
        paginateReset()
        attrs.setSearch(val);
    })
    
    const {data, isLoading, total} = useFetchDataTable<T>(url, {
        pagination: {page, limit},
        search: attrs.search,
        filter: attrs.columnFilters,
        sort:  attrs.sorting,
    })
  
    return {
        data,
        total,
        isLoading,

        limit,
        page,
        paginateReset,

        attrs: {
            ...attrs,
            data,
            total,
            isLoading,
            search,
            setSearch,
            manualPagination: true,
            globalFilter: undefined,
        }
    }
}
