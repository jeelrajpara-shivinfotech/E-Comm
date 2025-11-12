import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import BaseSelect from "./BaseSelect";
import { tableConstant } from "../../common/constants/tableConstant";
import BaseSearch from "./BaseSearch";
import BaseLoader from "./BaseLoader";

const BaseTable = forwardRef(({
    title,
    columns,
    fetchDataFn,
    searchPlaceholder = "Search...",
    rowsPerPageOptions = [5, 10],
    pageKey = "page",
    limitKey = "limit",
    noDataFound
}, ref) => {
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

    useImperativeHandle(ref, () => ({
        refresh: () => {
            loadData();
        },
    }));

    const loadData = async () => {
        try {
            setLoading(true);
            const resRaw = await fetchDataFn({
                search: debouncedSearch,
                [pageKey]: page,
                [limitKey]: limit,
                sortKey,
                sortValue,
            });

            const res = resRaw && resRaw.data ? resRaw.data : resRaw;

            if (Array.isArray(res)) {
                setData(res);
            } else if (Array.isArray(res?.data)) {
                setData(res.data);
            } else if (typeof res?.data === "object" && res?.data !== null) {
                const arrayInsideData = Object.values(res.data).find(Array.isArray);
                setData(arrayInsideData || []);
            } else {
                const arrayInsideRes = Object.values(res || {}).find(Array.isArray);
                setData(arrayInsideRes || []);
            }

            const totalPage =
                Number(res?.totalPage) ||
                Number(res?.data?.totalPage) ||
                Number(res?.total_pages) ||
                Math.ceil(
                    (Number(res?.totalItems || res?.data?.totalItems || 0) || 0) / limit
                ) ||
                1;

            setTotalPages(totalPage);
        } catch (err) {
            console.error("Error fetching table data:", err);
            setData([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            if (sortValue === "asc") setSortValue("desc");
            else if (sortValue === "desc") setSortValue("asc");
            else setSortValue("asc");
        } else {
            setSortKey(key);
            setSortValue("asc");
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
                <h2 className=" text-gray-900 lexend text-base font-semibold sm:text-lg whitespace-nowrap">{title}</h2>

                <BaseSearch
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    searchPlaceholder={searchPlaceholder}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 border-b border-gray-200 text-xs uppercase text-gray-600 font-semibold inter">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    className={`px-4 py-2 text-left font-medium text-gray-700 select-none ${col.sortable ? "cursor-pointer " : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && (
                                            <span className="text-gray-400">
                                                {sortKey === col.key ? (
                                                    sortValue === "asc" ? (
                                                        <IoIosArrowUp size={14} className="inline-block" />
                                                    ) : (
                                                        <IoIosArrowDown size={14} className="inline-block" />
                                                    )
                                                ) : (
                                                    <IoIosArrowUp size={14} className="inline-block opacity-40 rotate-180" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>


                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 inter">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="py-10">
                                    <BaseLoader overlay={false} />
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
                                    {noDataFound}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 flex-wrap gap-2 inter">
                <div className="flex items-center gap-2 ">
                    <span>{tableConstant.rowsPerPage}</span>
                    <BaseSelect
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        options={rowsPerPageOptions.map((num) => ({ label: num, value: num }))}
                        className=""
                    />
                </div>

                <div className="flex items-center gap-2 flex-wrap inter">
                    <span>
                        {tableConstant.page} {page} {tableConstant.of} {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        {/* First Page */}
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={page === 1}
                            aria-label="First page"
                            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-gray-700 
                ${page === 1
                                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border-gray-200 hover:bg-gray-50 active:bg-gray-100     cursor-pointer shadow-sm transition"}`
                            }
                        >
                            <BiChevronsLeft size={18} />
                        </button>

                        {/* Previous Page */}
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            aria-label="Previous page"
                            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-gray-700 
                ${page === 1
                                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border-gray-200 hover:bg-gray-50 active:bg-gray-100 cursor-pointer shadow-sm transition"}`
                            }
                        >
                            <IoIosArrowBack size={18} />
                        </button>

                        {/* Next Page */}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            aria-label="Next page"
                            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-gray-700 
                ${page === totalPages
                                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border-gray-200 hover:bg-gray-50 active:bg-gray-100 cursor-pointer shadow-sm transition"}`
                            }
                        >
                            <IoIosArrowForward size={18} />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={page === totalPages}
                            aria-label="Last page"
                            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-gray-700 
                ${page === totalPages
                                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-white border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm transition cursor-pointer"}`
                            }
                        >
                            <BiChevronsRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
})
export default BaseTable;