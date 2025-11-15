export const userReportColumn = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "E-Mail", sortable: true },
    { key: "phone_number", label: "Phone", sortable: true },
    { key: "gender", label: "Gender", sortable: true },
]

export const orderReportColumns = [
  { key: "id", label: "Order id", sortable: true },
  { key: "order_name", label: "Order name" , sortable : true},
  { key: "name", label: "Customer name" },
  { key: "order_amount", label: "Amount", render: (v) => `₹${v}` },
  { key: "total_items", label: "Total items" },
];