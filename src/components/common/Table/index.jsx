import React, { useState } from "react";
import "./index.css";

export const StatusButton = ({ initial = "wait" }) => {
  const [status, setStatus] = useState(initial);

  const toggle = () => {
    setStatus((prev) => (prev === "done" ? "wait" : "done"));
  };

  return status === "done" ? (
    <button
      onClick={toggle}
      className="tb-badge tb-badge--success cursor-pointer"
    >
      Đã xong
    </button>
  ) : (
    <button
      onClick={toggle}
      className="tb-badge tb-badge--wait cursor-pointer"
    >
      Đang đợi
    </button>
  );
};

/**
 * Reusable Table
 * props:
 *  - columns: [{ key, title, dataIndex, width, align, render(row, value, column) }]
 *  - data: array
 *  - rowKey: string | (row) => any
 *  - striped: boolean (zebra rows)
 *  - rowGap: number (px) khoảng trống giữa các hàng
 *  - loading: boolean
 *  - onRowClick: (row) => void (optional)
 */
export default function Table({
  columns = [],
  data = [],
  rowKey = "id",
  striped = true,
  rowGap = 10,
  loading = false,
  emptyMessage = "Không có dữ liệu",
  onRowClick,
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) {
  const keyOf = (row, idx) =>
    typeof rowKey === "function" ? rowKey(row) : row?.[rowKey] ?? idx;

  if (!Array.isArray(data) || data.length === 0) {
    return <div className="tb-empty">{emptyMessage}</div>;
  }

  return (
    <div className={["tb-wrap", className].join(" ").trim()}>
      <table
        className="tb"
        style={{ borderSpacing: `0 ${rowGap}px` }}
        aria-busy={!!loading}
      >
        <thead className={["tb-thead", headerClassName].join(" ")}>
          <tr>
            {columns.map((c) => {
              const k = c.dataIndex ?? c.key;
              return (
                <th
                  key={c.key || k}
                  style={{ width: c.width }}
                  className={[
                    "tb-th",
                    "tb-th--head",
                    "tb-th--rounded",
                    c.align ? `tb-align-${c.align}` : "tb-align-left",
                  ].join(" ")}
                >
                  {c.title}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={["tb-tbody", bodyClassName].join(" ")}>
          {data.map((row, idx) => (
            <tr
              key={keyOf(row, idx)}
              className={[
                "tb-tr",
                striped ? (idx % 2 === 0 ? "tb-row-odd" : "tb-row-even") : "",
                "tb-tr--hover",
              ].join(" ")}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((c, ci) => {
                const k = c.dataIndex ?? c.key;
                const v = row?.[k];
                return (
                  <td
                    key={`${keyOf(row, idx)}-${c.key || c.dataIndex || ci}`}
                    className={[
                      "tb-td",
                      "tb-td--rounded",
                      c.align ? `tb-align-${c.align}` : "tb-align-left",
                    ].join(" ")}
                  >
                    {c.key === "status" ? (
                      <StatusButton initial={v} />
                    ) : typeof c.render === "function" ? (
                      c.render(row, v, c)
                    ) : (
                      v
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <div className="tb-loading">Loading…</div>}
    </div>
  );
}
