import React, { useState, useEffect } from 'react';
import { gpsProducts } from '../data/gpsProducts';
import { products as mdvrProducts } from '../data/products';
import { Product } from '../types';

const AdminSettings: React.FC = () => {
    const [overrides, setOverrides] = useState<Record<string, { priceValue?: number, installationFee?: number, warranty?: string }>>({});
    const [savedMessage, setSavedMessage] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('productOverrides');
            if (saved) {
                setOverrides(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load overrides', e);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('productOverrides', JSON.stringify(overrides));
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
        // Force reload to apply changes to imported arrays immediately
        window.location.reload();
    };

    const handleUpdate = (productId: string, field: 'priceValue' | 'installationFee' | 'warranty', value: any) => {
        setOverrides(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    const renderProductRow = (product: Product) => {
        const productOverrides = overrides[product.id] || {};
        
        return (
            <tr key={product.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                <td className="p-3 text-sm text-gray-300 w-1/4">
                    <div className="font-semibold text-white">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.id}</div>
                </td>
                <td className="p-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Default: Rs. {product.originalPriceValue !== undefined ? product.originalPriceValue : (product.priceValue || 0)}</span>
                        <input
                            type="number"
                            className="bg-dark-900 border border-dark-600 rounded px-2 py-1 text-sm text-white focus:border-primary-500 outline-none w-32"
                            value={productOverrides.priceValue !== undefined ? productOverrides.priceValue : (product.priceValue || '')}
                            onChange={(e) => handleUpdate(product.id, 'priceValue', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </td>
                <td className="p-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Default: Rs. {product.originalInstallationFee !== undefined ? product.originalInstallationFee : (product.installationFee || 0)}</span>
                        <input
                            type="number"
                            className="bg-dark-900 border border-dark-600 rounded px-2 py-1 text-sm text-white focus:border-primary-500 outline-none w-32"
                            value={productOverrides.installationFee !== undefined ? productOverrides.installationFee : (product.installationFee || '')}
                            onChange={(e) => handleUpdate(product.id, 'installationFee', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </td>
                <td className="p-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Default rule applies if empty</span>
                        <input
                            type="text"
                            placeholder="e.g. 2 years"
                            className="bg-dark-900 border border-dark-600 rounded px-2 py-1 text-sm text-white focus:border-primary-500 outline-none w-full"
                            value={productOverrides.warranty !== undefined ? productOverrides.warranty : (product.warranty || '')}
                            onChange={(e) => handleUpdate(product.id, 'warranty', e.target.value)}
                        />
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="container mx-auto px-4 py-32">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Product Pricing & Warranty Administration</h1>
                    <p className="text-gray-400">Configure prices, installation fees, and warranty data. These changes are saved in your local browser storage.</p>
                </div>
                <div className="flex items-center gap-4">
                    {savedMessage && <span className="text-green-500 font-semibold">Changes saved successfully! Reloading...</span>}
                    <button
                        onClick={handleSave}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                        Save Settings
                    </button>
                </div>
            </div>

            <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden mb-12">
                <div className="bg-dark-900/50 px-6 py-4 border-b border-dark-700">
                    <h2 className="text-xl font-bold text-primary-500">GPS Trackers & Accessories</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-dark-900/30 text-gray-400 text-sm border-b border-dark-700">
                                <th className="p-4 font-semibold">Product</th>
                                <th className="p-4 font-semibold">Price Value (Rs.)</th>
                                <th className="p-4 font-semibold">Installation Fee (Rs.)</th>
                                <th className="p-4 font-semibold">Warranty Overide</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gpsProducts.map(renderProductRow)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden mb-8">
                <div className="bg-dark-900/50 px-6 py-4 border-b border-dark-700">
                    <h2 className="text-xl font-bold text-primary-500">MDVR Systems & Accessories</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-dark-900/30 text-gray-400 text-sm border-b border-dark-700">
                                <th className="p-4 font-semibold">Product</th>
                                <th className="p-4 font-semibold">Price Value (Rs.)</th>
                                <th className="p-4 font-semibold">Installation Fee (Rs.)</th>
                                <th className="p-4 font-semibold">Warranty Overide</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mdvrProducts.map(renderProductRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
