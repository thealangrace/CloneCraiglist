import React, { useState, useEffect } from 'react';

// ============================================================================
// CRAIGSLIST CLONE - A Modern Classifieds Platform
// Author: [Your Name]
// Description: Full-featured classifieds application demonstrating React,
// state management, responsive design, and modern UI/UX principles
// ============================================================================

// Sample data - In production, this would come from an API
const SAMPLE_LISTINGS = [
  {
    id: 1,
    title: "2019 Honda Civic EX - Low Miles, Excellent Condition",
    price: 18500,
    category: "cars",
    subcategory: "cars+trucks",
    location: "San Francisco",
    neighborhood: "SOMA",
    date: "2024-01-15",
    description: "Well-maintained 2019 Honda Civic EX with only 32,000 miles. Features include sunroof, Apple CarPlay, heated seats, and backup camera. Clean title, one owner. Recently serviced with new brakes and tires.",
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"],
    contact: { name: "Mike", phone: "555-0123" },
    featured: true
  },
  {
    id: 2,
    title: "Mid-Century Modern Dresser - Solid Walnut",
    price: 450,
    category: "for-sale",
    subcategory: "furniture",
    location: "Oakland",
    neighborhood: "Rockridge",
    date: "2024-01-14",
    description: "Authentic mid-century modern dresser in solid walnut. Six drawers with original brass pulls. Minor surface wear consistent with age. Dimensions: 60\"W x 18\"D x 32\"H",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
    contact: { name: "Sarah", email: "sarah@email.com" },
    featured: false
  },
  {
    id: 3,
    title: "Senior Software Engineer - Remote Friendly",
    price: null,
    salary: "150k-200k",
    category: "jobs",
    subcategory: "software",
    location: "Bay Area",
    neighborhood: "Remote",
    date: "2024-01-15",
    description: "Join our growing team! We're looking for a senior software engineer with 5+ years experience in React, Node.js, and cloud technologies. Competitive salary, equity, and comprehensive benefits.",
    images: [],
    contact: { email: "careers@techcompany.com" },
    company: "TechStartup Inc.",
    featured: true
  },
  {
    id: 4,
    title: "Sunny 2BR Apartment - Victorian Charm",
    price: 3200,
    category: "housing",
    subcategory: "apartments",
    location: "San Francisco",
    neighborhood: "Mission District",
    date: "2024-01-13",
    description: "Beautiful 2 bedroom apartment in classic Victorian building. Hardwood floors throughout, updated kitchen with stainless appliances, in-unit washer/dryer. Close to BART and restaurants. No pets, 1 year lease.",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    contact: { name: "Property Manager", phone: "555-0456" },
    sqft: 950,
    featured: true
  },
  {
    id: 5,
    title: "iPhone 14 Pro Max 256GB - Like New",
    price: 850,
    category: "for-sale",
    subcategory: "electronics",
    location: "San Jose",
    neighborhood: "Downtown",
    date: "2024-01-15",
    description: "iPhone 14 Pro Max in Deep Purple, 256GB storage. Includes original box, charger, and Apple leather case. AppleCare+ until March 2025. Battery health at 98%.",
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"],
    contact: { name: "Alex", phone: "555-0789" },
    featured: false
  },
  {
    id: 6,
    title: "Professional Photography Services",
    price: null,
    category: "services",
    subcategory: "creative",
    location: "Bay Area",
    neighborhood: "Mobile",
    date: "2024-01-14",
    description: "Award-winning photographer available for portraits, events, and commercial work. 10+ years experience. Studio and on-location options. View portfolio at mysite.com",
    images: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800"],
    contact: { name: "Jennifer", email: "jen@photography.com" },
    featured: false
  },
  {
    id: 7,
    title: "Mountain Bike - Specialized Stumpjumper",
    price: 2200,
    category: "for-sale",
    subcategory: "bikes",
    location: "Berkeley",
    neighborhood: "North Berkeley",
    date: "2024-01-12",
    description: "2022 Specialized Stumpjumper Comp, size Large. Carbon frame, Fox suspension front and rear, SRAM Eagle drivetrain. Excellent condition, regularly maintained.",
    images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800"],
    contact: { name: "Dave", phone: "555-0321" },
    featured: false
  },
  {
    id: 8,
    title: "Golden Retriever Puppies - AKC Registered",
    price: 1500,
    category: "community",
    subcategory: "pets",
    location: "Walnut Creek",
    neighborhood: "Pleasant Hill",
    date: "2024-01-15",
    description: "Beautiful Golden Retriever puppies ready for their forever homes! AKC registered, vet checked, first shots and deworming complete. Both parents on site.",
    images: ["https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800"],
    contact: { name: "Family Breeder", phone: "555-0654" },
    featured: true
  }
];

