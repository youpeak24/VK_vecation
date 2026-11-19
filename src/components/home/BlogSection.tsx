import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blog';
import { formatDate } from '../../utils/formatters';

export const BlogSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <BookOpen size={13} />
              <span>INSIDER TRAVEL PERSPECTIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
              THE TRAVEL <span className="text-[#0866D9]">JOURNAL</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-xl">
              Destination guides, packing checklists, seasonal weather breakdowns, and expert visa advice.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] hover:text-[#064ea5] group"
          >
            <span>Read All Articles</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0866D9] shadow-sm">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#FF8A38]" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#00B8A9]" />
                      <span>{post.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-heading font-bold text-lg text-[#071B35] group-hover:text-[#0866D9] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-heading font-bold text-[#0866D9] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
