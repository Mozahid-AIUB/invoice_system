import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const generateInvoicePDF = (invoice: any) => {
    const doc = new jsPDF()

    // Add header
    doc.setFontSize(20)
    doc.text('Invoice', 105, 20, { align: 'center' })

    // Add invoice details
    doc.setFontSize(12)
    doc.text(`Reference: ${invoice.reference}`, 20, 40)
    doc.text(`Customer: ${invoice.customer_name}`, 20, 50)
    doc.text(`Status: ${invoice.status}`, 20, 60)
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 20, 70)

    // Add items table
    const tableData = invoice.items.map((item: any) => [
        item.description,
        item.quantity,
        `$${Number(item.unit_price).toFixed(2)}`,
        `$${Number(item.quantity * item.unit_price).toFixed(2)}`
    ])

    doc.autoTable({
        startY: 90,
        head: [['Description', 'Qty', 'Price', 'Total']],
        body: tableData,
        foot: [[
            'Total',
            '',
            '',
            `$${Number(invoice.total).toFixed(2)}`
        ]],
        theme: 'striped',
        headStyles: { fillColor: [14, 165, 164] }
    })

    // Save PDF
    doc.save(`invoice-${invoice.reference}.pdf`)
}