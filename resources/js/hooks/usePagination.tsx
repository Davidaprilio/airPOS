import { PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const initialValue = {
    pageSize: 15,
    pageIndex: 0,
}

export function usePagination(opt?: PaginationState) {
    const [pagination, setPagination] = useState<PaginationState>(opt ?? initialValue);
    const { pageSize, pageIndex } = pagination;

    return {
        limit: pageSize,
        onPaginationChange: setPagination,
        pagination,
        skip: pageSize * pageIndex,
        page: pageIndex + 1,
        reset: () => {
            setPagination(opt ?? initialValue)
        }
    };
}