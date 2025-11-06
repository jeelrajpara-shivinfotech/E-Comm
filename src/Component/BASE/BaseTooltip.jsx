const BaseTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="bg-white rounded shadow-md border border-gray-200">
        {/* Header (e.g. month or label) */}
        <p className="text-gray-800 font-semibold text-center mb-2 bg-gray-100 px-6 py-2">
          {label}
        </p>

        {/* Dynamic key/value display */}
        <div className="flex items-center gap-2 p-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.fill || "blue" }}
          ></span>
          <p className="text-gray-600 capitalize">
            {data.dataKey}:{" "}
            <span className="font-bold text-gray-900">
              {data.value.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default BaseTooltip;
