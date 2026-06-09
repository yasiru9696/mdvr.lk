import React, { useRef, useState } from 'react';
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
    mainDeviceQuantity: number;
}
const getWarrantyPeriod = (product: Product) => {
    if (product.warranty) return product.warranty;
    const name = product.name.toLowerCase();
    if (name.includes('teltonika')) return '2 years';
    if (name.includes('jimi iot') || name.includes('jimi')) return '1.5 years';
    if (name.includes('vt200-l') || name.includes('vt110-l') || name.includes('vt150-l') || name.includes('pt60-l')) return '3 years';
    if (name.includes('vg03')) return '1.5 years';
    if (name.includes('wireless fuel sensor')) return '3 years';
    return '1 year';
};

const EstimateModal: React.FC<EstimateModalProps> = ({
    isOpen,
    onClose,
    selectedSystem,
    selectedAccessories,
    mainDeviceQuantity
}) => {
    const estimateRef = useRef<HTMLDivElement>(null);
    const [subscriptionFee, setSubscriptionFee] = useState('1,500.00');

    if (!isOpen) return null;

    // Calculate installation fee based on system type and accessories
    const getInstallationFee = (): number => {
        let fee = 0;
        
        // Base system fee
        if (selectedSystem.installationFee !== undefined) {
            fee += selectedSystem.installationFee * mainDeviceQuantity;
        } else {
            // Fallback for older systems
            const basicSystemIds = ['c6d-ai-basic', 'fs-c6-lite-standard', 'ad-plus-advanced', 'jc181-dual-channel-dash-cam', 'jc182-4g-mini-dash-cam'];
            const advancedSystemIds = ['f6n-mobile-dvr', 'x3n-ai-premium'];
            if (basicSystemIds.includes(selectedSystem.id)) {
                fee += 4500 * mainDeviceQuantity;
            } else if (advancedSystemIds.includes(selectedSystem.id)) {
                fee += 7500 * mainDeviceQuantity;
            }
        }
        
        // Add accessory fees
        selectedAccessories.forEach(acc => {
            if (acc.product.installationFee !== undefined) {
                fee += (acc.product.installationFee * acc.quantity);
            }
        });

        return fee;
    };

    // Calculate totals
    const systemPrice = selectedSystem.priceValue || 0;
    const systemTotal = systemPrice * mainDeviceQuantity;
    const accessoriesTotal = selectedAccessories.reduce((total, acc) => {
        const itemPrice = acc.product.priceValue || 0;
        return total + (itemPrice * acc.quantity);
    }, 0);
    const installationFee = getInstallationFee();
    const subtotal = systemTotal + accessoriesTotal + installationFee;

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

        const mainEl = document.getElementById('estimate-main');
        const notesEl = document.getElementById('estimate-notes');

        if (!mainEl || !notesEl) return;

        try {
            const html2canvasOptions = {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            };

            const mainCanvas = await html2canvas(mainEl, html2canvasOptions);
            const notesCanvas = await html2canvas(notesEl, html2canvasOptions);

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 15; // 15mm margins on all sides
            const usableWidth = pdfWidth - (margin * 2);
            const usableHeight = pdfHeight - (margin * 2);

            // Page 1: Main Content
            let mainRatio = usableWidth / mainCanvas.width;
            let mainScaledHeight = mainCanvas.height * mainRatio;
            
            // Scale down to fit a single page if it's too tall
            if (mainScaledHeight > usableHeight) {
                mainRatio = usableHeight / mainCanvas.height;
                mainScaledHeight = mainCanvas.height * mainRatio;
            }

            const mainXOffset = (pdfWidth - (mainCanvas.width * mainRatio)) / 2;
            pdf.addImage(mainCanvas.toDataURL('image/png'), 'PNG', mainXOffset, margin, mainCanvas.width * mainRatio, mainScaledHeight);

            // Page 2: Notes Content
            pdf.addPage();
            
            let notesRatio = usableWidth / notesCanvas.width;
            let notesScaledHeight = notesCanvas.height * notesRatio;
            
            if (notesScaledHeight > usableHeight) {
                notesRatio = usableHeight / notesCanvas.height;
                notesScaledHeight = notesCanvas.height * notesRatio;
            }

            const notesXOffset = (pdfWidth - (notesCanvas.width * notesRatio)) / 2;
            pdf.addImage(notesCanvas.toDataURL('image/png'), 'PNG', notesXOffset, margin, notesCanvas.width * notesRatio, notesScaledHeight);

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
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-2 mr-2">
                            <label className="text-sm font-semibold text-gray-700">Sub. Fee (Rs):</label>
                            <input
                                type="text"
                                value={subscriptionFee}
                                onChange={(e) => setSubscriptionFee(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1.5 w-24 text-sm text-gray-800"
                            />
                        </div>
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
                    <div id="estimate-main">
                        {/* Company Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <img
                                src="/geoid-logo.png"
                                alt="GEOID Information Technologies"
                                className="h-12 mb-3"
                            />
                            <p className="text-sm font-semibold text-gray-700">Geoid Information Technologies (Pvt) Ltd</p>
                            <p className="text-sm text-gray-600">No 192/2, Mulleriyawa North,</p>
                            <p className="text-sm text-gray-600">Mulleriyawa New Town,</p>
                            <p className="text-sm text-gray-600">Sri Lanka</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-4xl font-light text-gray-600 mb-2">Estimate</h2>
                            <p className="text-sm text-gray-500"># {estimateNumber}</p>
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
                                <td className="text-center py-3 px-4">{mainDeviceQuantity}.00</td>
                                <td className="text-right py-3 px-4 text-gray-600">{selectedSystem.priceValue ? formatPrice(selectedSystem.priceValue) : '-'}</td>
                                <td className="text-right py-3 px-4 text-gray-800 font-semibold">{selectedSystem.priceValue ? formatPrice(selectedSystem.priceValue * mainDeviceQuantity) : '-'}</td>
                            </tr>

                            {/* Accessories */}
                            {selectedAccessories.map((acc, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-4">
                                        <div className="font-semibold text-gray-800">{acc.product.name.replace('(Temperature/Door)', '').trim()}</div>
                                    </td>
                                    <td className="text-center py-3 px-4">{acc.quantity}.00</td>
                                    <td className="text-right py-3 px-4 text-gray-600">{acc.product.priceValue ? formatPrice(acc.product.priceValue) : '-'}</td>
                                    <td className="text-right py-3 px-4 text-gray-800 font-semibold">{acc.product.priceValue ? formatPrice(acc.product.priceValue * acc.quantity) : '-'}</td>
                                </tr>
                            ))}

                            {/* Device Installation Fee */}
                            {(() => {
                                let sysFee = 0;
                                if (selectedSystem.installationFee !== undefined) {
                                    sysFee = selectedSystem.installationFee;
                                } else {
                                    const basicSystemIds = ['c6d-ai-basic', 'fs-c6-lite-standard', 'ad-plus-advanced', 'jc181-dual-channel-dash-cam', 'jc182-4g-mini-dash-cam'];
                                    const advancedSystemIds = ['f6n-mobile-dvr', 'x3n-ai-premium'];
                                    if (basicSystemIds.includes(selectedSystem.id)) {
                                        sysFee = 4500;
                                    } else if (advancedSystemIds.includes(selectedSystem.id)) {
                                        sysFee = 7500;
                                    }
                                }
                                if (sysFee > 0) {
                                    return (
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="font-semibold text-gray-800">Device Installation Fee</div>
                                            </td>
                                            <td className="text-center py-3 px-4">{mainDeviceQuantity}.00</td>
                                            <td className="text-right py-3 px-4 text-gray-600">{formatPrice(sysFee)}</td>
                                            <td className="text-right py-3 px-4 text-gray-800 font-semibold">{formatPrice(sysFee * mainDeviceQuantity)}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })()}

                            {/* Accessory Installation Fees */}
                            {selectedAccessories.map((acc, index) => {
                                if (acc.product.installationFee) {
                                    return (
                                        <tr key={`inst-${index}`} className="border-b border-gray-200 bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="font-semibold text-gray-800">{acc.product.name.replace('(Temperature/Door)', '').trim()} Installation Fee</div>
                                            </td>
                                            <td className="text-center py-3 px-4">{acc.quantity}.00</td>
                                            <td className="text-right py-3 px-4 text-gray-600">{formatPrice(acc.product.installationFee)}</td>
                                            <td className="text-right py-3 px-4 text-gray-800 font-semibold">{formatPrice(acc.product.installationFee * acc.quantity)}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
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
                    </div>

                    {/* Notes */}
                    <div id="estimate-notes">
                        {selectedSystem.category === 'GPS Trackers' ? (
                        <div className="bg-gray-50 p-3 rounded-lg text-[11px] text-gray-700 leading-snug">
                            <h4 className="font-bold text-gray-800 mb-1.5 text-xs">Notes:</h4>
                            
                            <p className="mb-2 font-semibold text-gray-800">
                                The monthly subscription fee will be Rs {subscriptionFee} per vehicle, excluding VAT and other applicable charges. (The data SIM card included)
                            </p>

                            <div className="space-y-2">
                                <div>
                                    <h5 className="font-bold text-gray-800 mb-0.5">Pricing, Taxes, and Validity</h5>
                                    <ul className="list-disc list-inside ml-2 text-gray-600">
                                        <li><span className="font-medium text-gray-700">Price Validity</span> - All quoted prices are valid for 30 days from the date of quotation unless stated otherwise.</li>
                                        <li><span className="font-medium text-gray-700">Exchange Rate Adjustment</span> - Prices are calculated based on an exchange rate of USD 1 = LKR 330. If the USD exchange rate fluctuates by more than ±10%, the quoted LKR prices will be adjusted accordingly.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold text-gray-800 mb-0.5">Invoicing and Payment Terms</h5>
                                    <ul className="list-disc list-inside ml-2 text-gray-600">
                                        <li><span className="font-medium text-gray-700">Invoices & Payment</span> - All invoices must be settled within 30 days from the invoice date.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold text-gray-800 mb-0.5">Warranty and Damage Policy</h5>
                                    <ul className="list-disc list-inside ml-2 text-gray-600">
                                        <li>
                                            <span className="font-medium text-gray-700">Warranty</span> - Hardware warranty is provided as follows:
                                            <ul className="list-[circle] list-inside ml-4 mt-0.5 mb-1">
                                                <li>{selectedSystem.name}: {getWarrantyPeriod(selectedSystem)}</li>
                                                {selectedAccessories.map((acc, idx) => (
                                                    <li key={`war-${idx}`}>{acc.product.name.replace('(Temperature/Door)', '').trim()}: {getWarrantyPeriod(acc.product)}</li>
                                                ))}
                                            </ul>
                                            <span className="text-[10.5px]">This warranty excludes sensor batteries and consumable items.</span>
                                        </li>
                                        <li><span className="font-medium text-gray-700">Damage Policy</span> - Any damage caused intentionally or through misuse will be fully charged to the customer.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold text-gray-800 mb-0.5">Installation and Deployment</h5>
                                    <ul className="list-disc list-inside ml-2 text-gray-600">
                                        <li><span className="font-medium text-gray-700">GPS Device Payment</span> - No advance payment is required for GPS tracking devices.</li>
                                        <li><span className="font-medium text-gray-700">Installation Timeline</span> - Installation can commence immediately, without any buffer period.</li>
                                        <li>
                                            <span className="font-medium text-gray-700">Outstation Installations</span> - For installations outside Colombo, all transportation, boarding, and lodging expenses will be borne by the customer. Transportation charges will apply for installations conducted outside our workshop. The charges are as follows:
                                            <ul className="list-[circle] list-inside ml-4 mt-0.5">
                                                <li>Bolero: Rs. 120/- per kilometer</li>
                                                <li>Bike: Rs. 70/- per kilometer</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-bold text-gray-800 mb-0.5">Technical Support</h5>
                                    <ul className="list-disc list-inside ml-2 text-gray-600">
                                        <li><span className="font-medium text-gray-700">Support Availability</span> - Online Support: 18 hrs/day, 6 days/week (urgent phone support available after hours).</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-2.5 text-center font-bold text-gray-700">
                                We look forward to doing business with you. Installation will commence upon receipt of your official Purchase Order (PO).
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-700 mb-2">Notes:</h4>
                            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                                <li>50% advance payment is required. Delivery will be made within 4 weeks of receiving the advance payment.</li>
                                <li>The monthly subscription fee will be Rs {subscriptionFee} per vehicle, excluding VAT and other applicable charges. (The data SIM card should be provided by the customer)</li>
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimateModal;
