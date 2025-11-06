import React, { useState, useEffect, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { getOrderReport } from "../../Api/DashboardApi";
import { dashboardHeaders, orderReport } from "../../common/constants/DashboardCardConstants";

function OrderReport() {
  const [allOrders, setAllOrders] = useState([]); // store all orders from backend
  const [orders, setOrders] = useState([]); // visible (filtered + paginated) orders
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortValue, setSortValue] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch all orders once
  const fetchOrders = async () => {
    try {
      const res = await getOrderReport(); // no params needed
      setAllOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Apply search + sorting + pagination on frontend
  const processedOrders = useMemo(() => {
    let filtered = [...allOrders];

    // 🔍 Filter by order name or customer name
    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.order_name.toLowerCase().includes(lower) ||
          o.name.toLowerCase().includes(lower)
      );
    }

    // 🔽 Sorting
    if (sortKey) {
      filtered.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortValue === "asc" ? -1 : 1;
        if (valA > valB) return sortValue === "asc" ? 1 : -1;
        return 0;
      });
    }

    // 🧾 Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    setTotalPages(totalPages);
    return paginated;
  }, [allOrders, debouncedSearch, sortKey, sortValue, page, limit]);

  useEffect(() => {
    setOrders(processedOrders);
  }, [processedOrders]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{dashboardHeaders.orderReport}</h2>

        <div className="relative w-full md:w-64">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order name or customer..."
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
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => {
                  setSortKey("id");
                  setSortValue((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
              >
                <div className="flex items-center gap-1 select-none">
                  <span>{orderReport.orderId}</span>
                  {sortKey === "id" && (
                    sortValue === "asc" ? (
                      <IoIosArrowUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <IoIosArrowDown className="w-4 h-4 text-gray-600" />
                    )
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left">{orderReport.orderName}</th>
              <th className="px-4 py-3 text-left">{orderReport.customerName}</th>
              <th className="px-4 py-3 text-left">{orderReport.orderAmount}</th>
              <th className="px-4 py-3 text-left">{orderReport.totalItems}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors duration-150 text-black"
                >
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.order_name}</td>
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">₹{order.order_amount}</td>
                  <td className="px-4 py-3">{order.total_items}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6 text-sm">
                  {orderReport.noOrders}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 flex-wrap gap-2">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span>{orderReport.rowsPerPage}</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-md px-2 py-1 bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            {orderReport.page} {page} {orderReport.of} {totalPages}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
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

export default OrderReport;
