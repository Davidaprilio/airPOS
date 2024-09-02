import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const initialValue = {
    pageSize: 15,
    pageIndex: 0,
}

export function usePagination() {
    const [pagination, setPagination] = useState<PaginationState>(initialValue);
    const { pageSize, pageIndex } = pagination;

    return {
        limit: pageSize,
        onPaginationChange: setPagination,
        pagination,
        skip: pageSize * pageIndex,
        page: pageIndex + 1,
        reset: () => {
            setPagination(initialValue)
        }
    };
}