import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Sparkles,
  Phone,
  QrCode,
  CheckCircle2,
  Eye,
  Sliders,
  Utensils,
  Leaf,
  MessageSquare,
  HelpCircle,
  BarChart,
  Layers,
  Star,
  Flame,
  Footprints,
  Coffee,
  Sun,
  Trees,
  Check
} from 'lucide-react';
import {
  HeroSlide,
  ResortExperience,
  GuestTestimonial,
  FaqItem,
  SanctuarySection,
  CulinarySection,
  ResortStats,
  ResortContact,
  HomeCtaBanner
} from '../../types';
import { getAssetUrl, RESORT_MEDIA_LIBRARY } from '../../services/resortStore';

type ContentTab = 'hero' | 'sanctuary' | 'experiences' | 'culinary' | 'testimonials' | 'faqs' | 'stats' | 'contact';

export default function WebsiteContentManager() {
  const {
    dynamicContent,
    updateDynamicContent,
    updateHeroSlides,
    updateSanctuary,
    updateExperiences,
    updateCulinary,
    updateTestimonials,
    updateFaqs,
    updateStats,
    updateHomeCtaBanner,
    contact,
    updateContactInfo
  } = useResort();

  const [activeTab, setActiveTab] = useState<ContentTab>('hero');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local states
  const [sanctuary, setSanctuary] = useState<SanctuarySection>(dynamicContent.sanctuary);
  const [culinary, setCulinary] = useState<CulinarySection>(dynamicContent.culinary);
  const [stats, setStats] = useState<ResortStats>(dynamicContent.stats);
  const [homeCtaBanner, setHomeCtaBanner] = useState<HomeCtaBanner>(
    dynamicContent.homeCtaBanner || {
      badgeText: 'Plan Your Himalayan Getaway',
      title: 'Ready to Experience The Organic Magic of Dada Ghar?',
      description: 'Book your private wooden cottage or family suite today. Guaranteed best rates and instant confirmation with our resort team.',
      backgroundImage: 'images/resort/optimized/DSC09130.jpg',
      primaryCtaText: 'Instant Online Reservation',
      secondaryCtaText: 'Contact Resort Concierge'
    }
  );
  const [contactState, setContactState] = useState<ResortContact>(contact);

  // Modals / Item Editing state
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  const [editingExperience, setEditingExperience] = useState<ResortExperience | null>(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<GuestTestimonial | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  const triggerSaveNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Handlers for Hero Slides
  const handleSaveSlide = (slide: HeroSlide) => {
    let updated: HeroSlide[];
    if (editingSlide && dynamicContent.heroSlides.some(s => s.id === slide.id)) {
      updated = dynamicContent.heroSlides.map(s => s.id === slide.id ? slide : s);
    } else {
      updated = [...dynamicContent.heroSlides, { ...slide, id: `slide-${Date.now()}` }];
    }
    updateHeroSlides(updated);
    setIsSlideModalOpen(false);
    setEditingSlide(null);
    triggerSaveNotification();
  };

  const handleDeleteSlide = (id: string) => {
    if (dynamicContent.heroSlides.length <= 1) {
      alert('You must maintain at least one hero slide.');
      return;
    }
    updateHeroSlides(dynamicContent.heroSlides.filter(s => s.id !== id));
    triggerSaveNotification();
  };

  // Handlers for Experiences
  const handleSaveExperience = (exp: ResortExperience) => {
    let updated: ResortExperience[];
    if (editingExperience && dynamicContent.experiences.some(e => e.id === exp.id)) {
      updated = dynamicContent.experiences.map(e => e.id === exp.id ? exp : e);
    } else {
      updated = [...dynamicContent.experiences, { ...exp, id: `exp-${Date.now()}` }];
    }
    updateExperiences(updated);
    setIsExpModalOpen(false);
    setEditingExperience(null);
    triggerSaveNotification();
  };

  const handleDeleteExperience = (id: string) => {
    updateExperiences(dynamicContent.experiences.filter(e => e.id !== id));
    triggerSaveNotification();
  };

  // Handlers for Testimonials
  const handleSaveTestimonial = (test: GuestTestimonial) => {
    let updated: GuestTestimonial[];
    if (editingTestimonial && dynamicContent.testimonials.some(t => t.id === test.id)) {
      updated = dynamicContent.testimonials.map(t => t.id === test.id ? test : t);
    } else {
      updated = [...dynamicContent.testimonials, { ...test, id: `test-${Date.now()}` }];
    }
    updateTestimonials(updated);
    setIsTestModalOpen(false);
    setEditingTestimonial(null);
    triggerSaveNotification();
  };

  const handleDeleteTestimonial = (id: string) => {
    updateTestimonials(dynamicContent.testimonials.filter(t => t.id !== id));
    triggerSaveNotification();
  };

  // Handlers for FAQs
  const handleSaveFaq = (faq: FaqItem) => {
    let updated: FaqItem[];
    if (editingFaq && dynamicContent.faqs.some(f => f.id === faq.id)) {
      updated = dynamicContent.faqs.map(f => f.id === faq.id ? faq : f);
    } else {
      updated = [...dynamicContent.faqs, { ...faq, id: `faq-${Date.now()}` }];
    }
    updateFaqs(updated);
    setIsFaqModalOpen(false);
    setEditingFaq(null);
    triggerSaveNotification();
  };

  const handleDeleteFaq = (id: string) => {
    updateFaqs(dynamicContent.faqs.filter(f => f.id !== id));
    triggerSaveNotification();
  };

  // Save Sanctuary
  const handleSaveSanctuary = (e: React.FormEvent) => {
    e.preventDefault();
    updateSanctuary(sanctuary);
    triggerSaveNotification();
  };

  // Save Culinary
  const handleSaveCulinary = (e: React.FormEvent) => {
    e.preventDefault();
    updateCulinary(culinary);
    triggerSaveNotification();
  };

  // Save Stats
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(stats);
    triggerSaveNotification();
  };

  // Save Home CTA Banner
  const handleSaveHomeCtaBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeCtaBanner(homeCtaBanner);
    triggerSaveNotification();
  };

  // Save Contact
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(contactState);
    triggerSaveNotification();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Visual CMS Engine
          </span>
          <h2 className="text-2xl font-serif font-bold text-brand-forest flex items-center gap-2">
            <Sliders className="w-6 h-6 text-brand-leaf" />
            <span>Website Live Content & Banner Manager</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Edit home hero rotating slides, call-to-action banners, experiences, culinary dining, guest reviews, and FAQs.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Live changes saved successfully!</span>
          </div>
        )}
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'hero', label: 'Home Banners & Slides', icon: Layers },
          { id: 'sanctuary', label: 'The Sanctuary Story', icon: Leaf },
          { id: 'experiences', label: 'Curated Experiences (BBQ, etc.)', icon: Sparkles },
          { id: 'culinary', label: 'Culinary Artistry', icon: Utensils },
          { id: 'testimonials', label: 'Guest Stories', icon: MessageSquare },
          { id: 'faqs', label: 'FAQ Manager', icon: HelpCircle },
          { id: 'stats', label: 'Impact Counter', icon: BarChart },
          { id: 'contact', label: 'Contact & QR Details', icon: Phone },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ContentTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-forest text-amber-300 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. HERO SLIDESHOW & HOME BANNER TAB */}
      {activeTab === 'hero' && (
        <div className="space-y-8">
          
          {/* Section A: Hero Slideshow */}
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-forest">Homepage Top Hero Banner Slides</h3>
                <p className="text-xs text-gray-500">Auto-switches every 5.5 seconds. Click any slide to edit its image, title, or buttons.</p>
              </div>
              <button
                onClick={() => {
                  setEditingSlide({
                    id: '',
                    image: 'images/resort/optimized/DSC09130.jpg',
                    badgeText: '5-Star Luxury Agro Retreat • Lele Valley, Nepal',
                    title: 'Where Sustainable Luxury',
                    subtitleItalic: 'Meets Raw Mountain Serenity',
                    description: 'Recharge your soul across 50 acres of pristine organic farms.',
                    primaryCtaText: 'Reserve Your Stay',
                    secondaryCtaText: 'Explore Cottages & Suites'
                  });
                  setIsSlideModalOpen(true);
                }}
                className="px-4 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Hero Slide</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dynamicContent.heroSlides.map((slide, idx) => (
                <div key={slide.id || idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="relative h-44 bg-slate-900">
                    <img
                      src={getAssetUrl(slide.image)}
                      alt={slide.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-amber-300 text-[10px] font-bold">
                      Slide #{idx + 1}
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block truncate">
                      {slide.badgeText}
                    </span>
                    <h4 className="font-serif font-bold text-base text-gray-900 leading-tight">
                      {slide.title} <span className="italic text-amber-700">{slide.subtitleItalic}</span>
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-light">
                      {slide.description}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                      <span className="truncate max-w-[200px]">{slide.image}</span>
                    </div>
                  </div>

                  <div className="p-3 border-t bg-gray-50 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingSlide(slide);
                        setIsSlideModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Homepage Bottom Call-to-Action Banner */}
          <form onSubmit={handleSaveHomeCtaBanner} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-brand-forest">Homepage Bottom Call-to-Action Banner</h3>
                <p className="text-xs text-gray-500">Edit background photo, title, subtitle, and buttons for the large bottom banner.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" /> Save Bottom Banner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Banner Badge Text</label>
                <input
                  type="text"
                  value={homeCtaBanner.badgeText}
                  onChange={e => setHomeCtaBanner({ ...homeCtaBanner, badgeText: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Banner Title</label>
                <input
                  type="text"
                  value={homeCtaBanner.title}
                  onChange={e => setHomeCtaBanner({ ...homeCtaBanner, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Banner Description</label>
              <textarea
                rows={2}
                value={homeCtaBanner.description}
                onChange={e => setHomeCtaBanner({ ...homeCtaBanner, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Banner Background Image URL / Path</label>
                <input
                  type="text"
                  value={homeCtaBanner.backgroundImage}
                  onChange={e => setHomeCtaBanner({ ...homeCtaBanner, backgroundImage: e.target.value })}
                  className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-mono outline-none"
                />
                
                {/* Visual Image Selector Quick Picker */}
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5">Quick Pick from Resort Media:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {RESORT_MEDIA_LIBRARY.slice(0, 8).map((media) => (
                      <button
                        type="button"
                        key={media.id}
                        onClick={() => setHomeCtaBanner({ ...homeCtaBanner, backgroundImage: media.path })}
                        className={`relative rounded-lg overflow-hidden h-14 border-2 transition ${
                          homeCtaBanner.backgroundImage === media.path ? 'border-amber-500 scale-105' : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={getAssetUrl(media.path)} alt={media.name} className="w-full h-full object-cover" />
                        {homeCtaBanner.backgroundImage === media.path && (
                          <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white drop-shadow" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={homeCtaBanner.primaryCtaText}
                    onChange={e => setHomeCtaBanner({ ...homeCtaBanner, primaryCtaText: e.target.value })}
                    className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={homeCtaBanner.secondaryCtaText}
                    onChange={e => setHomeCtaBanner({ ...homeCtaBanner, secondaryCtaText: e.target.value })}
                    className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>
            </div>
          </form>

        </div>
      )}

      {/* 2. THE SANCTUARY TAB */}
      {activeTab === 'sanctuary' && (
        <form onSubmit={handleSaveSanctuary} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-brand-forest">The Sanctuary of Dada Ghar Story</h3>
              <p className="text-xs text-gray-500">Edit the welcome story section on the homepage and about narrative.</p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" /> Save Sanctuary Content
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Badge Text</label>
              <input
                type="text"
                value={sanctuary.badgeText}
                onChange={e => setSanctuary({ ...sanctuary, badgeText: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Heading Title</label>
              <input
                type="text"
                value={sanctuary.title}
                onChange={e => setSanctuary({ ...sanctuary, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Heading Title Italic Accent</label>
            <input
              type="text"
              value={sanctuary.titleItalic}
              onChange={e => setSanctuary({ ...sanctuary, titleItalic: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Paragraph 1</label>
              <textarea
                rows={3}
                value={sanctuary.paragraph1}
                onChange={e => setSanctuary({ ...sanctuary, paragraph1: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Paragraph 2</label>
              <textarea
                rows={3}
                value={sanctuary.paragraph2}
                onChange={e => setSanctuary({ ...sanctuary, paragraph2: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Highlight 1 Title & Description</label>
              <input
                type="text"
                value={sanctuary.highlight1Title}
                onChange={e => setSanctuary({ ...sanctuary, highlight1Title: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none mb-2"
                placeholder="Title"
              />
              <input
                type="text"
                value={sanctuary.highlight1Desc}
                onChange={e => setSanctuary({ ...sanctuary, highlight1Desc: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                placeholder="Description"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Highlight 2 Title & Description</label>
              <input
                type="text"
                value={sanctuary.highlight2Title}
                onChange={e => setSanctuary({ ...sanctuary, highlight2Title: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none mb-2"
                placeholder="Title"
              />
              <input
                type="text"
                value={sanctuary.highlight2Desc}
                onChange={e => setSanctuary({ ...sanctuary, highlight2Desc: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                placeholder="Description"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Featured Image URL / Path</label>
              <input
                type="text"
                value={sanctuary.featuredImage}
                onChange={e => setSanctuary({ ...sanctuary, featuredImage: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-mono outline-none"
              />
              
              {/* Quick Image Picker */}
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {RESORT_MEDIA_LIBRARY.slice(0, 4).map((media) => (
                  <button
                    type="button"
                    key={media.id}
                    onClick={() => setSanctuary({ ...sanctuary, featuredImage: media.path })}
                    className="h-12 rounded border overflow-hidden opacity-80 hover:opacity-100"
                  >
                    <img src={getAssetUrl(media.path)} alt={media.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Featured Card Title</label>
                <input
                  type="text"
                  value={sanctuary.featuredRoomTitle}
                  onChange={e => setSanctuary({ ...sanctuary, featuredRoomTitle: e.target.value })}
                  className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Featured Card Price</label>
                <input
                  type="text"
                  value={sanctuary.featuredRoomPrice}
                  onChange={e => setSanctuary({ ...sanctuary, featuredRoomPrice: e.target.value })}
                  className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* 3. CURATED EXPERIENCES TAB (INCLUDING BBQ) */}
      {activeTab === 'experiences' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-forest">Curated Resort Experiences</h3>
              <p className="text-xs text-gray-500">Agro activities, nature trails, Starlit BBQ & bonfire (DSC09103), and organic tours.</p>
            </div>
            <button
              onClick={() => {
                setEditingExperience({
                  id: '',
                  title: 'Morning Yoga & Meditation',
                  tagline: 'Wellness & Stillness',
                  description: 'Greet the sunrise with mountain meditation and organic herbal tea.',
                  image: 'images/resort/optimized/DSC09138.jpg',
                  iconName: 'sun'
                });
                setIsExpModalOpen(true);
              }}
              className="px-4 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Experience</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicContent.experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="relative h-44 bg-slate-900">
                  <img
                    src={getAssetUrl(exp.image)}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 rounded-lg text-brand-forest text-[10px] font-bold">
                    Icon: {exp.iconName}
                  </div>
                  {exp.image.includes('DSC09103') && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-bold rounded">
                      DSC09103
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1.5 flex-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                    {exp.tagline}
                  </span>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="p-3 border-t bg-gray-50 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingExperience(exp);
                      setIsExpModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CULINARY ARTISTRY TAB */}
      {activeTab === 'culinary' && (
        <form onSubmit={handleSaveCulinary} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-brand-forest">Culinary Artistry & Organic Dining</h3>
              <p className="text-xs text-gray-500">Edit the gastronomy spotlight and farm-to-table culinary content.</p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" /> Save Culinary Content
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Badge Text</label>
              <input
                type="text"
                value={culinary.badgeText}
                onChange={e => setCulinary({ ...culinary, badgeText: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Main Heading</label>
              <input
                type="text"
                value={culinary.title}
                onChange={e => setCulinary({ ...culinary, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Heading Italic Accent</label>
            <input
              type="text"
              value={culinary.titleItalic}
              onChange={e => setCulinary({ ...culinary, titleItalic: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description Paragraph</label>
            <textarea
              rows={3}
              value={culinary.description}
              onChange={e => setCulinary({ ...culinary, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div className="space-y-3 p-4 bg-gray-50 rounded-2xl border">
            <label className="block text-xs font-bold text-gray-700 uppercase">3 Key Highlights / Bullets</label>
            <input
              type="text"
              value={culinary.bullet1}
              onChange={e => setCulinary({ ...culinary, bullet1: e.target.value })}
              className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
              placeholder="Bullet 1"
            />
            <input
              type="text"
              value={culinary.bullet2}
              onChange={e => setCulinary({ ...culinary, bullet2: e.target.value })}
              className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
              placeholder="Bullet 2"
            />
            <input
              type="text"
              value={culinary.bullet3}
              onChange={e => setCulinary({ ...culinary, bullet3: e.target.value })}
              className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
              placeholder="Bullet 3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Featured Dining Image URL / Path</label>
              <input
                type="text"
                value={culinary.image}
                onChange={e => setCulinary({ ...culinary, image: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-mono outline-none"
              />
              
              {/* Quick Image Picker */}
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {RESORT_MEDIA_LIBRARY.slice(8, 12).map((media) => (
                  <button
                    type="button"
                    key={media.id}
                    onClick={() => setCulinary({ ...culinary, image: media.path })}
                    className="h-12 rounded border overflow-hidden opacity-80 hover:opacity-100"
                  >
                    <img src={getAssetUrl(media.path)} alt={media.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Corner Badge Number / Stat</label>
                <input
                  type="text"
                  value={culinary.cornerBadgeNumber}
                  onChange={e => setCulinary({ ...culinary, cornerBadgeNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Corner Badge Text</label>
                <input
                  type="text"
                  value={culinary.cornerBadgeText}
                  onChange={e => setCulinary({ ...culinary, cornerBadgeText: e.target.value })}
                  className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* 5. GUEST TESTIMONIALS TAB */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-forest">Verified Guest Stories & Reviews</h3>
              <p className="text-xs text-gray-500">Add, edit, or remove customer feedback displayed on the homepage.</p>
            </div>
            <button
              onClick={() => {
                setEditingTestimonial({
                  id: '',
                  name: 'Priya & Sandeep Basnet',
                  location: 'Kathmandu, Nepal',
                  role: 'Couple Retreat',
                  rating: 5,
                  stayType: 'Agro Cottage Suite',
                  comment: 'Breathtaking serenity and farm-fresh organic dining. The staff made us feel like royalty!',
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
                });
                setIsTestModalOpen(true);
              }}
              className="px-4 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Guest Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dynamicContent.testimonials.map((test) => (
              <div key={test.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      {test.stayType}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 italic leading-relaxed mb-4">
                    "{test.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-gray-900">{test.name}</h5>
                      <p className="text-[10px] text-gray-500">{test.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingTestimonial(test);
                        setIsTestModalOpen(true);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(test.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. FAQ MANAGER TAB */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-forest">Frequently Asked Questions (FAQ)</h3>
              <p className="text-xs text-gray-500">Manage FAQ questions and answers displayed on the homepage.</p>
            </div>
            <button
              onClick={() => {
                setEditingFaq({
                  id: '',
                  question: 'Can we book private bonfire and BBQ events?',
                  answer: 'Yes! Private campfire setups with acoustic music and organic barbecue can be arranged upon request.'
                });
                setIsFaqModalOpen(true);
              }}
              className="px-4 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {dynamicContent.faqs.map((faq, idx) => (
              <div key={faq.id || idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-mono flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-gray-600 pl-7 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setIsFaqModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. STATS & IMPACT TAB */}
      {activeTab === 'stats' && (
        <form onSubmit={handleSaveStats} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-brand-forest">Impact Numbers & Stats Counter</h3>
              <p className="text-xs text-gray-500">Edit key statistics displayed across the homepage.</p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" /> Save Stats
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Farmland Acres</label>
              <input
                type="text"
                value={stats.acres}
                onChange={e => setStats({ ...stats, acres: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Guests</label>
              <input
                type="text"
                value={stats.guests}
                onChange={e => setStats({ ...stats, guests: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Organic Harvest %</label>
              <input
                type="text"
                value={stats.organicHarvest}
                onChange={e => setStats({ ...stats, organicHarvest: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-bold font-mono outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">TripAdvisor Rating</label>
              <input
                type="text"
                value={stats.tripAdvisorRating}
                onChange={e => setStats({ ...stats, tripAdvisorRating: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-bold font-mono outline-none"
              />
            </div>
          </div>
        </form>
      )}

      {/* 8. CONTACT & QR DETAILS TAB */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-brand-forest">Contact & Fonepay Payment Info</h3>
              <p className="text-xs text-gray-500">Edit resort phone numbers, WhatsApp, address, and Fonepay QR merchant details.</p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" /> Save Contact Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary Phone</label>
              <input
                type="text"
                value={contactState.phone}
                onChange={e => setContactState({ ...contactState, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={contactState.whatsappNumber}
                onChange={e => setContactState({ ...contactState, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={contactState.email}
                onChange={e => setContactState({ ...contactState, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Resort Physical Address</label>
            <input
              type="text"
              value={contactState.address}
              onChange={e => setContactState({ ...contactState, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Facebook URL</label>
              <input
                type="text"
                value={contactState.facebookUrl}
                onChange={e => setContactState({ ...contactState, facebookUrl: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none mb-3"
              />
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Instagram URL</label>
              <input
                type="text"
                value={contactState.instagramUrl}
                onChange={e => setContactState({ ...contactState, instagramUrl: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Fonepay QR Code Image URL</label>
              <input
                type="text"
                value={contactState.qrCodeImageUrl}
                onChange={e => setContactState({ ...contactState, qrCodeImageUrl: e.target.value })}
                className="w-full px-4 py-2 bg-white border rounded-xl text-xs font-mono outline-none"
              />
              {contactState.qrCodeImageUrl && (
                <img
                  src={contactState.qrCodeImageUrl}
                  alt="QR preview"
                  className="w-24 h-24 object-contain rounded-xl mt-2 border bg-white p-1"
                />
              )}
            </div>
          </div>
        </form>
      )}

      {/* Slide Modal */}
      {isSlideModalOpen && editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">
              {editingSlide.id ? 'Edit Hero Banner Slide' : 'Add New Hero Banner Slide'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Slide Image URL / Path *</label>
                <input
                  type="text"
                  value={editingSlide.image}
                  onChange={e => setEditingSlide({ ...editingSlide, image: e.target.value })}
                  placeholder="e.g. images/resort/optimized/DSC09130.jpg"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl font-mono"
                />
                
                {/* Media Picker */}
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {RESORT_MEDIA_LIBRARY.map((media) => (
                    <button
                      type="button"
                      key={media.id}
                      onClick={() => setEditingSlide({ ...editingSlide, image: media.path })}
                      className={`h-12 rounded border overflow-hidden transition ${
                        editingSlide.image === media.path ? 'ring-2 ring-amber-500 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={getAssetUrl(media.path)} alt={media.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={editingSlide.badgeText}
                  onChange={e => setEditingSlide({ ...editingSlide, badgeText: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Main Title</label>
                  <input
                    type="text"
                    value={editingSlide.title}
                    onChange={e => setEditingSlide({ ...editingSlide, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Subtitle (Italic)</label>
                  <input
                    type="text"
                    value={editingSlide.subtitleItalic}
                    onChange={e => setEditingSlide({ ...editingSlide, subtitleItalic: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingSlide.description}
                  onChange={e => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={editingSlide.primaryCtaText}
                    onChange={e => setEditingSlide({ ...editingSlide, primaryCtaText: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={editingSlide.secondaryCtaText}
                    onChange={e => setEditingSlide({ ...editingSlide, secondaryCtaText: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSlide(editingSlide)}
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save Slide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {isExpModalOpen && editingExperience && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">
              {editingExperience.id ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Experience Title *</label>
                <input
                  type="text"
                  value={editingExperience.title}
                  onChange={e => setEditingExperience({ ...editingExperience, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingExperience.tagline}
                    onChange={e => setEditingExperience({ ...editingExperience, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Icon Style</label>
                  <select
                    value={editingExperience.iconName}
                    onChange={e => setEditingExperience({ ...editingExperience, iconName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  >
                    <option value="flame">🔥 Flame (Campfire & BBQ)</option>
                    <option value="leaf">🌿 Leaf (Organic & Agro)</option>
                    <option value="utensils">🍴 Utensils (Dining & Food)</option>
                    <option value="footprints">👣 Footprints (Trails & Hikes)</option>
                    <option value="sun">☀️ Sun (Wellness & Yoga)</option>
                    <option value="coffee">☕ Coffee (Morning & Herbal)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  value={editingExperience.image}
                  onChange={e => setEditingExperience({ ...editingExperience, image: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl font-mono"
                />
                
                {/* Media Quick Picker */}
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {RESORT_MEDIA_LIBRARY.map((media) => (
                    <button
                      type="button"
                      key={media.id}
                      onClick={() => setEditingExperience({ ...editingExperience, image: media.path })}
                      className={`h-12 rounded border overflow-hidden transition ${
                        editingExperience.image === media.path ? 'ring-2 ring-amber-500 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={getAssetUrl(media.path)} alt={media.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingExperience.description}
                  onChange={e => setEditingExperience({ ...editingExperience, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveExperience(editingExperience)}
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {isTestModalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">
              {editingTestimonial.id ? 'Edit Guest Review' : 'Add Guest Review'}
            </h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Guest Name *</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTestimonial.location}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stay Type</label>
                  <input
                    type="text"
                    value={editingTestimonial.stayType}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, stayType: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Star Rating (1-5)</label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={editingTestimonial.avatar}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Review Comment</label>
                <textarea
                  rows={3}
                  value={editingTestimonial.comment}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTestimonial(editingTestimonial)}
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {isFaqModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">
              {editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Question *</label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={e => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  value={editingFaq.answer}
                  onChange={e => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveFaq(editingFaq)}
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
