import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getInitialDonations } from '../data/initialDonations';

const FoodContext = createContext(null);
const STORAGE_KEY = 'foodloop_donations_v1';

export const FoodProvider = ({ children }) => {
  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load donations from localStorage:', e);
    }
    const initial = getInitialDonations();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch (e) {
      console.error('Failed to save initial donations to localStorage:', e);
    }
    return initial;
  });

  const [toast, setToast] = useState({
    show: false,
    type: 'success', // 'success' | 'danger' | 'info' | 'warning'
    title: '',
    message: ''
  });

  // Save to localStorage whenever donations change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    } catch (e) {
      console.error('Failed to update localStorage:', e);
    }
  }, [donations]);

  const showToast = (type, title, message) => {
    setToast({
      show: true,
      type,
      title,
      message
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  // Helper to check if a donation is expired
  const isDonationExpired = (donation) => {
    if (!donation.pickupDeadline) return false;
    return new Date(donation.pickupDeadline).getTime() < Date.now();
  };

  // Add new donation
  const addDonation = (formData) => {
    // Basic verification
    if (!formData.name || !formData.provider || !formData.category || !formData.quantity || !formData.pickupLocation || !formData.pickupDeadline) {
      showToast('danger', 'Validation Error', 'Please fill in all required fields.');
      return { success: false, error: 'Missing required fields' };
    }

    const deadlineTime = new Date(formData.pickupDeadline).getTime();
    if (isNaN(deadlineTime) || deadlineTime <= Date.now()) {
      showToast('danger', 'Invalid Deadline', 'Pickup deadline must be set in the future.');
      return { success: false, error: 'Pickup deadline must be in the future' };
    }

    const newId = `FL-${Math.floor(100 + Math.random() * 900)}`;
    const newDonation = {
      id: newId,
      name: formData.name.trim(),
      provider: formData.provider.trim(),
      providerType: formData.providerType || 'Restaurant',
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit || 'meal boxes',
      pickupLocation: formData.pickupLocation.trim(),
      pickupDeadline: new Date(formData.pickupDeadline).toISOString(),
      description: formData.description?.trim() || 'No additional description provided.',
      imageUrl: formData.imageUrl?.trim() || '',
      status: 'available',
      createdAt: new Date().toISOString(),
      contactPhone: formData.contactPhone?.trim() || '+91 98490 00000',
      handlingNotes: formData.handlingNotes?.trim() || 'Fresh surplus food. Ready for pickup.',
      estimatedWeightKg: formData.estimatedWeightKg ? Number(formData.estimatedWeightKg) : (Number(formData.quantity) * 0.5),
      claimedBy: null,
      claimedAt: null,
      rescuedAt: null
    };

    setDonations((prev) => [newDonation, ...prev]);
    showToast('success', 'Listing Created!', `"${newDonation.name}" has been published and is now available for rescue.`);
    return { success: true, donation: newDonation };
  };

  // Claim donation
  const claimDonation = (donationId) => {
    let outcome = { success: false, message: '' };

    setDonations((prevList) => {
      const target = prevList.find((item) => item.id === donationId);
      if (!target) {
        outcome = { success: false, message: 'Donation listing not found.' };
        return prevList;
      }

      // Check current listing status
      if (target.status !== 'available') {
        outcome = {
          success: false,
          message: `Cannot claim: This donation is currently ${target.status}.`
        };
        return prevList;
      }

      // Check if expired
      if (isDonationExpired(target)) {
        outcome = {
          success: false,
          message: 'Cannot claim: This donation pickup deadline has expired.'
        };
        return prevList.map((item) => (item.id === donationId ? { ...item, status: 'expired' } : item));
      }

      outcome = { success: true, message: 'Successfully claimed for pickup!' };
      return prevList.map((item) => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'claimed',
            claimedBy: 'Demo Volunteer (You)',
            claimedAt: new Date().toISOString()
          };
        }
        return item;
      });
    });

    if (outcome.success) {
      showToast('success', 'Food Claimed!', 'Added to your Active Pickups in My Rescues. Thank you for making a difference!');
    } else {
      showToast('danger', 'Claim Failed', outcome.message);
    }
    return outcome;
  };

  // Cancel claim
  const cancelClaim = (donationId) => {
    let outcome = { success: false, message: '' };

    setDonations((prevList) => {
      const target = prevList.find((item) => item.id === donationId);
      if (!target) {
        outcome = { success: false, message: 'Donation listing not found.' };
        return prevList;
      }

      if (target.status !== 'claimed') {
        outcome = { success: false, message: 'Only active claimed pickups can be cancelled.' };
        return prevList;
      }

      outcome = { success: true, message: 'Claim cancelled successfully.' };
      return prevList.map((item) => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'available',
            claimedBy: null,
            claimedAt: null
          };
        }
        return item;
      });
    });

    if (outcome.success) {
      showToast('info', 'Claim Cancelled', 'The donation has been returned to the available food pool for other volunteers.');
    } else {
      showToast('warning', 'Action Notice', outcome.message);
    }
    return outcome;
  };

  // Mark as rescued
  const completeRescue = (donationId) => {
    let outcome = { success: false, message: '' };

    setDonations((prevList) => {
      const target = prevList.find((item) => item.id === donationId);
      if (!target) {
        outcome = { success: false, message: 'Donation listing not found.' };
        return prevList;
      }

      if (target.status !== 'claimed') {
        outcome = { success: false, message: 'Only claimed pickups can be marked as rescued.' };
        return prevList;
      }

      outcome = { success: true, message: 'Rescue completed successfully!' };
      return prevList.map((item) => {
        if (item.id === donationId) {
          return {
            ...item,
            status: 'rescued',
            rescuedAt: new Date().toISOString()
          };
        }
        return item;
      });
    });

    if (outcome.success) {
      showToast('success', 'Rescue Completed! 🎉', 'Food safely collected and distributed. Community impact stats updated!');
    } else {
      showToast('danger', 'Action Failed', outcome.message);
    }
    return outcome;
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    const initial = getInitialDonations();
    setDonations(initial);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch (e) {
      console.error(e);
    }
    showToast('info', 'Data Reset', 'Demo donations and rescue records have been refreshed to initial state.');
  };

  // Dynamic statistics
  const stats = useMemo(() => {
    const totalListings = donations.length;
    let availableCount = 0;
    let claimedCount = 0;
    let rescuedCount = 0;
    let expiredCount = 0;

    let totalWeightRescuedKg = 0;
    let totalMealsRescued = 0;

    const categoryCounts = {
      'Vegetarian': 0,
      'Non-Vegetarian': 0,
      'Bakery': 0,
      'Fruits & Vegetables': 0
    };

    donations.forEach((item) => {
      // Check expiration if still marked available
      const isExpired = item.status === 'available' && isDonationExpired(item);
      const effectiveStatus = isExpired ? 'expired' : item.status;

      if (effectiveStatus === 'available') availableCount++;
      else if (effectiveStatus === 'claimed') claimedCount++;
      else if (effectiveStatus === 'rescued') {
        rescuedCount++;
        // Calculate rescued weight and meals
        const weight = item.estimatedWeightKg || (item.unit === 'kg' ? item.quantity : item.quantity * 0.45);
        totalWeightRescuedKg += weight;
        if (item.unit === 'meal boxes' || item.unit === 'servings') {
          totalMealsRescued += item.quantity;
        } else {
          totalMealsRescued += Math.round(weight * 2.2);
        }
      } else if (effectiveStatus === 'expired') expiredCount++;

      if (categoryCounts[item.category] !== undefined) {
        categoryCounts[item.category]++;
      }
    });

    // Environmental impact: 1 kg food waste prevented ≈ 2.5 kg CO2 eq saved
    const co2SavedKg = Math.round(totalWeightRescuedKg * 2.5 * 10) / 10;
    // Water saved: 1 kg food ≈ 250 liters of water footprint
    const waterSavedLiters = Math.round(totalWeightRescuedKg * 250);

    const rescueCompletionRate = claimedCount + rescuedCount > 0
      ? Math.round((rescuedCount / (claimedCount + rescuedCount)) * 100)
      : 0;

    return {
      totalListings,
      availableCount,
      claimedCount,
      rescuedCount,
      expiredCount,
      totalWeightRescuedKg: Math.round(totalWeightRescuedKg * 10) / 10,
      totalMealsRescued,
      co2SavedKg,
      waterSavedLiters,
      rescueCompletionRate,
      categoryCounts
    };
  }, [donations]);

  // Demo user rescues
  const myRescues = useMemo(() => {
    return donations.filter((d) => d.claimedBy === 'Demo Volunteer (You)');
  }, [donations]);

  const value = {
    donations,
    stats,
    myRescues,
    toast,
    showToast,
    hideToast,
    addDonation,
    claimDonation,
    cancelClaim,
    completeRescue,
    resetDemoData,
    isDonationExpired
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
