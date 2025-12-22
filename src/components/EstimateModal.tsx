import React, { useRef } from 'react';
import { X, Download } from 'lucide-react';
import { Product } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface SelectedAccessory {
    product: Product;
    quantity: number;
}

interface EstimateModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSystem: Product;
    selectedAccessories: SelectedAccessory[];
}

const EstimateModal: React.FC<EstimateModalProps> = ({
    isOpen,
    onClose,
    selectedSystem,
    selectedAccessories
}) => {
    const estimateRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    // Calculate installation fee based on system type
    const getInstallationFee = (systemId: string): number => {
        const basicSystemIds = ['c6d-ai-basic', 'fs-c6-lite-standard', 'ad-plus-advanced'];
        const advancedSystemIds = ['f6n-mobile-dvr', 'x3n-ai-premium'];

        if (basicSystemIds.includes(systemId)) {
            return 4500;
        } else if (advancedSystemIds.includes(systemId)) {
            return 7500;
        }
        return 0;
    };

    // Calculate totals
    const systemPrice = selectedSystem.priceValue || 0;
    const accessoriesTotal = selectedAccessories.reduce((total, acc) => {
        const itemPrice = acc.product.priceValue || 0;
        return total + (itemPrice * acc.quantity);
    }, 0);
    const installationFee = getInstallationFee(selectedSystem.id);
    const subtotal = systemPrice + accessoriesTotal + installationFee;

    // Calculate SSCL (2.5% of subtotal)
    const sscl = subtotal * 0.025;

    // Calculate VAT (18% of subtotal + SSCL)
    const vat = (subtotal + sscl) * 0.18;

    // Calculate final total
    const total = subtotal + sscl + vat;

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const generateEstimateNumber = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `EST-MobileDVR${year}${month}${day}${random}`;
    };

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 30);

    const estimateNumber = generateEstimateNumber();

    const handleDownloadPDF = async () => {
        if (!estimateRef.current) return;

        try {
            const canvas = await html2canvas(estimateRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`${estimateNumber}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Controls */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-gray-800">Configuration Estimate</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X size={24} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Estimate Content */}
                <div ref={estimateRef} className="p-8 bg-white text-gray-900">
                    {/* Company Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mobile DVR Solutions</h1>
                            <p className="text-sm text-gray-600">Professional Vehicle Surveillance Systems</p>
                            <p className="text-sm text-gray-600">Sri Lanka</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold text-gray-700 mb-2">Estimate</h2>
                            <p className="text-sm text-gray-600"># {estimateNumber}</p>
                        </div>
                    </div>

                    {/* Watermark & Dates */}
                    <div className="mb-8">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                            <p className="text-sm text-yellow-800 font-semibold">
                                ⚠️ This is a system-generated estimate. Please contact us for an official estimate.
                            </p>
                        </div>
                        <div className="flex justify-end gap-8">
                            <div>
                                <span className="text-gray-600 text-sm">Estimate Date: </span>
                                <span className="font-semibold text-sm">{formatDate(today)}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 text-sm">Expiry Date: </span>
                                <span className="font-semibold text-sm">{formatDate(expiryDate)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="text-left py-3 px-4 font-semibold">Item & Description</th>
                                <th className="text-center py-3 px-4 font-semibold w-20">Qty</th>
                                <th className="text-right py-3 px-4 font-semibold w-40">Rate</th>
                                <th className="text-right py-3 px-4 font-semibold w-40">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Base System */}
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-4">
                                    <div className="font-semibold text-gray-800">{selectedSystem.name}</div>
                                </td>
                                <td className="text-center py-3 px-4">1.00</td>
                                <td className="text-right py-3 px-4 text-gray-600">{selectedSystem.priceValue ? formatPrice(selectedSystem.priceValue) : '-'}</td>
                                <td className="text-right py-3 px-4 text-gray-800 font-semibold">{selectedSystem.priceValue ? formatPrice(selectedSystem.priceValue) : '-'}</td>
                            </tr>

                            {/* Accessories */}
                            {selectedAccessories.map((acc, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-4">
                                        <div className="font-semibold text-gray-800">{acc.product.name}</div>
                                    </td>
                                    <td className="text-center py-3 px-4">{acc.quantity}.00</td>
                                    <td className="text-right py-3 px-4 text-gray-600">{acc.product.priceValue ? formatPrice(acc.product.priceValue) : '-'}</td>
                                    <td className="text-right py-3 px-4 text-gray-800 font-semibold">{acc.product.priceValue ? formatPrice(acc.product.priceValue * acc.quantity) : '-'}</td>
                                </tr>
                            ))}

                            {/* Installation Fee */}
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <td className="py-3 px-4">
                                    <div className="font-semibold text-gray-800">Installation Fee</div>
                                </td>
                                <td className="text-center py-3 px-4">1.00</td>
                                <td className="text-right py-3 px-4 text-gray-600">{formatPrice(installationFee)}</td>
                                <td className="text-right py-3 px-4 text-gray-800 font-semibold">{formatPrice(installationFee)}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end mb-8">
                        <div className="w-80">
                            <div className="flex justify-between py-2 border-b border-gray-300">
                                <span className="text-gray-700">Sub Total</span>
                                <span className="font-semibold">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-300">
                                <span className="text-gray-700">SSCL (2.5%)</span>
                                <span className="font-semibold">{formatPrice(sscl)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-300">
                                <span className="text-gray-700">VAT (18%)</span>
                                <span className="font-semibold">{formatPrice(vat)}</span>
                            </div>
                            <div className="flex justify-between py-3 bg-gray-100 px-3 rounded mt-2">
                                <span className="text-lg font-bold text-gray-800">Total</span>
                                <span className="text-lg font-bold text-gray-800">{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Notes:</h4>
                        <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                            <li>50% advance payment is required. Delivery will be made within 4 weeks of receiving the advance payment.</li>
                            <li>The monthly subscription fee will be Rs 1,500.00 per vehicle, including VAT and other applicable charges. (The data SIM card should be provided by the customer)</li>
                            <li>Transportation charges will apply for installations conducted outside our workshop. The charges are as follows:
                                <ul className="ml-6 mt-1 list-disc list-inside">
                                    <li>Bolero: Rs. 90/- per kilometer</li>
                                    <li>Bike: Rs. 50/- per kilometer</li>
                                </ul>
                            </li>
                            <li>All devices come with a one (1) year warranty period from the date of installation.</li>
                        </ol>
                        <p className="text-xs text-gray-600 mt-3 italic">
                            Looking forward to your business. Installation will be done after receiving the payment. Please send your remittance to our bank account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimateModal;
