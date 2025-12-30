import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { Check, ShoppingCart, Plus, Minus, X, Package } from 'lucide-react';
import EstimateModal from './EstimateModal';

interface SelectedAccessory {
    product: Product;
    quantity: number;
}

const CustomizationPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    const selectedSystem = products.find(p => p.id === productId);
    const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessory[]>([]);
    const [showEstimateModal, setShowEstimateModal] = useState(false);

    if (!selectedSystem) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">System Not Found</h1>
                    <button onClick={() => navigate('/products')} className="btn btn-primary">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    // Get compatible accessories
    const compatibleAccessories = selectedSystem.compatibleWith
        ? products.filter(p => selectedSystem.compatibleWith?.includes(p.id))
        : [];

    // Helper function to calculate total AHD camera count for F6N system
    const getF6NAHDCameraCount = () => {
        if (selectedSystem?.id !== 'f6n-mobile-dvr') return 0;
        const ahdCameraIds = ['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'];
        return selectedAccessories
            .filter(a => ahdCameraIds.includes(a.product.id))
            .reduce((total, a) => total + a.quantity, 0);
    };

    // Helper function to calculate total MicroSD card count for systems that support multiple cards
    const getTotalMicroSDCount = () => {
        const systemsWithMultipleMicroSD = ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'];
        if (!systemsWithMultipleMicroSD.includes(selectedSystem?.id || '')) return 0;
        const microsdIds = ['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'];
        return selectedAccessories
            .filter(a => microsdIds.includes(a.product.id))
            .reduce((total, a) => total + a.quantity, 0);
    };

    // Helper functions for X3N Mobile DVR System camera counts
    const getX3NIPCCameraCount = () => {
        if (selectedSystem?.id !== 'x3n-ai-premium') return 0;
        const ipcCameraIds = ['1080p-ipc-waterproof-camera', 'dsm-camera-kit'];
        return selectedAccessories
            .filter(a => ipcCameraIds.includes(a.product.id))
            .reduce((total, a) => total + a.quantity, 0);
    };

    const getX3NAHDCameraCount = () => {
        if (selectedSystem?.id !== 'x3n-ai-premium') return 0;
        const ahdCameraIds = ['ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera', 'ca20s-adas-camera'];
        return selectedAccessories
            .filter(a => ahdCameraIds.includes(a.product.id))
            .reduce((total, a) => total + a.quantity, 0);
    };

    const handleAddAccessory = (accessory: Product) => {
        const existing = selectedAccessories.find(a => a.product.id === accessory.id);
        if (existing) {
            // For F6N: Check AHD camera count before allowing increment
            if (selectedSystem?.id === 'f6n-mobile-dvr') {
                const f6nAHDCameraIds = ['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'];
                if (f6nAHDCameraIds.includes(accessory.id)) {
                    const currentAHDCount = getF6NAHDCameraCount();
                    if (currentAHDCount >= 4) {
                        // Don't increment, already at max 4 AHD cameras
                        return;
                    }
                    // CA29P can only have quantity of 1
                    if (accessory.id === 'ca29p-dms-camera' && existing.quantity >= 1) {
                        return;
                    }
                }
            }

            // For systems with multiple MicroSD support: Check total MicroSD count before allowing increment
            const microsdIds = ['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'];
            const systemsWithMultipleMicroSD = ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'];
            if (systemsWithMultipleMicroSD.includes(selectedSystem?.id || '') && microsdIds.includes(accessory.id)) {
                const totalMicroSDCount = getTotalMicroSDCount();
                if (totalMicroSDCount >= 2) {
                    // Don't increment, already at max 2 total MicroSD cards
                    return;
                }
            }

            // For C6D AI system, limit to 2 external cameras maximum
            const maxQuantity = selectedSystem?.id === 'c6d-ai-basic' ? 2 : 99;

            // For X3N: Check camera limits before allowing increment
            let allowIncrement = true;
            if (selectedSystem?.id === 'x3n-ai-premium') {
                const ipcCameraIds = ['1080p-ipc-waterproof-camera'];
                const ahdCameraIds = ['ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera', 'ca20s-adas-camera'];

                if (ipcCameraIds.includes(accessory.id) && getX3NIPCCameraCount() >= 4) {
                    allowIncrement = false;
                } else if (ahdCameraIds.includes(accessory.id) && getX3NAHDCameraCount() >= 4) {
                    allowIncrement = false;
                }
            }

            if (existing.quantity < maxQuantity && allowIncrement) {
                setSelectedAccessories(selectedAccessories.map(a =>
                    a.product.id === accessory.id
                        ? { ...a, quantity: a.quantity + 1 }
                        : a
                ));
            }
        } else {
            // MicroSD cards - all systems can have up to 2 total cards from any combination
            const microsdIds = ['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'];
            const systemsRequiringMicroSD = ['c6d-ai-basic', 'fs-c6-lite-standard', 'ad-plus-advanced', 'f6n-mobile-dvr'];

            if (systemsRequiringMicroSD.includes(selectedSystem?.id || '') && microsdIds.includes(accessory.id)) {
                // All systems: allow up to 2 total MicroSD cards from any combination
                const totalMicroSDCount = getTotalMicroSDCount();
                if (totalMicroSDCount >= 2) {
                    // Don't add, already at max 2 total MicroSD cards
                    return;
                }
            }

            // For F6N Mobile DVR: Complex camera restrictions
            if (selectedSystem?.id === 'f6n-mobile-dvr') {
                const f6nAHDCameraIds = ['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'];

                if (f6nAHDCameraIds.includes(accessory.id)) {
                    // Check if trying to add CA29P when one already exists
                    if (accessory.id === 'ca29p-dms-camera') {
                        const hasCA29P = selectedAccessories.some(a => a.product.id === 'ca29p-dms-camera');
                        if (hasCA29P) {
                            // Don't add, only one CA29P allowed
                            return;
                        }
                    }

                    // Check total AHD camera count (max 4 for F6N)
                    const currentAHDCount = getF6NAHDCameraCount();
                    if (currentAHDCount >= 4) {
                        // Don't add, already at max 4 AHD cameras
                        return;
                    }
                }
            }

            // For AD-PLUS 2.0: Check if trying to add AHD camera when another AHD camera is already selected
            const ahdCameraIds = ['ahd-outdoor-camera', '720p-ahd-outdoor-camera'];
            if (selectedSystem?.id === 'ad-plus-advanced' && ahdCameraIds.includes(accessory.id)) {
                // Check if any other AHD camera is already selected
                const hasOtherAHDCamera = selectedAccessories.some(a =>
                    ahdCameraIds.includes(a.product.id) && a.product.id !== accessory.id
                );
                if (hasOtherAHDCamera) {
                    // Don't add, only one AHD camera type allowed
                    return;
                }
            }

            // For X3N: Only allow ONE hard drive since it has 1x 2.5" SATA slot
            const hardDriveIds = ['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'];
            if (selectedSystem?.id === 'x3n-ai-premium' && hardDriveIds.includes(accessory.id)) {
                // Check if any other hard drive is already selected
                const hasOtherHardDrive = selectedAccessories.some(a =>
                    hardDriveIds.includes(a.product.id) && a.product.id !== accessory.id
                );
                if (hasOtherHardDrive) {
                    // Don't add, only one hard drive allowed
                    return;
                }
            }

            // For X3N: Only allow ONE DSM Camera Kit
            // Note: DSM counts as IPC camera, so it's also checked in IPC limit below
            if (selectedSystem?.id === 'x3n-ai-premium' && accessory.id === 'dsm-camera-kit') {
                const hasDSMCam = selectedAccessories.some(a => a.product.id === 'dsm-camera-kit');
                if (hasDSMCam) {
                    return; // Max 1 allowed
                }
            }

            // For X3N: CA20S ADAS Camera requires DSM Camera Kit and Max 1
            if (selectedSystem?.id === 'x3n-ai-premium' && accessory.id === 'ca20s-adas-camera') {
                const hasDSMCam = selectedAccessories.some(a => a.product.id === 'dsm-camera-kit');
                if (!hasDSMCam) {
                    // Requires DSM Camera Kit
                    return;
                }
                const hasCA20S = selectedAccessories.some(a => a.product.id === 'ca20s-adas-camera');
                if (hasCA20S) {
                    return; // Max 1 allowed
                }
            }

            // For X3N: Only allow ONE CP4 Display Kit
            if (selectedSystem?.id === 'x3n-ai-premium' && accessory.id === 'cp4-display-kit') {
                const hasCP4 = selectedAccessories.some(a => a.product.id === 'cp4-display-kit');
                if (hasCP4) {
                    return; // Max 1 allowed
                }
            }

            // For X3N: Camera restrictions (4 AHD + 4 IPC)
            if (selectedSystem?.id === 'x3n-ai-premium') {
                const ipcCameraIds = ['1080p-ipc-waterproof-camera', 'dsm-camera-kit'];
                const ahdCameraIds = ['ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera', 'ca20s-adas-camera'];

                if (ipcCameraIds.includes(accessory.id)) {
                    if (getX3NIPCCameraCount() >= 4) {
                        // Don't add, already at max 4 IPC cameras
                        return;
                    }
                } else if (ahdCameraIds.includes(accessory.id)) {
                    if (getX3NAHDCameraCount() >= 4) {
                        // Don't add, already at max 4 AHD cameras
                        return;
                    }
                }
            }
            // Add new accessory
            const newAccessories = [...selectedAccessories, { product: accessory, quantity: 1 }];

            // Auto-add camera-extended-cable for C6 Lite-S and AD-PLUS 2.0 when camera accessory is selected
            const systemsRequiringCable = ['fs-c6-lite-standard', 'ad-plus-advanced'];
            const dmsAccessoryIds = ['ca29p-dms-camera', 'c29n-dms-camera'];
            // ahdCameraIds is already declared above for mutual exclusivity check

            // Check if we're adding a camera that requires the cable
            const isDMSCamera = dmsAccessoryIds.includes(accessory.id);
            const isAHDCameraForADPlus = selectedSystem?.id === 'ad-plus-advanced' && ahdCameraIds.includes(accessory.id);

            if (systemsRequiringCable.includes(selectedSystem?.id || '') && (isDMSCamera || isAHDCameraForADPlus)) {
                // Check if cable is not already added
                const hasCable = newAccessories.some(a => a.product.id === 'camera-extended-cable');
                if (!hasCable) {
                    const cableProduct = products.find(p => p.id === 'camera-extended-cable');
                    if (cableProduct) {
                        newAccessories.push({ product: cableProduct, quantity: 1 });
                    }
                }
            }

            setSelectedAccessories(newAccessories);
        }
    };

    const handleRemoveAccessory = (accessoryId: string) => {
        // If removing DSM Camera Kit from X3N, also remove CA20S ADAS Camera
        if (selectedSystem?.id === 'x3n-ai-premium' && accessoryId === 'dsm-camera-kit') {
            const updatedAccessories = selectedAccessories.filter(a =>
                a.product.id !== accessoryId && a.product.id !== 'ca20s-adas-camera'
            );
            setSelectedAccessories(updatedAccessories);
            return;
        }

        const systemsRequiringCable = ['fs-c6-lite-standard', 'ad-plus-advanced'];
        const dmsAccessoryIds = ['ca29p-dms-camera', 'c29n-dms-camera'];
        const ahdCameraIds = ['ahd-outdoor-camera', '720p-ahd-outdoor-camera'];

        // If removing the camera cable, also remove all camera accessories that depend on it
        if (accessoryId === 'camera-extended-cable' &&
            systemsRequiringCable.includes(selectedSystem?.id || '')) {
            // Remove cable AND all camera accessories (DMS + AHD for AD-PLUS)
            const camerasToRemove = selectedSystem?.id === 'ad-plus-advanced'
                ? [...dmsAccessoryIds, ...ahdCameraIds]
                : dmsAccessoryIds;

            const updatedAccessories = selectedAccessories.filter(a =>
                a.product.id !== accessoryId && !camerasToRemove.includes(a.product.id)
            );
            setSelectedAccessories(updatedAccessories);
            return;
        }

        // Regular removal logic for other accessories
        const updatedAccessories = selectedAccessories.filter(a => a.product.id !== accessoryId);

        // Auto-remove camera-extended-cable if no camera accessories remain
        if (systemsRequiringCable.includes(selectedSystem?.id || '')) {
            const allCameraIds = selectedSystem?.id === 'ad-plus-advanced'
                ? [...dmsAccessoryIds, ...ahdCameraIds]
                : dmsAccessoryIds;

            const hasCameraAccessories = updatedAccessories.some(a =>
                allCameraIds.includes(a.product.id)
            );

            // If no camera accessories remain, remove the cable too
            if (!hasCameraAccessories) {
                setSelectedAccessories(updatedAccessories.filter(a => a.product.id !== 'camera-extended-cable'));
            } else {
                setSelectedAccessories(updatedAccessories);
            }
        } else {
            setSelectedAccessories(updatedAccessories);
        }
    };

    const handleUpdateQuantity = (accessoryId: string, delta: number) => {
        setSelectedAccessories(selectedAccessories.map(a => {
            if (a.product.id === accessoryId) {
                // Camera Extended Cable can only have quantity of 1
                if (accessoryId === 'camera-extended-cable') {
                    return a; // Don't allow quantity changes for cable
                }

                // DMS cameras can only have quantity of 1 for C6 Lite-S and AD-PLUS 2.0
                const systemsWithDMSLimit = ['fs-c6-lite-standard', 'ad-plus-advanced'];
                const dmsAccessoryIds = ['ca29p-dms-camera', 'c29n-dms-camera'];
                if (systemsWithDMSLimit.includes(selectedSystem?.id || '') &&
                    dmsAccessoryIds.includes(accessoryId)) {
                    return a; // Don't allow quantity changes for DMS cameras
                }

                // CP7 Display can only have quantity of 1 for AD-PLUS 2.0
                if (selectedSystem?.id === 'ad-plus-advanced' && accessoryId === 'cp7-display') {
                    return a; // Don't allow quantity changes for CP7 Display
                }

                // Hard drives can only have quantity of 1 for X3N (single SATA slot)
                const hardDriveIds = ['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'];
                if (selectedSystem?.id === 'x3n-ai-premium' && hardDriveIds.includes(accessoryId)) {
                    return a; // Don't allow quantity changes for hard drives
                }

                // DSM Camera Kit can only have quantity of 1 for X3N
                if (selectedSystem?.id === 'x3n-ai-premium' && accessoryId === 'dsm-camera-kit') {
                    return a;
                }

                // CP4 Display Kit can only have quantity of 1 for X3N
                if (selectedSystem?.id === 'x3n-ai-premium' && accessoryId === 'cp4-display-kit') {
                    return a;
                }

                // CA20S ADAS Camera can only have quantity of 1 for X3N
                if (selectedSystem?.id === 'x3n-ai-premium' && accessoryId === 'ca20s-adas-camera') {
                    return a;
                }

                // For X3N: Camera count restrictions
                if (selectedSystem?.id === 'x3n-ai-premium') {
                    const ipcCameraIds = ['1080p-ipc-waterproof-camera', 'dsm-camera-kit'];
                    const ahdCameraIds = ['ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera', 'ca20s-adas-camera'];

                    if (ipcCameraIds.includes(accessoryId)) {
                        // If incrementing, check if we would exceed the limit
                        if (delta > 0 && getX3NIPCCameraCount() >= 4) {
                            return a;
                        }
                    } else if (ahdCameraIds.includes(accessoryId)) {
                        // If incrementing, check if we would exceed the limit
                        if (delta > 0 && getX3NAHDCameraCount() >= 4) {
                            return a;
                        }
                    }
                }

                // AHD Outdoor Cameras can only have quantity of 1 for AD-PLUS 2.0
                const ahdCameraIds = ['ahd-outdoor-camera', '720p-ahd-outdoor-camera'];
                if (selectedSystem?.id === 'ad-plus-advanced' && ahdCameraIds.includes(accessoryId)) {
                    return a; // Don't allow quantity changes for AHD cameras
                }

                // 1080P IPC Waterproof Camera can only have quantity of 1 for F6N Mobile DVR
                if (selectedSystem?.id === 'f6n-mobile-dvr' && accessoryId === '1080p-ipc-waterproof-camera') {
                    return a; // Don't allow quantity changes for IPC camera
                }

                // For F6N: AHD camera restrictions
                if (selectedSystem?.id === 'f6n-mobile-dvr') {
                    const f6nAHDCameraIds = ['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'];
                    if (f6nAHDCameraIds.includes(accessoryId)) {
                        // CA29P can only have quantity of 1
                        if (accessoryId === 'ca29p-dms-camera') {
                            return a; // Don't allow quantity changes for CA29P
                        }

                        // Check if incrementing would exceed max 4 AHD cameras
                        if (delta > 0) {
                            const currentAHDCount = getF6NAHDCameraCount();
                            if (currentAHDCount >= 4) {
                                return a; // Don't allow increment, already at max
                            }
                        }
                    }
                }

                // MicroSD cards quantity limits
                const microsdIds = ['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'];
                if (microsdIds.includes(accessoryId)) {
                    const systemsWithMultipleMicroSD = ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'];
                    if (systemsWithMultipleMicroSD.includes(selectedSystem?.id || '')) {
                        // All systems: Maximum 2 total MicroSD cards across all capacities
                        const totalMicroSDCount = getTotalMicroSDCount();
                        // If incrementing, check if we would exceed the limit
                        if (delta > 0 && totalMicroSDCount >= 2) {
                            return a; // Don't allow increment, already at max 2 total
                        }
                        // Allow decrement or increment if under limit
                        const newQuantity = Math.max(1, a.quantity + delta);
                        return { ...a, quantity: newQuantity };
                    }
                }

                // For C6D AI system, limit to 2 external cameras maximum
                const maxQuantity = selectedSystem?.id === 'c6d-ai-basic' ? 2 : 99;
                const newQuantity = Math.max(1, Math.min(maxQuantity, a.quantity + delta));
                return { ...a, quantity: newQuantity };
            }
            return a;
        }));
    };

    const handleRequestQuote = () => {
        // Check if MicroSD is required and selected
        const microsdIds = ['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'];
        const hasMicroSD = selectedAccessories.some(a => microsdIds.includes(a.product.id));

        // For all systems that support MicroSD: at least 1 card is required
        const systemsRequiringMicroSD = ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'];
        if (systemsRequiringMicroSD.includes(selectedSystem?.id || '')) {
            if (!hasMicroSD) {
                alert('Please select at least one MicroSD card capacity before requesting a quote.');
                return;
            }
        }

        // Check if Hard Drive is required and selected for X3N system
        const hardDriveIds = ['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'];
        const hasHardDrive = selectedAccessories.some(a => hardDriveIds.includes(a.product.id));

        // For X3N AI Mobile DVR System: at least 1 hard drive is required
        if (selectedSystem?.id === 'x3n-ai-premium') {
            if (!hasHardDrive) {
                alert('Please select at least one hard drive before requesting a quote.');
                return;
            }
        }

        setShowEstimateModal(true);
    };

    const isAccessorySelected = (accessoryId: string) => {
        return selectedAccessories.some(a => a.product.id === accessoryId);
    };

    return (
        <div className="min-h-screen bg-dark-900">
            {/* Header */}
            <section className="relative pt-32 pb-12 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
                <div className="container-custom relative z-10">
                    <button
                        onClick={() => navigate('/products')}
                        className="text-gray-400 hover:text-white mb-6 flex items-center transition-colors"
                    >
                        ← Back to Products
                    </button>
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Customize Your <span className="text-primary-500">System</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            Configure your Mobile DVR system with compatible cameras and accessories
                        </p>
                    </div>
                </div>
            </section>

            {/* Selected System Display */}
            <section className="py-8 px-4">
                <div className="container-custom">
                    <div className="card max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* System Image */}
                            <div className="aspect-video overflow-hidden rounded-lg">
                                <img
                                    src={selectedSystem.imageUrl}
                                    alt={selectedSystem.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* System Details */}
                            <div>
                                <span className="inline-block px-3 py-1 text-xs bg-primary-500/20 text-primary-400 rounded-full mb-3">
                                    {selectedSystem.category}
                                </span>
                                <h2 className="text-3xl font-bold mb-3">{selectedSystem.name}</h2>
                                <p className="text-gray-300 mb-4">{selectedSystem.description}</p>

                                {/* Key Specs */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-dark-800 p-3 rounded-lg">
                                        <p className="text-sm text-gray-400">Channels</p>
                                        <p className="text-lg font-semibold text-primary-400">
                                            {typeof selectedSystem.channels === 'number' ? selectedSystem.channels : selectedSystem.channels}
                                        </p>
                                    </div>
                                    <div className="bg-dark-800 p-3 rounded-lg">
                                        <p className="text-sm text-gray-400">Resolution</p>
                                        <p className="text-sm font-semibold text-primary-400">{selectedSystem.resolution}</p>
                                    </div>
                                </div>

                                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400">Base System</p>
                                            <p className="text-xl font-bold text-primary-400">{selectedSystem.price}</p>
                                        </div>
                                        <Package className="text-primary-500" size={32} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compatible Accessories */}
            <section className="py-12 px-4">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Add Compatible <span className="text-primary-500">Accessories</span>
                        </h2>

                        {compatibleAccessories.length > 0 ? (
                            <div className="space-y-2 mb-12">
                                {compatibleAccessories.map((accessory) => {
                                    const selectedItem = selectedAccessories.find(a => a.product.id === accessory.id);
                                    const isSelected = !!selectedItem;
                                    const quantity = selectedItem?.quantity || 0;
                                    const maxQuantity = selectedSystem?.id === 'c6d-ai-basic' ? 2 : 99;

                                    return (
                                        <div
                                            key={accessory.id}
                                            className={`card transition-all py-3 px-4 ${isSelected ? 'border-primary-500 bg-primary-500/5' : 'hover:border-primary-500/50'
                                                }`}
                                        >
                                            <div className="flex gap-3 items-center">
                                                {/* Compact Accessory Image */}
                                                <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg bg-dark-800">
                                                    <img
                                                        src={accessory.imageUrl}
                                                        alt={accessory.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Accessory Name */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-semibold">{accessory.name}</h3>
                                                </div>

                                                {/* Controls */}
                                                <div className="flex-shrink-0 flex items-center gap-3">
                                                    {!isSelected ? (
                                                        (() => {
                                                            // Check if this is a MicroSD and if total count is at max
                                                            const microsdIds = ['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'];
                                                            const isMicroSD = microsdIds.includes(accessory.id);
                                                            const systemsWithMultipleMicroSD = ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'];
                                                            // For all systems with multiple MicroSD support, check if total count is at max 2
                                                            const microSDFull = systemsWithMultipleMicroSD.includes(selectedSystem?.id || '') &&
                                                                isMicroSD &&
                                                                getTotalMicroSDCount() >= 2;

                                                            // Check if this is an AHD camera and if another AHD camera is already selected
                                                            const ahdCameraIds = ['ahd-outdoor-camera', '720p-ahd-outdoor-camera'];
                                                            const isAHDCamera = ahdCameraIds.includes(accessory.id);
                                                            const hasOtherAHDCamera = selectedSystem?.id === 'ad-plus-advanced' &&
                                                                isAHDCamera &&
                                                                selectedAccessories.some(a =>
                                                                    ahdCameraIds.includes(a.product.id) && a.product.id !== accessory.id
                                                                );

                                                            // Check if this is a hard drive and if another hard drive is already selected for X3N
                                                            const hardDriveIds = ['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'];
                                                            const isHardDrive = hardDriveIds.includes(accessory.id);
                                                            const hasOtherHardDrive = selectedSystem?.id === 'x3n-ai-premium' &&
                                                                isHardDrive &&
                                                                selectedAccessories.some(a =>
                                                                    hardDriveIds.includes(a.product.id) && a.product.id !== accessory.id
                                                                );

                                                            // For F6N: Check camera restrictions
                                                            let f6nRestriction = '';
                                                            if (selectedSystem?.id === 'f6n-mobile-dvr') {
                                                                const f6nAHDCameraIds = ['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'];
                                                                if (f6nAHDCameraIds.includes(accessory.id)) {
                                                                    // Check CA29P exclusivity
                                                                    if (accessory.id === 'ca29p-dms-camera') {
                                                                        const hasCA29P = selectedAccessories.some(a => a.product.id === 'ca29p-dms-camera');
                                                                        if (hasCA29P) {
                                                                            f6nRestriction = 'CA29P: Max 1';
                                                                        }
                                                                    }
                                                                    // Check total AHD camera count
                                                                    if (!f6nRestriction) {
                                                                        const currentAHDCount = getF6NAHDCameraCount();
                                                                        if (currentAHDCount >= 4) {
                                                                            f6nRestriction = 'AHD Cameras: Max 4 Total';
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                            // For X3N: CA20S requires DSM Kit
                                                            let x3nRestriction = '';
                                                            if (selectedSystem?.id === 'x3n-ai-premium') {
                                                                if (accessory.id === 'ca20s-adas-camera') {
                                                                    const hasDSMCam = selectedAccessories.some(a => a.product.id === 'dsm-camera-kit');
                                                                    if (!hasDSMCam) {
                                                                        x3nRestriction = 'Requires DSM Camera Kit';
                                                                    }
                                                                }
                                                            }

                                                            const isDisabled = microSDFull || hasOtherAHDCamera || hasOtherHardDrive || !!f6nRestriction || !!x3nRestriction;
                                                            const buttonText = microSDFull
                                                                ? 'Max 2 MicroSD Cards'

                                                                : hasOtherAHDCamera
                                                                    ? 'Only 1 AHD Camera Allowed'
                                                                    : hasOtherHardDrive
                                                                        ? 'Only 1 Hard Drive Allowed'
                                                                        : x3nRestriction
                                                                            ? x3nRestriction
                                                                            : f6nRestriction
                                                                                ? f6nRestriction
                                                                                : 'Add to Configuration';

                                                            // Check if CA20S limit reached (max 1)
                                                            const isCA20SMaxed = selectedSystem?.id === 'x3n-ai-premium' && accessory.id === 'ca20s-adas-camera' && isSelected;

                                                            return (
                                                                <button
                                                                    onClick={() => handleAddAccessory(accessory)}
                                                                    disabled={isDisabled || isCA20SMaxed}
                                                                    className="px-3 py-1.5 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    <Plus size={12} className="mr-1 inline" />
                                                                    {buttonText}
                                                                </button>
                                                            );
                                                        })()
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleUpdateQuantity(accessory.id, -1)}
                                                                disabled={quantity <= 1 || accessory.id === 'camera-extended-cable' || ['ca29p-dms-camera', 'c29n-dms-camera'].includes(accessory.id) || (accessory.id === 'cp7-display' && selectedSystem?.id === 'ad-plus-advanced') || (['ahd-outdoor-camera', '720p-ahd-outdoor-camera'].includes(accessory.id) && selectedSystem?.id === 'ad-plus-advanced') || (accessory.id === '1080p-ipc-waterproof-camera' && selectedSystem?.id === 'f6n-mobile-dvr') || (accessory.id === 'ca29p-dms-camera' && selectedSystem?.id === 'f6n-mobile-dvr') || (['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'].includes(accessory.id) && selectedSystem?.id === 'x3n-ai-premium') || (accessory.id === 'dsm-camera-kit' && selectedSystem?.id === 'x3n-ai-premium') || (accessory.id === 'cp4-display-kit' && selectedSystem?.id === 'x3n-ai-premium') || (accessory.id === 'ca20s-adas-camera' && selectedSystem?.id === 'x3n-ai-premium')}
                                                                className="p-2 hover:bg-dark-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span className="text-primary-400 font-semibold min-w-[40px] text-center">
                                                                x{quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => handleUpdateQuantity(accessory.id, 1)}
                                                                disabled={quantity >= maxQuantity || accessory.id === 'camera-extended-cable' || ['ca29p-dms-camera', 'c29n-dms-camera'].includes(accessory.id) || (accessory.id === 'cp7-display' && selectedSystem?.id === 'ad-plus-advanced') || (['ahd-outdoor-camera', '720p-ahd-outdoor-camera'].includes(accessory.id) && selectedSystem?.id === 'ad-plus-advanced') || (accessory.id === '1080p-ipc-waterproof-camera' && selectedSystem?.id === 'f6n-mobile-dvr') || (['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'].includes(accessory.id) && selectedSystem?.id === 'x3n-ai-premium') || (['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'].includes(accessory.id) && selectedSystem?.id === 'f6n-mobile-dvr' && getF6NAHDCameraCount() >= 4) || (['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'].includes(accessory.id) && ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'].includes(selectedSystem?.id || '') && getTotalMicroSDCount() >= 2) || (accessory.id === 'dsm-camera-kit' && selectedSystem?.id === 'x3n-ai-premium') || (accessory.id === 'cp4-display-kit' && selectedSystem?.id === 'x3n-ai-premium') || (accessory.id === 'ca20s-adas-camera' && selectedSystem?.id === 'x3n-ai-premium')}
                                                                className="p-2 hover:bg-dark-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleRemoveAccessory(accessory.id)}
                                                                className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors ml-2"
                                                                title="Remove from configuration"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400">No additional accessories available for this system.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Configuration Summary - Sticky Bottom */}
            {(selectedAccessories.length > 0 || true) && (
                <div className="sticky bottom-0 bg-dark-800/95 backdrop-blur-lg border-t border-gray-700 py-6 px-4">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Configuration Summary */}
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Your Configuration</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-300">• {selectedSystem.name}</span>
                                            <span className="text-primary-400">Base System</span>
                                        </div>
                                        {selectedAccessories.map((acc) => (
                                            <div key={acc.product.id} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-300">
                                                    • {acc.product.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(acc.product.id, -1)}
                                                        disabled={acc.quantity <= 1 || acc.product.id === 'camera-extended-cable' || ['ca29p-dms-camera', 'c29n-dms-camera'].includes(acc.product.id) || (acc.product.id === 'cp7-display' && selectedSystem?.id === 'ad-plus-advanced') || (['ahd-outdoor-camera', '720p-ahd-outdoor-camera'].includes(acc.product.id) && selectedSystem?.id === 'ad-plus-advanced') || (acc.product.id === '1080p-ipc-waterproof-camera' && selectedSystem?.id === 'f6n-mobile-dvr') || (acc.product.id === 'ca29p-dms-camera' && selectedSystem?.id === 'f6n-mobile-dvr') || (['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'].includes(acc.product.id) && selectedSystem?.id === 'x3n-ai-premium') || (acc.product.id === 'dsm-camera-kit' && selectedSystem?.id === 'x3n-ai-premium') || (acc.product.id === 'cp4-display-kit' && selectedSystem?.id === 'x3n-ai-premium') || (acc.product.id === 'ca20s-adas-camera' && selectedSystem?.id === 'x3n-ai-premium')}
                                                        className="p-1 hover:bg-dark-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-primary-400 min-w-[20px] text-center">x{acc.quantity}</span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(acc.product.id, 1)}
                                                        disabled={(selectedSystem?.id === 'c6d-ai-basic' && acc.quantity >= 2) || acc.product.id === 'camera-extended-cable' || ['ca29p-dms-camera', 'c29n-dms-camera'].includes(acc.product.id) || (acc.product.id === 'cp7-display' && selectedSystem?.id === 'ad-plus-advanced') || (['ahd-outdoor-camera', '720p-ahd-outdoor-camera'].includes(acc.product.id) && selectedSystem?.id === 'ad-plus-advanced') || (acc.product.id === '1080p-ipc-waterproof-camera' && selectedSystem?.id === 'f6n-mobile-dvr') || (['wd-blue-500gb-hdd', 'wd-scorpio-blue-1tb'].includes(acc.product.id) && selectedSystem?.id === 'x3n-ai-premium') || (['ca29p-dms-camera', 'ahd-outdoor-camera', 'ca46-blind-spot-camera', '720p-ahd-outdoor-camera'].includes(acc.product.id) && selectedSystem?.id === 'f6n-mobile-dvr' && getF6NAHDCameraCount() >= 4) || (['kingston-512gb-microsd', 'kingston-256gb-microsd', 'kingston-128gb-microsd'].includes(acc.product.id) && ['fs-c6-lite-standard', 'c6d-ai-basic', 'ad-plus-advanced', 'f6n-mobile-dvr'].includes(selectedSystem?.id || '') && getTotalMicroSDCount() >= 2) || (acc.product.id === 'dsm-camera-kit' && selectedSystem?.id === 'x3n-ai-premium') || (acc.product.id === 'cp4-display-kit' && selectedSystem?.id === 'x3n-ai-premium') || (acc.product.id === 'ca20s-adas-camera' && selectedSystem?.id === 'x3n-ai-premium')}
                                                        className="p-1 hover:bg-dark-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveAccessory(acc.product.id)}
                                                        className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors ml-2"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {selectedAccessories.length === 0 && (
                                            <p className="text-sm text-gray-500">No accessories added yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex flex-col justify-center">
                                    <p className="text-sm text-gray-400 mb-3">
                                        {selectedAccessories.length > 0
                                            ? `System + ${selectedAccessories.reduce((sum, a) => sum + a.quantity, 0)} accessory items`
                                            : 'System only'}
                                    </p>
                                    <button
                                        onClick={handleRequestQuote}
                                        className="btn btn-primary w-full flex items-center justify-center"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        Generate Quote for This Configuration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Estimate Modal */}
            <EstimateModal
                isOpen={showEstimateModal}
                onClose={() => setShowEstimateModal(false)}
                selectedSystem={selectedSystem}
                selectedAccessories={selectedAccessories}
            />
        </div>
    );
};

export default CustomizationPage;
