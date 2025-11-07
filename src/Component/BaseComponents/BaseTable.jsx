import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import BaseSelect from "./BaseSelect";
import { tableConstant } from "../../common/constants/tableConstant";

export default function BaseTable({
    title,
    columns,
    fetchDataFn,
    searchPlaceholder = "Search...",
    rowsPerPageOptions = [5, 10],
}) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortValue, setSortValue] = useState("asc");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchDataFn({
                search: debouncedSearch,
                limit,
                page,
                sortKey,
                sortValue,
            });

            const items =
                res?.data?.users ||
                res?.data?.orders ||
                res?.data?.data ||
                res?.data ||
                [];

            setData(items);
            setTotalPages(res?.data?.totalPage || 1);
        } catch (err) {
            console.error("Error fetching table data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [debouncedSearch, limit, page, sortKey, sortValue]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

                <div className="relative w-full md:w-64">
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-600 font-semibold">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 text-left ${col.sortable ? "cursor-pointer" : ""}`}
                                    onClick={() => {
                                        if (!col.sortable) return;
                                        setSortKey(col.key);
                                        setSortValue((prev) => (prev === "asc" ? "desc" : "asc"));
                                    }}
                                >
                                    <div className="flex items-center gap-1 select-none">
                                        <span>{col.label}</span>
                                        {col.sortable && sortKey === col.key && (
                                            sortValue === "asc" ? (
                                                <IoIosArrowUp className="w-4 h-4 text-gray-600" />
                                            ) : (
                                                <IoIosArrowDown className="w-4 h-4 text-gray-600" />
                                            )
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                                    {tableConstant.loading}
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 text-black">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center text-gray-500 py-6 text-sm">
                                    {tableConstant.noDataFound}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <span>{tableConstant.rowsPerPage}</span>
                    <BaseSelect
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        options={rowsPerPageOptions.map((num) => ({ label: num, value: num }))}
                        className="w-20"
                    />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span>
                        {tableConstant.page} {page} {tableConstant.of} {totalPages}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={page === 1}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                        >
                            <BiChevronsLeft />
                        </button>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                        >
                            <IoIosArrowForward />
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={page === totalPages}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                        >
                            <BiChevronsRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
