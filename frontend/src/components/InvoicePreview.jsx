import { FileText, User, Mail, Phone, MapPin, CreditCard, Package, Calendar } from 'lucide-react'

const InvoicePreview = ({ orderData, receiptData }) => {
  const paymentMethodNames = {
    credit: 'Tarjeta de Crédito/Débito',
    yape: 'Yape/Plin',
    transfer: 'Transferencia Bancaria',
    cash: 'Pago contra entrega'
  }

  return (
    <>
      <style>{`
        .invoice-preview {
          background: #fff;
          color: #333;
          border-radius: 16px;
          padding: 2.5rem;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .invoice-header {
          text-align: center;
          padding-bottom: 2rem;
          border-bottom: 3px solid #FF4500;
          margin-bottom: 2rem;
        }

        .invoice-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          letter-spacing: 4px;
          color: #FF4500;
          margin: 0 0 0.5rem 0;
        }

        .invoice-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 2px;
          color: #666;
          margin: 0;
        }

        .invoice-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 1.5px;
          color: #FF4500;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .invoice-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .invoice-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .field-label {
          font-size: 0.75rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .field-value {
          font-size: 0.95rem;
          color: #333;
          font-weight: 500;
        }

        .invoice-items {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
        }

        .items-table th {
          text-align: left;
          font-size: 0.75rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .items-table td {
          padding: 0.75rem 0;
          border-bottom: 1px solid #e8e8e8;
          font-size: 0.9rem;
        }

        .items-table tr:last-child td {
          border-bottom: none;
        }

        .item-name {
          font-weight: 600;
          color: #333;
        }

        .item-details {
          font-size: 0.8rem;
          color: #666;
          margin-top: 0.25rem;
        }

        .invoice-totals {
          background: linear-gradient(135deg, #FF4500 0%, #ff6a35 100%);
          color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }

        .total-row:not(:last-child) {
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .total-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .total-value {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .total-final {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem !important;
          letter-spacing: 1px;
        }

        .invoice-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid #f0f0f0;
        }

        .footer-message {
          font-size: 1.1rem;
          color: #4ade80;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .footer-info {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.6;
        }

        .receipt-badge {
          display: inline-block;
          background: #4ade80;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .invoice-preview {
            padding: 1.5rem;
          }

          .invoice-grid {
            grid-template-columns: 1fr;
          }

          .items-table {
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="invoice-preview">
        {/* Header */}
        <div className="invoice-header">
          <h1 className="invoice-logo">SPORTA</h1>
          <h2 className="invoice-title">Comprobante de Compra</h2>
          <div className="receipt-badge">✓ PEDIDO CONFIRMADO</div>
        </div>

        {/* Receipt Info */}
        <div className="invoice-section">
          <h3 className="section-title">
            <FileText size={20} />
            Información del Comprobante
          </h3>
          <div className="invoice-grid">
            <div className="invoice-field">
              <span className="field-label">Número de Comprobante</span>
              <span className="field-value">{receiptData.receiptNumber}</span>
            </div>
            <div className="invoice-field">
              <span className="field-label">Número de Pedido</span>
              <span className="field-value">#{orderData.orderId || 'N/A'}</span>
            </div>
            <div className="invoice-field">
              <span className="field-label">Fecha</span>
              <span className="field-value">{receiptData.receiptDate}</span>
            </div>
            <div className="invoice-field">
              <span className="field-label">Método de Pago</span>
              <span className="field-value">{paymentMethodNames[orderData.paymentMethod] || receiptData.bankName}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="invoice-section">
          <h3 className="section-title">
            <User size={20} />
            Información del Cliente
          </h3>
          <div className="invoice-grid">
            <div className="invoice-field">
              <span className="field-label">Nombre</span>
              <span className="field-value">{orderData.name}</span>
            </div>
            <div className="invoice-field">
              <span className="field-label">Email</span>
              <span className="field-value">{orderData.email}</span>
            </div>
            <div className="invoice-field">
              <span className="field-label">Teléfono</span>
              <span className="field-value">{orderData.phone}</span>
            </div>
            <div className="invoice-field">
              <span className="field-label">Dirección</span>
              <span className="field-value">
                {orderData.address === 'Recojo en tienda' 
                  ? 'Recojo en tienda' 
                  : `${orderData.address}, ${orderData.district}`}
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="invoice-section">
          <h3 className="section-title">
            <Package size={20} />
            Productos
          </h3>
          <div className="invoice-items">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th style={{ textAlign: 'center' }}>Cant.</th>
                  <th style={{ textAlign: 'right' }}>Precio</th>
                  <th style={{ textAlign: 'right' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="item-name">{item.name}</div>
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="item-details">
                          {item.selectedSize && `Talla: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ' • '}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>S/ {item.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="invoice-totals">
          <div className="total-row">
            <span className="total-label">Subtotal:</span>
            <span className="total-value">S/ {orderData.subtotal.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span className="total-label">Envío:</span>
            <span className="total-value">
              {orderData.shipping === 0 ? '¡GRATIS!' : `S/ ${orderData.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="total-row">
            <span className="total-label">TOTAL:</span>
            <span className="total-value total-final">S/ {orderData.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <p className="footer-message">¡Gracias por tu compra!</p>
          <p className="footer-info">
            Este comprobante ha sido enviado a tu correo electrónico.<br />
            Tiempo estimado de entrega: {orderData.deliveryType === 'delivery' ? '2-3 días hábiles' : '24-48 horas'}
          </p>
        </div>
      </div>
    </>
  )
}

export default InvoicePreview
