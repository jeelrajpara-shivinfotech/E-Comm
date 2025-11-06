import { useEffect, useState } from "react";
import { getUserReport } from "../../Api/DashboardApi";
import { dashboardHeaders, userReport } from "../../common/constants/DashboardCardConstants";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

export default function UserReport() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchUsers = async () => {
        try {
            const res = await getUserReport({
                search: debouncedSearch,
                limit,
                page,
                sortKey,
                sortValue,
            });
            setUsers(res.data.users || []);
            setTotalPages(res.data.totalPage || 1);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [debouncedSearch, limit, page, sortKey, sortValue]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 ">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    {dashboardHeaders.userReport}
                </h2>

                <div className="flex flex-wrap items-center gap-3 md:gap-4">


                    <div className="relative w-full md:w-64">
                        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 ">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-600 font-semibold">
                        <tr>
                            <th className="px-4 py-3 text-left ">
                                <div
                                    className="flex items-center gap-1 cursor-pointer select-none"
                                    onClick={() =>
                                        setSortKey("id") ||
                                        setSortValue((prev) => (prev === "asc" ? "desc" : "asc"))
                                    }
                                >
                                    <span>{userReport.name}</span>
                                    {sortKey === "id" && sortValue === "asc" ? (
                                        <IoIosArrowUp className="w-4 h-4 text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </th>

                            <th className="px-4 py-3 text-left">
                                <div
                                    className="flex items-center gap-1 cursor-pointer select-none"
                                    onClick={() =>
                                        setSortKey("email") ||
                                        setSortValue((prev) => (prev === "asc" ? "desc" : "asc"))
                                    }
                                >
                                    <span>{userReport.email}</span>
                                    {sortKey === "email" && sortValue === "asc" ? (
                                        <IoIosArrowUp className="w-4 h-4 text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left">
                                <div
                                    className="flex items-center gap-1 cursor-pointer select-none"
                                    onClick={() =>
                                        setSortKey("phone") ||
                                        setSortValue((prev) => (prev === "asc" ? "desc" : "asc"))
                                    }
                                >
                                    <span>{userReport.phone}</span>
                                    {sortKey === "phone" && sortValue === "asc" ? (
                                        <IoIosArrowUp className="w-4 h-4 text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left">
                                <div
                                    className="flex items-center gap-1 cursor-pointer select-none"
                                    onClick={() =>
                                        setSortKey("gender") ||
                                        setSortValue((prev) => (prev === "asc" ? "desc" : "asc"))
                                    }
                                >
                                    <span>{userReport.gender}</span>
                                    {sortKey === "gender" && sortValue === "asc" ? (
                                        <IoIosArrowUp className="w-4 h-4 text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors duration-150 text-black "
                                >
                                    <td className="px-4 py-4 text-black">{user.name}</td>
                                    <td className="px-4 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-4">
                                        {user.phone_number}
                                    </td>
                                    <td className="px-4 py-4">{user.gender}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center text-gray-500 py-6 text-sm"
                                >
                                    {userReport.noUsers}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 flex-wrap gap-2">
                {/* Rows per page dropdown */}
                <div className="flex items-center gap-2 flex-wrap ">
                    <span>{userReport.rowsPerPage}</span>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="rounded-md px-2 py-1 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {[5, 10,].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                    <span>
                        {userReport.page} {page} {userReport.of} {totalPages}
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={page === 1}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-200 disabled:opacity-40"
                        >
                            <BiChevronsLeft />
                        </button>

                        <button
                             onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-200 disabled:opacity-40"
                        >
                            <IoIosArrowBack />
                        </button>

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-200 disabled:opacity-40"
                        >
                            <IoIosArrowForward />
                        </button>

                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={page === totalPages}
                            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                        >
                            <BiChevronsRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
