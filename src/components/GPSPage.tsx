import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gpsProducts } from '../data/gpsProducts';
import { Product } from '../types';
import { Check, X, ShoppingCart, FileText } from 'lucide-react';

const GPSPage: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const navigate = useNavigate();

    const availableTags = [
        '2G', '4G', 'Portable', 'OBD',
        'Fuel', 'Door', 'Temperature', 'Driver identification', 'Waterproof', 'Audio'
    ];

    const toggleTag = (tag: string) => {
        if (tag === 'All') {
            setSelectedTags([]);
        } else {
            if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter(t => t !== tag));
            } else {
                setSelectedTags([...selectedTags, tag]);
            }
        }
    };

    // Only show the main GPS trackers, not the accessories
    const allTrackers = gpsProducts.filter(p => p.category === 'GPS Trackers');
    
    const trackers = selectedTags.length === 0
        ? allTrackers
        : allTrackers.filter(p => {
            if (!p.tags) return false;
            return selectedTags.every(tag => p.tags?.includes(tag));
        });

    const openProductModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-8 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            GPS <span className="text-primary-500">Trackers</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-2">
                            Advanced real-time tracking solutions for fleet management and personal safety.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-4 px-4 bg-dark-800/50">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => toggleTag('All')}
                            className={`px-4 py-1.5 text-sm rounded-full transition-all ${selectedTags.length === 0
                                ? 'bg-primary-500 text-white'
                                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                                }`}
                        >
                            All
                        </button>
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-1.5 text-sm rounded-full transition-all ${selectedTags.includes(tag)
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 px-4">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trackers.map((product) => (
                            <div
                                key={product.id}
                                className="card group hover:border-primary-500/50 transition-all duration-300">
                                {/* Product Image */}
                                <div className="aspect-video overflow-hidden rounded-lg mb-4 bg-dark-800">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-2">
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/gps-customize/${product.id}`)}
                                            className="flex-1 btn btn-primary text-sm flex items-center justify-center"
                                        >
                                            <ShoppingCart size={16} className="mr-2" />
                                            Customize System
                                        </button>
                                        <button
                                            onClick={() => openProductModal(product)}
                                            className="flex-1 btn border border-dark-600 hover:border-primary-500 text-sm flex items-center justify-center"
                                        >
                                            <FileText size={16} className="mr-2" />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeProductModal}>
                    <div
                        className="bg-dark-900 border border-dark-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-dark-900 border-b border-dark-700 p-4 flex justify-between items-center z-10">
                            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                            <button
                                onClick={closeProductModal}
                                className="p-2 hover:bg-dark-800 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Image & Price */}
                                <div>
                                    <div className="aspect-video overflow-hidden rounded-lg mb-6 bg-dark-800">
                                        <img
                                            src={selectedProduct.imageUrl}
                                            alt={selectedProduct.name}
                                            className="w-full h-full object-contain p-4"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                            }}
                                        />
                                    </div>
                                    <div className="bg-dark-800 rounded-lg p-6 mb-6 text-center">
                                        <div className="text-gray-400 mb-2">Starting at</div>
                                        <div className="text-3xl font-bold text-primary-500">
                                            {selectedProduct.priceValue ? `Rs. ${selectedProduct.priceValue.toLocaleString()}` : selectedProduct.price}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/gps-customize/${selectedProduct.id}`)}
                                            className="w-full btn btn-primary mt-4 flex items-center justify-center"
                                        >
                                            <ShoppingCart size={18} className="mr-2" />
                                            Customize & Get Quote
                                        </button>
                                    </div>
                                </div>

                                {/* Right Column: Details */}
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Description</h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        {selectedProduct.description}
                                    </p>

                                    <h3 className="text-xl font-bold mb-4">Key Features</h3>
                                    <ul className="space-y-2 mb-6">
                                        {selectedProduct.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check size={20} className="text-primary-500 mr-2 flex-shrink-0 mt-1" />
                                                <span className="text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <h3 className="text-xl font-bold mb-4">Specifications</h3>
                                    <div className="bg-dark-800 rounded-lg overflow-hidden">
                                        {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                                            <div
                                                key={key}
                                                className={`flex p-3 ${index % 2 === 0 ? 'bg-dark-800/50' : 'bg-transparent'
                                                    }`}
                                            >
                                                <span className="w-1/3 font-semibold text-gray-400">{key}</span>
                                                <span className="w-2/3 text-gray-300">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GPSPage;