const CATEGORIES = [
  { id: 'community', name: 'Community', icon: '👥', color: '#8B5CF6', subcategories: ['activities', 'artists', 'events', 'groups', 'pets', 'volunteers'] },
  { id: 'housing', name: 'Housing', icon: '🏠', color: '#10B981', subcategories: ['apartments', 'rooms', 'sublets', 'housing-wanted', 'office'] },
  { id: 'for-sale', name: 'For Sale', icon: '🛒', color: '#F59E0B', subcategories: ['electronics', 'furniture', 'appliances', 'bikes', 'clothing', 'collectibles'] },
  { id: 'jobs', name: 'Jobs', icon: '💼', color: '#3B82F6', subcategories: ['software', 'admin', 'customer-service', 'education', 'healthcare', 'sales'] },
  { id: 'services', name: 'Services', icon: '🔧', color: '#EC4899', subcategories: ['automotive', 'beauty', 'computer', 'creative', 'lessons', 'legal'] },
  { id: 'cars', name: 'Cars & Trucks', icon: '🚗', color: '#EF4444', subcategories: ['cars+trucks', 'motorcycles', 'boats', 'RVs', 'parts'] },
  { id: 'gigs', name: 'Gigs', icon: '⚡', color: '#06B6D4', subcategories: ['computer', 'creative', 'labor', 'talent', 'writing'] }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatPrice = (price, category) => {
  if (price === null) return category === 'jobs' ? 'See Description' : 'Contact for Price';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getCategoryById = (id) => CATEGORIES.find(cat => cat.id === id);

// ============================================================================
// COMPONENTS
// ============================================================================

// Header Component
const Header = ({ onSearch, searchQuery, onCategoryFilter, selectedCategory, onCreateListing }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <div className="logo" onClick={() => { onSearch(''); onCategoryFilter(null); }}>
            <span className="logo-icon">📋</span>
            <span className="logo-text">classifieds</span>
            <span className="logo-location">bay area</span>
          </div>
          
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search listings..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="search-input"
              />
              {localQuery && (
                <button type="button" className="search-clear" onClick={() => { setLocalQuery(''); onSearch(''); }}>
                  ×
                </button>
              )}
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>

          <div className="header-actions">
            <button className="btn-post" onClick={onCreateListing}>
              <span className="btn-icon">+</span>
              <span className="btn-text">Post</span>
            </button>
            <button className="btn-menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <nav className={`category-nav ${showMobileMenu ? 'show' : ''}`}>
          <button 
            className={`category-pill ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => onCategoryFilter(null)}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryFilter(cat.id)}
              style={{ '--cat-color': cat.color }}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

// Listing Card Component
const ListingCard = ({ listing, onClick }) => {
  const category = getCategoryById(listing.category);
  
  return (
    <article className={`listing-card ${listing.featured ? 'featured' : ''}`} onClick={() => onClick(listing)}>
      {listing.featured && <span className="featured-badge">Featured</span>}
      
      <div className="listing-image">
        {listing.images && listing.images.length > 0 ? (
          <img src={listing.images[0]} alt={listing.title} loading="lazy" />
        ) : (
          <div className="no-image">
            <span>{category?.icon || '📦'}</span>
          </div>
        )}
        <span className="listing-category" style={{ backgroundColor: category?.color }}>
          {category?.name}
        </span>
      </div>
      
      <div className="listing-content">
        <h3 className="listing-title">{listing.title}</h3>
        
        <div className="listing-meta">
          <span className="listing-price">
            {listing.salary ? listing.salary : formatPrice(listing.price, listing.category)}
          </span>
          <span className="listing-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {listing.neighborhood}
          </span>
        </div>
        
        <p className="listing-excerpt">{listing.description.substring(0, 100)}...</p>
        
        <div className="listing-footer">
          <span className="listing-date">{formatDate(listing.date)}</span>
          {listing.sqft && <span className="listing-sqft">{listing.sqft} sqft</span>}
        </div>
      </div>
    </article>
  );
};

// Listing Detail Modal
const ListingDetail = ({ listing, onClose }) => {
  const category = getCategoryById(listing.category);
  const [currentImage, setCurrentImage] = useState(0);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="detail-layout">
          <div className="detail-gallery">
            {listing.images && listing.images.length > 0 ? (
              <>
                <div className="gallery-main">
                  <img src={listing.images[currentImage]} alt={listing.title} />
                </div>
                {listing.images.length > 1 && (
                  <div className="gallery-thumbs">
                    {listing.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`thumb ${idx === currentImage ? 'active' : ''}`}
                        onClick={() => setCurrentImage(idx)}
                      >
                        <img src={img} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="gallery-placeholder">
                <span>{category?.icon || '📦'}</span>
                <p>No images available</p>
              </div>
            )}
          </div>
          
          <div className="detail-info">
            <div className="detail-header">
              <span className="detail-category" style={{ backgroundColor: category?.color }}>
                {category?.icon} {category?.name}
              </span>
              {listing.featured && <span className="detail-featured">⭐ Featured</span>}
            </div>
            
            <h1 className="detail-title">{listing.title}</h1>
            
            <div className="detail-price">
              {listing.salary ? (
                <span className="salary">{listing.salary}</span>
              ) : (
                <span className="price">{formatPrice(listing.price, listing.category)}</span>
              )}
              {listing.category === 'housing' && <span className="per-month">/month</span>}
            </div>
            
            <div className="detail-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{listing.location} - {listing.neighborhood}</span>
            </div>
            
            {listing.company && (
              <div className="detail-company">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7"/>
                </svg>
                <span>{listing.company}</span>
              </div>
            )}
            
            <div className="detail-stats">
              {listing.sqft && (
                <div className="stat">
                  <span className="stat-value">{listing.sqft}</span>
                  <span className="stat-label">sqft</span>
                </div>
              )}
              <div className="stat">
                <span className="stat-value">{formatDate(listing.date)}</span>
                <span className="stat-label">Posted</span>
              </div>
            </div>
            
            <div className="detail-description">
              <h3>Description</h3>
              <p>{listing.description}</p>
            </div>
            
            <div className="detail-contact">
              {!showContact ? (
                <button className="btn-contact" onClick={() => setShowContact(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Show Contact Info
                </button>
              ) : (
                <div className="contact-info">
                  {listing.contact.name && <p><strong>Contact:</strong> {listing.contact.name}</p>}
                  {listing.contact.phone && <p><strong>Phone:</strong> {listing.contact.phone}</p>}
                  {listing.contact.email && <p><strong>Email:</strong> {listing.contact.email}</p>}
                </div>
              )}
              
              <button className="btn-reply">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Reply to Listing
              </button>
            </div>
            
            <div className="detail-actions">
              <button className="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                Save
              </button>
              <button className="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>
              <button className="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Listing Form
const CreateListingForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    subcategory: '',
    location: 'San Francisco',
    neighborhood: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [errors, setErrors] = useState({});

  const selectedCategory = CATEGORIES.find(c => c.id === formData.category);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.contactEmail && !formData.contactPhone) {
      newErrors.contact = 'At least one contact method is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        price: formData.price ? parseFloat(formData.price) : null,
        images: [],
        contact: {
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone
        },
        featured: false
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="form-title">Create New Listing</h2>
        
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="What are you listing?"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value, subcategory: ''})}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subcategory">Subcategory</label>
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={e => setFormData({...formData, subcategory: e.target.value})}
                  disabled={!selectedCategory}
                >
                  <option value="">Select subcategory</option>
                  {selectedCategory?.subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="Leave blank for 'Contact for price'"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="neighborhood">Neighborhood</label>
                <input
                  type="text"
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                  placeholder="e.g. Downtown, Mission"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Description</h3>
            
            <div className="form-group">
              <label htmlFor="description">Describe your listing *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Include details like condition, dimensions, features, etc."
                rows="5"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Contact Information</h3>
            {errors.contact && <span className="error-message section-error">{errors.contact}</span>}
            
            <div className="form-group">
              <label htmlFor="contactName">Your Name</label>
              <input
                type="text"
                id="contactName"
                value={formData.contactName}
                onChange={e => setFormData({...formData, contactName: e.target.value})}
                placeholder="How should buyers contact you?"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactPhone">Phone</label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                  placeholder="555-123-4567"
                />
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Post Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="logo-icon">📋</span>
          <span>classifieds</span>
        </div>
        <p>A modern classifieds platform for the Bay Area community.</p>
      </div>
      
      <div className="footer-links">
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            {CATEGORIES.slice(0, 4).map(cat => (
              <li key={cat.id}><a href="#">{cat.name}</a></li>
            ))}
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Posting Guidelines</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>&copy; 2024 Classifieds. Built with React. Demo project for portfolio.</p>
    </div>
  </footer>
);

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function App() {
  const [listings, setListings] = useState(SAMPLE_LISTINGS);
  const [filteredListings, setFilteredListings] = useState(SAMPLE_LISTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  // Filter and search listings
  useEffect(() => {
    let result = [...listings];
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(l => l.category === selectedCategory);
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.location.toLowerCase().includes(query) ||
        l.neighborhood.toLowerCase().includes(query)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      return 0;
    });
    
    // Featured first
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    
    setFilteredListings(result);
  }, [listings, searchQuery, selectedCategory, sortBy]);

  const handleCreateListing = (newListing) => {
    setListings([newListing, ...listings]);
    setShowCreateForm(false);
  };

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryFilter={setSelectedCategory}
        onCreateListing={() => setShowCreateForm(true)}
      />
      
      <main className="main-content">
        <div className="results-header">
          <div className="results-info">
            <h2>
              {selectedCategory 
                ? getCategoryById(selectedCategory)?.name 
                : searchQuery 
                  ? `Results for "${searchQuery}"`
                  : 'All Listings'
              }
            </h2>
            <span className="results-count">{filteredListings.length} listings found</span>
          </div>
          
          <div className="results-controls">
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {filteredListings.length > 0 ? (
          <div className="listings-grid">
            {filteredListings.map(listing => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                onClick={setSelectedListing}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No listings found</h3>
            <p>Try adjusting your search or filters</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>
              Clear Filters
            </button>
          </div>
        )}
      </main>
      
      <Footer />
      
      {selectedListing && (
        <ListingDetail 
          listing={selectedListing} 
          onClose={() => setSelectedListing(null)}
        />
      )}
      
      {showCreateForm && (
        <CreateListingForm 
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateListing}
        />
      )}
    </div>
  );
}
