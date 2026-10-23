import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import { sampleDonationPresets } from '../data/initialDonations';

const toLocalDateTimeString = (date) => {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const DonateFood = () => {
  const { addDonation } = useFood();
  const navigate = useNavigate();

  // Default deadline 4 hours from now
  const defaultDeadline = toLocalDateTimeString(new Date(Date.now() + 4 * 60 * 60 * 1000));
  const minDeadline = toLocalDateTimeString(new Date(Date.now() + 10 * 60 * 1000)); // at least 10 mins from now

  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    providerType: 'Restaurant',
    category: 'Vegetarian',
    quantity: '',
    unit: 'meal boxes',
    pickupLocation: '',
    pickupDeadline: defaultDeadline,
    description: '',
    imageUrl: '',
    contactPhone: '',
    handlingNotes: '',
    estimatedWeightKg: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(null);

  const providerTypes = [
    'Restaurant',
    'Bakery',
    'Hostel',
    'Grocery Store',
    'Household / Community',
    'Catering & Events',
    'Corporate Cafeteria'
  ];

  const units = ['meal boxes', 'packets', 'kg', 'packs', 'servings', 'trays'];

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Food name is required';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Food name should be at least 3 characters';
    }

    if (!formData.provider.trim()) {
      errs.provider = 'Provider or organization name is required';
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      errs.quantity = 'Please enter a valid quantity greater than 0';
    }

    if (!formData.pickupLocation.trim()) {
      errs.pickupLocation = 'Pickup location in Hyderabad is required';
    }

    if (!formData.pickupDeadline) {
      errs.pickupDeadline = 'Pickup deadline date and time is required';
    } else {
      const selectedTime = new Date(formData.pickupDeadline).getTime();
      if (isNaN(selectedTime) || selectedTime <= Date.now()) {
        errs.pickupDeadline = 'Pickup deadline must be set in the future';
      }
    }

    if (!formData.description.trim()) {
      errs.description = 'Please provide brief description of food items & packaging';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleApplyPreset = (preset, idx) => {
    setSelectedPresetIndex(idx);
    setFormData((prev) => ({
      ...prev,
      imageUrl: preset.imageUrl,
      category: preset.category,
      unit: preset.defaultUnit
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const result = addDonation(formData);
    setIsSubmitting(false);

    if (result.success) {
      // Redirect to the newly created food item details
      navigate(`/food/${result.donation.id}`);
    }
  };

  return (
    <div className="donate-page py-4 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            {/* Header info */}
            <div className="text-center mb-4">
              <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold mb-2">
                Surplus Food Rescue Registration
              </span>
              <h1 className="fw-bold text-dark display-6 mb-2">Donate Surplus Food</h1>
              <p className="text-secondary max-w-600 mx-auto">
                Share excess unserved food with verified volunteers and local Hyderabad community NGOs before it spoils.
              </p>
            </div>

            {/* Donation Form Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Food Basics */}
                <div className="border-bottom pb-4 mb-4">
                  <h5 className="fw-bold text-forest mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-info-circle-fill"></i> 1. Food Details
                  </h5>

                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="foodName" className="form-label">
                        Food Listing Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="foodName"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="e.g. 20 Fresh Paneer Butter Masala & Rice Meals"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="category" className="form-label">
                        Food Category <span className="text-danger">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="Vegetarian">🌱 Vegetarian</option>
                        <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                        <option value="Bakery">🍞 Bakery & Breads</option>
                        <option value="Fruits & Vegetables">🥗 Fruits & Vegetables</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Quantity & Unit <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          step="1"
                          className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                          placeholder="e.g. 25"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          aria-label="Quantity"
                        />
                        <select
                          name="unit"
                          className="form-select"
                          style={{ maxWidth: '140px' }}
                          value={formData.unit}
                          onChange={handleChange}
                          aria-label="Unit"
                        >
                          {units.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                        {errors.quantity && <div className="invalid-feedback d-block">{errors.quantity}</div>}
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="description" className="form-label">
                        Food Description & Preparation Time <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="Describe contents, how it is packed (e.g. sealed foil boxes), when it was prepared, and any allergen warnings."
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                  </div>
                </div>

                {/* 2. Provider & Pickup Location */}
                <div className="border-bottom pb-4 mb-4">
                  <h5 className="fw-bold text-forest mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt-fill"></i> 2. Provider & Pickup Location
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-7">
                      <label htmlFor="provider" className="form-label">
                        Provider / Organization Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="provider"
                        name="provider"
                        className={`form-control ${errors.provider ? 'is-invalid' : ''}`}
                        placeholder="e.g. Green Valley Hotel & Banquet"
                        value={formData.provider}
                        onChange={handleChange}
                        required
                      />
                      {errors.provider && <div className="invalid-feedback">{errors.provider}</div>}
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="providerType" className="form-label">
                        Donor Type
                      </label>
                      <select
                        id="providerType"
                        name="providerType"
                        className="form-select"
                        value={formData.providerType}
                        onChange={handleChange}
                      >
                        {providerTypes.map((pt) => (
                          <option key={pt} value={pt}>
                            {pt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-7">
                      <label htmlFor="pickupLocation" className="form-label">
                        Pickup Address & Area in Hyderabad <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="pickupLocation"
                        name="pickupLocation"
                        className={`form-control ${errors.pickupLocation ? 'is-invalid' : ''}`}
                        placeholder="e.g. Near Cyber Towers, Hitec City, Hyderabad"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                      />
                      {errors.pickupLocation && <div className="invalid-feedback">{errors.pickupLocation}</div>}
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="contactPhone" className="form-label">
                        Contact Phone / Dispatch Desk
                      </label>
                      <input
                        type="text"
                        id="contactPhone"
                        name="contactPhone"
                        className="form-control"
                        placeholder="e.g. +91 98490 12345"
                        value={formData.contactPhone}
                        onChange={handleChange}
                      />
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>Shared only with verified volunteer on claim.</small>
                    </div>
                  </div>
                </div>

                {/* 3. Safe Pickup Window & Deadline */}
                <div className="border-bottom pb-4 mb-4">
                  <h5 className="fw-bold text-forest mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-clock-history"></i> 3. Safe Pickup Window
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="pickupDeadline" className="form-label">
                        Available Until (Date & Time) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        id="pickupDeadline"
                        name="pickupDeadline"
                        min={minDeadline}
                        className={`form-control ${errors.pickupDeadline ? 'is-invalid' : ''}`}
                        value={formData.pickupDeadline}
                        onChange={handleChange}
                        required
                      />
                      {errors.pickupDeadline && <div className="invalid-feedback">{errors.pickupDeadline}</div>}
                      <small className="text-muted d-block mt-1">
                        Food must be collected before this deadline for safety & hygiene.
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="handlingNotes" className="form-label">
                        Handling / Storage Notes
                      </label>
                      <input
                        type="text"
                        id="handlingNotes"
                        name="handlingNotes"
                        className="form-control"
                        placeholder="e.g. Keep upright, best consumed within 5 hours."
                        value={formData.handlingNotes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Food Image & Presets */}
                <div className="mb-4">
                  <h5 className="fw-bold text-forest mb-2 d-flex align-items-center gap-2">
                    <i className="bi bi-card-image"></i> 4. Food Image (Optional)
                  </h5>
                  <p className="text-secondary small mb-3">
                    Provide an image URL or choose from one of our curated high-quality food photo presets:
                  </p>

                  {/* Curated Preset Buttons */}
                  <div className="row g-2 mb-3">
                    {sampleDonationPresets.map((preset, idx) => (
                      <div key={idx} className="col-6 col-sm-4 col-md-2">
                        <div
                          className={`preset-thumb p-1 bg-light text-center h-100 d-flex flex-column justify-content-between ${selectedPresetIndex === idx ? 'selected' : ''}`}
                          onClick={() => handleApplyPreset(preset, idx)}
                          title={`Select ${preset.label}`}
                          role="button"
                          tabIndex="0"
                        >
                          <img
                            src={preset.imageUrl}
                            alt={preset.label}
                            className="rounded-2 w-100 object-fit-cover mb-1"
                            style={{ height: '55px' }}
                          />
                          <span className="small text-truncate d-block fw-semibold" style={{ fontSize: '0.72rem' }}>
                            {preset.label.split('/')[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-2">
                    <label htmlFor="imageUrl" className="form-label small text-muted">
                      Or Custom Image URL:
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      className="form-control"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setSelectedPresetIndex(null);
                        handleChange(e);
                      }}
                    />
                  </div>

                  {formData.imageUrl && (
                    <div className="mt-2 d-flex align-items-center gap-3 bg-light p-2 rounded-3">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="rounded-2 object-fit-cover"
                        style={{ width: '60px', height: '60px' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="small text-success fw-medium">
                        <i className="bi bi-check-circle me-1"></i> Image preview loaded
                      </span>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="d-flex flex-column flex-sm-row gap-3 pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-forest btn-lg rounded-pill px-5 fw-bold shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                        Publish Donation Listing
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light rounded-pill px-4"
                    onClick={() => navigate('/explore')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateFood;
