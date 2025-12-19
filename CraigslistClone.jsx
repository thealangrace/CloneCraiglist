import React, { useState, useEffect } from 'react';

// Sample data
const SAMPLE_LISTINGS = [
  { id: 1, title: "2019 Honda Civic EX - Low Miles, Excellent Condition", price: 18500, category: "cars", location: "San Francisco", neighborhood: "SOMA", date: "2024-01-15", description: "Well-maintained 2019 Honda Civic EX with only 32,000 miles. Features include sunroof, Apple CarPlay, heated seats.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"], contact: { name: "Mike", phone: "555-0123" }, featured: true },
  { id: 2, title: "Mid-Century Modern Dresser - Solid Walnut", price: 450, category: "for-sale", location: "Oakland", neighborhood: "Rockridge", date: "2024-01-14", description: "Authentic mid-century modern dresser in solid walnut. Six drawers with original brass pulls.", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"], contact: { name: "Sarah" }, featured: false },
  { id: 3, title: "Senior Software Engineer - Remote Friendly", price: null, salary: "150k-200k", category: "jobs", location: "Bay Area", neighborhood: "Remote", date: "2024-01-15", description: "Join our growing team! 5+ years experience in React, Node.js, and cloud technologies.", images: [], contact: { email: "careers@techcompany.com" }, company: "TechStartup Inc.", featured: true },
  { id: 4, title: "Sunny 2BR Apartment - Victorian Charm", price: 3200, category: "housing", location: "San Francisco", neighborhood: "Mission District", date: "2024-01-13", description: "Beautiful 2 bedroom apartment in classic Victorian building. Hardwood floors, updated kitchen.", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"], contact: { name: "Property Manager" }, sqft: 950, featured: true },
  { id: 5, title: "iPhone 14 Pro Max 256GB - Like New", price: 850, category: "for-sale", location: "San Jose", neighborhood: "Downtown", date: "2024-01-15", description: "iPhone 14 Pro Max in Deep Purple, 256GB storage. Includes original box and Apple leather case.", images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"], contact: { name: "Alex" }, featured: false },
  { id: 6, title: "Professional Photography Services", price: null, category: "services", location: "Bay Area", neighborhood: "Mobile", date: "2024-01-14", description: "Award-winning photographer available for portraits, events, and commercial work. 10+ years experience.", images: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800"], contact: { name: "Jennifer" }, featured: false },
  { id: 7, title: "Mountain Bike - Specialized Stumpjumper", price: 2200, category: "for-sale", location: "Berkeley", neighborhood: "North Berkeley", date: "2024-01-12", description: "2022 Specialized Stumpjumper Comp, size Large. Carbon frame, Fox suspension.", images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800"], contact: { name: "Dave" }, featured: false },
  { id: 8, title: "Golden Retriever Puppies - AKC Registered", price: 1500, category: "community", location: "Walnut Creek", neighborhood: "Pleasant Hill", date: "2024-01-15", description: "Beautiful Golden Retriever puppies ready for their forever homes! AKC registered, vet checked.", images: ["https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800"], contact: { name: "Family Breeder" }, featured: true }
];

const CATEGORIES = [
  { id: 'community', name: 'Community', icon: '👥', color: '#8B5CF6' },
  { id: 'housing', name: 'Housing', icon: '🏠', color: '#10B981' },
  { id: 'for-sale', name: 'For Sale', icon: '🛒', color: '#F59E0B' },
  { id: 'jobs', name: 'Jobs', icon: '💼', color: '#3B82F6' },
  { id: 'services', name: 'Services', icon: '🔧', color: '#EC4899' },
  { id: 'cars', name: 'Cars', icon: '🚗', color: '#EF4444' }
];

const formatPrice = (price, category) => {
  if (price === null) return category === 'jobs' ? 'See Description' : 'Contact';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getCategoryById = (id) => CATEGORIES.find(cat => cat.id === id);

// Listing Card Component
const ListingCard = ({ listing, onClick }) => {
  const category = getCategoryById(listing.category);
  return (
    <div 
      onClick={() => onClick(listing)}
      className={`bg-gray-800 border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative ${listing.featured ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-gray-700'}`}
    >
      {listing.featured && (
        <span className="absolute top-3 right-3 z-10 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded uppercase tracking-wide">Featured</span>
      )}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {listing.images && listing.images.length > 0 ? (
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">{category?.icon || '📦'}</div>
        )}
        <span className="absolute bottom-2 left-2 px-2 py-1 text-white text-xs font-semibold rounded" style={{ backgroundColor: category?.color }}>{category?.name}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white line-clamp-2 mb-2">{listing.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-emerald-400">{listing.salary || formatPrice(listing.price, listing.category)}</span>
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {listing.neighborhood}
          </span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{listing.description}</p>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
          <span className="text-gray-500 text-xs">{formatDate(listing.date)}</span>
          {listing.sqft && <span className="text-gray-500 text-xs bg-gray-700/50 px-2 py-0.5 rounded">{listing.sqft} sqft</span>}
        </div>
      </div>
    </div>
  );
};

// Detail Modal
const ListingDetail = ({ listing, onClose }) => {
  const category = getCategoryById(listing.category);
  const [showContact, setShowContact] = useState(false);
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-3xl max-h-[90vh] w-full overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-700 rounded-full text-gray-300 hover:text-white text-xl z-10" onClick={onClose}>×</button>
        <div className="grid md:grid-cols-2">
          <div className="bg-gray-900 p-6">
            {listing.images?.length > 0 ? (
              <img src={listing.images[0]} alt={listing.title} className="w-full aspect-square object-cover rounded-xl" />
            ) : (
              <div className="w-full aspect-square bg-gray-800 rounded-xl flex items-center justify-center text-7xl opacity-30">{category?.icon}</div>
            )}
          </div>
          <div className="p-6">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded text-white text-sm font-semibold flex items-center gap-1" style={{ backgroundColor: category?.color }}>{category?.icon} {category?.name}</span>
              {listing.featured && <span className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-400 text-sm font-semibold">⭐ Featured</span>}
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">{listing.title}</h1>
            <div className="text-3xl font-bold text-emerald-400 mb-4">
              {listing.salary || formatPrice(listing.price, listing.category)}
              {listing.category === 'housing' && <span className="text-gray-400 text-base font-normal">/month</span>}
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {listing.location} - {listing.neighborhood}
            </div>
            {listing.company && <div className="text-gray-400 mb-4">🏢 {listing.company}</div>}
            <div className="py-4 my-4 border-y border-gray-700">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-gray-300">{listing.description}</p>
            </div>
            <div className="space-y-2">
              {!showContact ? (
                <button onClick={() => setShowContact(true)} className="w-full py-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  Show Contact Info
                </button>
              ) : (
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  {listing.contact?.name && <p className="text-gray-300"><strong className="text-white">Contact:</strong> {listing.contact.name}</p>}
                  {listing.contact?.phone && <p className="text-gray-300"><strong className="text-white">Phone:</strong> {listing.contact.phone}</p>}
                  {listing.contact?.email && <p className="text-gray-300"><strong className="text-white">Email:</strong> {listing.contact.email}</p>}
                </div>
              )}
              <button className="w-full py-3 bg-indigo-500 rounded-lg text-white font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Reply to Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Form Modal
const CreateForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: '', price: '', category: '', description: '', contactName: '', contactEmail: '' });
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    if (!form.contactEmail) e.contact = 'Email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      onSubmit({ ...form, id: Date.now(), date: new Date().toISOString().split('T')[0], price: form.price ? parseFloat(form.price) : null, images: [], contact: { name: form.contactName, email: form.contactEmail }, featured: false, neighborhood: 'Local', location: 'Bay Area' });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Create Listing</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white ${errors.title ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-indigo-500`} placeholder="What are you listing?" />
            {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white ${errors.category ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-indigo-500`}>
                <option value="">Select...</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Price ($)</label>
              <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500" placeholder="Optional" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description *</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="4" className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white resize-none ${errors.description ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-indigo-500`} placeholder="Describe your listing..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Name</label>
              <input type="text" value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email *</label>
              <input type="email" value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white ${errors.contact ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-indigo-500`} />
            </div>
          </div>
          <div className="flex gap-4 pt-4 border-t border-gray-700">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
            <button type="submit" className="flex-[2] py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Post Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [listings, setListings] = useState(SAMPLE_LISTINGS);
  const [filtered, setFiltered] = useState(SAMPLE_LISTINGS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [sort, setSort] = useState('date');
  
  useEffect(() => {
    let result = [...listings];
    if (category) result = result.filter(l => l.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      if (sort === 'date') return new Date(b.date) - new Date(a.date);
      if (sort === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sort === 'price-high') return (b.price || 0) - (a.price || 0);
      return 0;
    });
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    setFiltered(result);
  }, [listings, search, category, sort]);
  
  const handleCreate = (newListing) => {
    setListings([newListing, ...listings]);
    setShowCreate(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-800/95 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSearch(''); setCategory(null); }}>
              <span className="text-2xl">📋</span>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">classifieds</span>
              <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">bay area</span>
            </div>
            
            <div className="flex-1 min-w-[200px] relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input 
                type="text" 
                placeholder="Search listings..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              <span className="text-lg">+</span> Post
            </button>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button onClick={() => setCategory(null)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!category ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>All</button>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${category === c.id ? 'text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`} style={category === c.id ? { backgroundColor: c.color } : {}}>
                <span>{c.icon}</span> {c.name}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">{category ? getCategoryById(category)?.name : search ? `Results for "${search}"` : 'All Listings'}</h2>
            <span className="text-gray-400">{filtered.length} listings found</span>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white cursor-pointer focus:outline-none focus:border-indigo-500">
            <option value="date">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(listing => <ListingCard key={listing.id} listing={listing} onClick={setSelected} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4 opacity-50">🔍</span>
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setCategory(null); }} className="px-6 py-2 bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 transition-colors">Clear Filters</button>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">📋</span>
            <span className="font-bold">classifieds</span>
          </div>
          <p className="text-gray-500 text-sm">A modern classifieds platform for the Bay Area community.</p>
          <p className="text-gray-600 text-xs mt-4">© 2024 Classifieds. Built with React. Demo project for portfolio.</p>
        </div>
      </footer>
      
      {/* Modals */}
      {selected && <ListingDetail listing={selected} onClose={() => setSelected(null)} />}
      {showCreate && <CreateForm onClose={() => setShowCreate(false)} onSubmit={handleCreate} />}
    </div>
  );
}
