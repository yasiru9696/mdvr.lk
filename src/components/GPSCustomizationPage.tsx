import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gpsProducts } from '../data/gpsProducts';
import { Product } from '../types';
import { ShoppingCart, Plus, Minus, X, Package } from 'lucide-react';
import EstimateModal from './EstimateModal';

interface SelectedAccessory {
    product: Product;
    quantity: number;
}

const GPSCustomizationPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    const selectedSystem = gpsProducts.find(p => p.id === productId);
    const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessory[]>([]);
    const [mainDeviceQuantity, setMainDeviceQuantity] = useState<number>(1);
    const [showEstimateModal, setShowEstimateModal] = useState(false);

    if (!selectedSystem) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">GPS Device Not Found</h1>
                    <button onClick={() => navigate('/gps')} className="btn btn-primary">
                        Back to GPS Trackers
                    </button>
                </div>
            </div>
        );
    }

    // Get compatible accessories
    const compatibleAccessories = selectedSystem.compatibleWith
        ? gpsProducts.filter(p => selectedSystem.compatibleWith?.includes(p.id))
        : [];

    const checkWirelessLimitAbsolute = (newQty: number, accessoryId: string): number => {
        if (!selectedSystem?.id.startsWith('teltonika')) return newQty;
        const isWireless = accessoryId === 'gps-acc-fuel-wireless' || accessoryId === 'gps-acc-temp-wireless';
        if (!isWireless) return newQty;

        const otherWirelessQty = selectedAccessories
            .filter(a => (a.product.id === 'gps-acc-fuel-wireless' || a.product.id === 'gps-acc-temp-wireless') && a.product.id !== accessoryId)
            .reduce((sum, a) => sum + a.quantity, 0);
        
        const limit = 4 * mainDeviceQuantity;
        if (otherWirelessQty + newQty > limit) {
            alert(`Teltonika devices support a maximum of 4 wireless accessories per device (Total limit: ${limit}).`);
            return limit - otherWirelessQty;
        }
        return newQty;
    };

    const handleAddAccessory = (accessory: Product) => {
        const existing = selectedAccessories.find(a => a.product.id === accessory.id);
        if (existing) {
            const cappedQty = checkWirelessLimitAbsolute(existing.quantity + 1, accessory.id);
            if (cappedQty === existing.quantity && existing.quantity + 1 > cappedQty) return;
            
            setSelectedAccessories(selectedAccessories.map(a =>
                a.product.id === accessory.id
                    ? { ...a, quantity: cappedQty }
                    : a
            ));
        } else {
            const cappedQty = checkWirelessLimitAbsolute(mainDeviceQuantity, accessory.id);
            if (cappedQty <= 0) return;
            setSelectedAccessories([...selectedAccessories, { product: accessory, quantity: cappedQty }]);
        }
    };

    const handleRemoveAccessory = (accessoryId: string) => {
        setSelectedAccessories(selectedAccessories.filter(a => a.product.id !== accessoryId));
    };

    const handleUpdateQuantity = (accessoryId: string, delta: number) => {
        setSelectedAccessories(selectedAccessories.map(a => {
            if (a.product.id === accessoryId) {
                let newQuantity = Math.max(1, a.quantity + delta);
                if (delta > 0) {
                    newQuantity = Math.max(a.quantity, checkWirelessLimitAbsolute(newQuantity, accessoryId));
                }
                return { ...a, quantity: newQuantity };
            }
            return a;
        }));
    };

    const handleQuantityInputChange = (accessoryId: string, value: number) => {
        setSelectedAccessories(selectedAccessories.map(a => {
            if (a.product.id === accessoryId) {
                let newQuantity = Math.max(1, value);
                if (newQuantity > a.quantity) {
                    newQuantity = Math.max(a.quantity, checkWirelessLimitAbsolute(newQuantity, accessoryId));
                }
                return { ...a, quantity: newQuantity };
            }
            return a;
        }));
    };

    const handleMainQuantityChange = (delta: number) => {
        setMainDeviceQuantity(prev => Math.max(1, prev + delta));
    };

    const handleMainQuantityInputChange = (value: number) => {
        setMainDeviceQuantity(Math.max(1, value));
    };

    const handleRequestQuote = () => {
        setShowEstimateModal(true);
    };

    return (
        <div className="min-h-screen bg-dark-900 pt-24 pb-12">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Customize Configuration</h1>
                        <p className="text-gray-400">Add accessories to your GPS tracking system</p>
                    </div>
                    <button onClick={() => navigate('/gps')} className="text-gray-400 hover:text-white transition-colors">
                        Back to GPS Trackers
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: System & Accessories Selection */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Base System */}
                        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <Package className="mr-2 text-primary-500" />
                                Selected Device
                            </h2>
                            <div className="flex gap-6">
                                <div className="w-32 h-32 bg-dark-900 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={selectedSystem.imageUrl}
                                        alt={selectedSystem.name}
                                        className="w-full h-full object-contain p-2"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{selectedSystem.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{selectedSystem.description}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary-500 font-bold text-lg">
                                            {selectedSystem.priceValue ? `Rs. ${selectedSystem.priceValue.toLocaleString()}` : selectedSystem.price}
                                        </div>
                                        <div className="flex items-center bg-dark-900 rounded-lg border border-dark-700">
                                            <button
                                                onClick={() => handleMainQuantityChange(-1)}
                                                className="p-2 hover:text-primary-500 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={mainDeviceQuantity}
                                                onChange={(e) => handleMainQuantityInputChange(parseInt(e.target.value) || 1)}
                                                className="w-16 text-center bg-transparent border-none focus:ring-0 font-semibold appearance-none text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <button
                                                onClick={() => handleMainQuantityChange(1)}
                                                className="p-2 hover:text-primary-500 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-sm mt-2">
                                        Installation: Rs. {selectedSystem.installationFee?.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accessories Selection */}
                        {compatibleAccessories.length > 0 && (
                            <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                                <h2 className="text-xl font-bold mb-6">Available Accessories</h2>
                                <div className="space-y-4">
                                    {compatibleAccessories.map(accessory => {
                                        const isSelected = selectedAccessories.some(a => a.product.id === accessory.id);

                                        return (
                                            <div
                                                key={accessory.id}
                                                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${isSelected
                                                    ? 'border-primary-500 bg-primary-500/5'
                                                    : 'border-dark-700 bg-dark-900'
                                                    }`}
                                            >
                                                <div className="w-20 h-20 bg-dark-800 rounded overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={accessory.imageUrl}
                                                        alt={accessory.name}
                                                        className="w-full h-full object-contain p-2"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-semibold">{accessory.name}</h3>
                                                    <div className="text-sm text-gray-400 line-clamp-1">{accessory.description}</div>
                                                    <div className="text-primary-500 text-sm font-semibold mt-1">
                                                        {accessory.priceValue ? `Rs. ${accessory.priceValue.toLocaleString()}` : accessory.price}
                                                    </div>
                                                </div>

                                                <div className="flex-shrink-0 flex items-center gap-3">
                                                    {!isSelected ? (
                                                        <button
                                                            onClick={() => handleAddAccessory(accessory)}
                                                            className="btn btn-primary text-sm whitespace-nowrap"
                                                        >
                                                            Add to Configuration
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center bg-dark-800 rounded-lg">
                                                                <button
                                                                    onClick={() => handleUpdateQuantity(accessory.id, -1)}
                                                                    className="p-2 hover:text-primary-500 transition-colors"
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    value={selectedAccessories.find(a => a.product.id === accessory.id)?.quantity || 1}
                                                                    onChange={(e) => handleQuantityInputChange(accessory.id, parseInt(e.target.value) || 1)}
                                                                    className="w-12 text-center bg-transparent border-none focus:ring-0 font-semibold appearance-none text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                />
                                                                <button
                                                                    onClick={() => handleUpdateQuantity(accessory.id, 1)}
                                                                    className="p-2 hover:text-primary-500 transition-colors"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => handleRemoveAccessory(accessory.id)}
                                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-dark-800 rounded-lg"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Configuration Summary</h2>

                            <div className="space-y-4 mb-6">
                                {/* Base System Summary */}
                                <div className="flex justify-between items-start pb-4 border-b border-dark-700">
                                    <div className="flex-1 pr-4">
                                        <div className="font-semibold text-gray-200">
                                            {selectedSystem.name}
                                            <span className="text-gray-400 ml-2 text-sm">x{mainDeviceQuantity}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">Base System</div>
                                    </div>
                                    <div className="font-semibold text-primary-500">
                                        {selectedSystem.priceValue ? `Rs. ${(selectedSystem.priceValue * mainDeviceQuantity).toLocaleString()}` : 'Quote'}
                                    </div>
                                </div>

                                {/* Accessories Summary */}
                                {selectedAccessories.map((item) => (
                                    <div key={item.product.id} className="flex justify-between items-start pb-4 border-b border-dark-700">
                                        <div className="flex-1 pr-4">
                                            <div className="font-semibold text-gray-200">
                                                {item.product.name}
                                                <span className="text-gray-400 ml-2 text-sm">x{item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="font-semibold text-primary-500 whitespace-nowrap">
                                            {item.product.priceValue ? `Rs. ${(item.product.priceValue * item.quantity).toLocaleString()}` : 'Quote'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleRequestQuote}
                                className="w-full btn btn-primary flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} />
                                Generate Quote for This Configuration
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <EstimateModal
                isOpen={showEstimateModal}
                onClose={() => setShowEstimateModal(false)}
                selectedSystem={selectedSystem}
                selectedAccessories={selectedAccessories}
                mainDeviceQuantity={mainDeviceQuantity}
            />
        </div>
    );
};

export default GPSCustomizationPage;
