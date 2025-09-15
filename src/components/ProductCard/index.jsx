import React from "react";
import Button from "../common/Button/index";
import CategoryTag from "../CategoryTag/index";
import "./index.css";

export default function ProductCard({
  product,
  categoryName,
  onEdit,
  onDelete,
}) {
  const { name, description, price, quantity, imageUrl, categoryId } = product || {};
  const lowStock = typeof quantity === "number" && quantity <= 5;

  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-image">
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <img src="logo.png" alt={name} />
        )}
      </div>

      <div className="product-header">
        <h3 className="product-title">{name}</h3>
        <div className="product-price">
          <div className="product-price__value">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price ?? 0)}
          </div>
        </div>
      </div>

      <div className="product-meta">
        <CategoryTag name={categoryName || categoryId} variant="blue" />
        <span className={`qty-badge ${lowStock ? "qty-badge--low" : "qty-badge--ok"}`}>
          Qty: {quantity ?? 0}
        </span>
      </div>

      {description && (
        <p className="product-desc">
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </p>
      )}


      <div className="product-actions">
        <Button size="small" icon="Edit" onClick={() => onEdit?.(product)}></Button>
        <Button size="small" icon="Trash" variant="danger" onClick={() => onDelete?.(product)}></Button>
      </div>
    </div>
  );
}
