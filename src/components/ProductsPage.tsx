import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { Check, X, ShoppingCart, FileText } from 'lucide-react';

const ProductsPage: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const navigate = useNavigate();
    const location = useLocation();

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();

        if (location.pathname !== '/') {
            // Navigate to home page first
            navigate('/');
            // Wait for navigation, then scroll
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Already on home page, just scroll
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const openProductModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Our <span className="text-primary-500">Products</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Professional Mobile DVR systems designed for reliability, performance, and safety.
                            From basic fleet monitoring to advanced AI-powered solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 px-4 bg-dark-800/50">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full transition-all ${selectedCategory === category
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 px-4">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="card group hover:border-primary-500/50 transition-all duration-300">
                                {/* Product Image */}
                                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Product Category */}
                                <span className="inline-block px-3 py-1 text-xs bg-primary-500/20 text-primary-400 rounded-full mb-3">
                                    {product.category}
                                </span>

                                {/* Product Name */}
                                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>

                                {/* Key Specs */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(typeof product.channels === 'number' ? product.channels > 1 : product.channels) && (
                                        <>
                                            <span className="text-sm text-gray-400">
                                                {typeof product.channels === 'number' ? `${product.channels} Channels` : product.channels}
                                            </span>
                                            <span className="text-sm text-gray-400">•</span>
                                        </>
                                    )}
                                    <span className="text-sm text-gray-400">{product.resolution}</span>
                                    {product.storage !== 'N/A' && (
                                        <>
                                            <span className="text-sm text-gray-400">•</span>
                                            <span className="text-sm text-gray-400">{product.storage}</span>
                                        </>
                                    )}
                                </div>

                                {/* Features Preview */}
                                <div className="mb-4">
                                    <ul className="space-y-1">
                                        {product.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-gray-400">
                                                <Check size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {product.features.length > 3 && (
                                        <p className="text-sm text-primary-400 mt-2">
                                            +{product.features.length - 3} more features
                                        </p>
                                    )}
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-semibold text-primary-400">
                                            {product.price}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProductModal(product)}
                                            className="flex-1 btn btn-outline text-sm flex items-center justify-center">
                                            <FileText size={16} className="mr-2" />
                                            View Full Specs
                                        </button>
                                        {product.category === 'Cameras & Accessories' ? (
                                            <a
                                                href="#contact"
                                                onClick={(e) => handleHashLinkClick(e, '#contact')}
                                                className="flex-1 btn btn-primary text-sm flex items-center justify-center"
                                            >
                                                <ShoppingCart size={16} className="mr-2" />
                                                Request Quote
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => navigate(`/customize/${product.id}`)}
                                                className="flex-1 btn btn-primary text-sm flex items-center justify-center"
                                            >
                                                <ShoppingCart size={16} className="mr-2" />
                                                Customize System
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Details Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={closeProductModal}
                >
                    <div
                        className="bg-dark-900 rounded-xl max-w-4xl w-full max-h-[90vh] border border-gray-800 flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header - Sticky */}
                        <div className="flex justify-between items-start p-6 border-b border-gray-800 bg-dark-900 sticky top-0 z-10">
                            <div>
                                <span className="inline-block px-3 py-1 text-xs bg-primary-500/20 text-primary-400 rounded-full mb-2">
                                    {selectedProduct.category}
                                </span>
                                <h3 className="text-3xl font-semibold">{selectedProduct.name}</h3>
                            </div>
                            <button
                                onClick={closeProductModal}
                                className="text-gray-400 hover:text-white transition-colors ml-4 flex-shrink-0"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-6 overflow-y-auto">
                            {/* Product Image */}
                            <div className="aspect-video overflow-hidden rounded-lg mb-6">
                                <img
                                    src={selectedProduct.imageUrl}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Key Specs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {(typeof selectedProduct.channels === 'number' ? selectedProduct.channels > 1 : selectedProduct.channels) && (
                                    <div className="bg-dark-800 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-primary-500">
                                            {typeof selectedProduct.channels === 'number' ? selectedProduct.channels : selectedProduct.channels}
                                        </p>
                                        <p className="text-sm text-gray-400">Channels</p>
                                    </div>
                                )}
                                <div className="bg-dark-800 p-4 rounded-lg text-center">
                                    <p className="text-sm font-semibold text-primary-500">{selectedProduct.resolution}</p>
                                    <p className="text-sm text-gray-400">Resolution</p>
                                </div>
                                {selectedProduct.storage !== 'N/A' && (
                                    <div className="bg-dark-800 p-4 rounded-lg text-center">
                                        <p className="text-sm font-semibold text-primary-500">{selectedProduct.storage}</p>
                                        <p className="text-sm text-gray-400">Storage</p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h4 className="text-xl font-semibold mb-3">Description</h4>
                                <p className="text-gray-300">{selectedProduct.description}</p>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="text-xl font-semibold mb-3">Features</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                    {selectedProduct.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start">
                                            <Check size={18} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Specifications */}
                            <div className="mb-6">
                                <h4 className="text-xl font-semibold mb-3">Technical Specifications</h4>
                                <div className="bg-dark-800 rounded-lg p-4">
                                    <div className="grid gap-3">
                                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                                            <div key={key} className="flex border-b border-gray-700 pb-2 last:border-0">
                                                <span className="font-medium text-gray-400 w-1/2">{key}</span>
                                                <span className="text-gray-200 w-1/2">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price & CTA */}
                            {selectedProduct.category === 'Cameras & Accessories' ? (
                                <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-400">Pricing</p>
                                        <p className="text-2xl font-bold text-primary-400">{selectedProduct.price}</p>
                                    </div>
                                    <a
                                        href="#contact"
                                        onClick={(e) => {
                                            closeProductModal();
                                            handleHashLinkClick(e, '#contact');
                                        }}
                                        className="btn btn-primary flex items-center justify-center"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        Request a Quote
                                    </a>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        closeProductModal();
                                        navigate(`/customize/${selectedProduct.id}`);
                                    }}
                                    className="btn btn-primary w-full flex items-center justify-center py-4 text-lg"
                                >
                                    <ShoppingCart size={20} className="mr-2" />
                                    Customize Your System
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
