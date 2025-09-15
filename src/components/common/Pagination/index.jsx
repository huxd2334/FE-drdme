import Button from "../Button/index";

export default function Pagination({ page = 1, totalPages = 1, onPageChange, disabled }) {
  const safeTotal = Math.max(1, Number(totalPages || 1));
  const safePage = Math.min(Math.max(1, Number(page || 1)), safeTotal);

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={() => onPageChange(safePage - 1)} disabled={disabled || safePage <= 1}>
        Prev
      </Button>
      <span className="text-sm">
        Page <b>{safePage}</b> / <b>{safeTotal}</b>
      </span>
      <Button onClick={() => onPageChange(safePage + 1)} disabled={disabled || safePage >= safeTotal}>
        Next
      </Button>
    </div>
  );
}
