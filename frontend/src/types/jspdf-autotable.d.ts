// Extend jsPDF type to include autoTable for TypeScript
import 'jspdf';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (...args: any[]) => jsPDF;
    }
}
