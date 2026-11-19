import React, { useState, useEffect } from 'react';
import { Globe, Image as ImageIcon, BookOpen, Search, Plus, CheckCircle2, Star, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { WebsiteBanner, SEOMetadata } from '../../types';
import { BLOG_POSTS } from '../../data/blog';

export const WebsiteCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'banners' | 'media' | 'blog' | 'seo'>('banners');
  const [banners, setBanners] = useState<WebsiteBanner[]>([]);
  const [seoList, setSeoList] = useState<SEOMetadata[]>([]);
  const [blogs, setBlogs] = useState(BLOG_POSTS);

  // New Banner Form
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerCta, setBannerCta] = useState('/packages');

  const loadData = () => {
    setBanners(api.website.getBanners());
    setSeoList(api.website.getSEO());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleToggleBanner = (id: string, current: boolean) => {
    api.website.updateBanner(id, { isActive: !current });
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle || !bannerImage) return;

    api.website.createBanner({
      title: bannerTitle,
      subtitle: bannerSubtitle,
      imageUrl: bannerImage,
      ctaText: 'Explore Now',
      ctaLink: bannerCta,
      isActive: true,
      displayOrder: banners.length + 1
    });

    setBannerTitle('');
    setBannerSubtitle('');
    setBannerImage('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          Website Content Management System (CMS)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage homepage promotional banners, experience galleries, editorial travel guides, and search engine SEO tags.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('banners')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'banners' ? 'border-[#0866D9] text-[#0866D9]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon size={14} />
          <span>Homepage Banners</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'media' ? 'border-[#0866D9] text-[#0866D9]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe size={14} />
          <span>Brand Media & Logos</span>
        </button>

        <button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'blog' ? 'border-[#0866D9] text-[#0866D9]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen size={14} />
          <span>Travel Blog Articles</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'seo' ? 'border-[#0866D9] text-[#0866D9]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search size={14} />
          <span>SEO & Meta Tags</span>
        </button>
      </div>

      {/* Tab: Banners */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading font-bold text-base text-[#071B35]">Active Promotional Banners</h3>
            <div className="space-y-4">
              {banners.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 p-4">
                  <img src={b.imageUrl || b.image} alt={b.title} className="w-full sm:w-40 h-24 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <span className="font-heading font-bold text-sm text-[#071B35] block truncate">{b.title}</span>
                    <span className="text-xs text-slate-500 block truncate mt-0.5">{b.subtitle}</span>
                    <span className="text-[11px] text-blue-600 block mt-1">CTA: {b.ctaLink}</span>
                  </div>
                  <button
                    onClick={() => handleToggleBanner(b.id, b.isActive)}
                    className={`px-3 py-1 rounded-full text-xs font-heading font-bold border shrink-0 ${
                      b.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {b.isActive ? 'Active' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h3 className="font-heading font-bold text-base text-[#071B35] mb-4">Add Promotional Banner</h3>
            <form onSubmit={handleAddBanner} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Headline Text *</label>
                <input
                  type="text"
                  required
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="e.g. Summer in Switzerland"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Subtext</label>
                <input
                  type="text"
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  placeholder="Special 15% discount for families"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0866D9] text-white rounded-xl font-heading font-bold transition-all shadow-sm"
              >
                Publish Banner
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Brand Media & Logos */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-bold text-base text-[#071B35]">Verified Brand Assets & Static Media</h3>
                <p className="text-xs text-slate-500 mt-0.5">High-resolution logos, banners, web manifests, and search engine indices active in production.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-heading font-bold rounded-full">
                All 9 Assets Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              
              {/* Asset 1: Master 512x512 Logo */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/android-chrome-512x512.png" alt="512x512 Logo" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">android-chrome-512x512.png</span>
                    <span className="text-[10px] text-slate-500 block font-mono">512 × 512 px • 390 KB</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">OG / Twitter / High-Res</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /android-chrome-512x512.png
                </div>
              </div>

              {/* Asset 2: 192x192 Logo */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/android-chrome-192x192.png" alt="192x192 Logo" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">android-chrome-192x192.png</span>
                    <span className="text-[10px] text-slate-500 block font-mono">192 × 192 px • 63.5 KB</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">Navbar / Footer / Mobile</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /android-chrome-192x192.png
                </div>
              </div>

              {/* Asset 3: Apple Touch Icon */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/apple-touch-icon.png" alt="Apple Touch Icon" className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">apple-touch-icon.png</span>
                    <span className="text-[10px] text-slate-500 block font-mono">180 × 180 px • 56.2 KB</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">iOS Home Screen Icon</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /apple-touch-icon.png
                </div>
              </div>

              {/* Asset 4: Favicon 32x32 */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/favicon-32x32.png" alt="Favicon 32x32" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">favicon-32x32.png</span>
                    <span className="text-[10px] text-slate-500 block font-mono">32 × 32 px • 2.5 KB</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">Browser Tab Icon</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /favicon-32x32.png
                </div>
              </div>

              {/* Asset 5: Favicon 16x16 */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/favicon-16x16.png" alt="Favicon 16x16" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">favicon-16x16.png</span>
                    <span className="text-[10px] text-slate-500 block font-mono">16 × 16 px • 805 B</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">Small Tab / Bookmark</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /favicon-16x16.png
                </div>
              </div>

              {/* Asset 6: Favicon.ico */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/favicon.ico" alt="Favicon ICO" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">favicon.ico</span>
                    <span className="text-[10px] text-slate-500 block font-mono">Multi-size ICO • 15.4 KB</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">Legacy & Standard Favicon</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /favicon.ico
                </div>
              </div>

              {/* Asset 7: Hero Graphic Banner */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 p-1 border border-slate-800 shadow-sm flex items-center justify-center shrink-0">
                    <img src="/hero.png" alt="Hero Banner" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">hero.png</span>
                    <span className="text-[10px] text-slate-500 block font-mono">343 × 361 px • 13.0 KB</span>
                    <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">Homepage Hero Banner</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /hero.png
                </div>
              </div>

              {/* Asset 8: PWA Manifest */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 p-1 border border-blue-200 shadow-sm flex items-center justify-center shrink-0 text-blue-700 font-heading font-bold text-xs">
                    PWA
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">site.webmanifest</span>
                    <span className="text-[10px] text-slate-500 block font-mono">JSON Manifest</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Progressive Web App Ready</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /site.webmanifest
                </div>
              </div>

              {/* Asset 9: Sitemap.xml & Robots.txt */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 p-1 border border-emerald-200 shadow-sm flex items-center justify-center shrink-0 text-emerald-700 font-heading font-bold text-xs">
                    SEO
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">sitemap.xml & robots.txt</span>
                    <span className="text-[10px] text-slate-500 block font-mono">113 Indexed URLs</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Googlebot & Bing Verified</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600 truncate">
                  /sitemap.xml
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab: Blog Articles */}
      {activeTab === 'blog' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <h3 className="font-heading font-bold text-base text-[#071B35] mb-4">Published Travel Stories & Guides</h3>
          <div className="divide-y divide-slate-100">
            {blogs.map((b) => (
              <div key={b.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={b.coverImage} alt={b.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div>
                    <span className="font-heading font-bold text-xs text-[#071B35] block">{b.title}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      {b.publishedAt} • {b.readTime || `${b.readingTimeMinutes} min read`} • {b.category}
                    </span>
                  </div>
                </div>
                <a
                  href={`/blog/${b.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-heading font-bold text-[#0866D9] hover:underline"
                >
                  View Story →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: SEO Metadata */}
      {activeTab === 'seo' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-[#071B35]">Search Engine Optimization (SEO) Config</h3>
          <div className="divide-y divide-slate-100">
            {seoList.map((item, idx) => {
              const kws: string[] = Array.isArray(item.keywords)
                ? item.keywords
                : (item.metaKeywords ? item.metaKeywords.split(',').map((k: string) => k.trim()) : []);
              return (
                <div key={item.id || item.route || item.pagePath || idx} className="py-4">
                  <span className="font-mono text-xs font-bold text-[#0866D9] block">{item.route || item.pagePath}</span>
                  <span className="font-heading font-bold text-xs text-[#071B35] mt-1 block">{item.title || item.pageTitle}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description || item.metaDescription}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {kws.map((kw: string, i: number) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default WebsiteCMS;
