import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, EVENT_CONFIG } from '../data/eventData';

export const JournalPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  // If a slug is specified, render the individual article reader
  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
      return (
        <div className="container section-spacing" style={{ textAlign: 'center', minHeight: '50vh' }}>
          <h1 className="heading-card" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            The requested story does not exist or may have been relocated.
          </p>
          <Link to="/blog" className="btn btn-outline-gold">
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
        </div>
      );
    }

    return (
      <div className="journal-reader" style={{ position: 'relative' }}>
        {/* Article Hero */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(5rem, 9vw, 7rem) 0 clamp(3rem, 5vw, 4.5rem)',
            background: 'linear-gradient(180deg, rgba(8,10,11,0.8) 0%, #080A0B 100%)',
            borderBottom: '1px solid rgba(221, 180, 107, 0.15)',
            overflow: 'hidden',
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.2,
              zIndex: 0,
            }}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
            <Link
              to="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold-metallic)',
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              <ArrowLeft size={16} />
              Back to Journal
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <span
                style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gold-soft)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-light)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {post.tag}
              </span>
              <span>·</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <span>·</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="heading-hero" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--text-ivory-soft)', lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Article Body Content */}
        <section className="section-spacing container" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--text-ivory-soft)' }}>
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(221, 180, 107, 0.2)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gold-metallic)', textTransform: 'uppercase', fontWeight: 700 }}>
                Published By
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-ivory)' }}>
                {EVENT_CONFIG.company} Editorial Desk
              </div>
            </div>

            <Link to="/register" className="btn btn-gold">
              Register for Race Day
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise render all stories
  return (
    <div className="journal-page" style={{ position: 'relative' }}>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5rem, 10vw, 7.5rem) 0 clamp(3.5rem, 6vw, 5rem)',
          borderBottom: '1px solid rgba(221, 180, 107, 0.2)',
          background: 'linear-gradient(180deg, rgba(8,10,11,0.7) 0%, rgba(8,10,11,0.95) 100%)',
          overflow: 'hidden',
        }}
      >
        <img
          src="/images/stairs-training.jpg"
          alt="Runner training on stadium stairs"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            zIndex: 0,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="kicker">Editorial Stories & News</div>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
            The <span className="font-serif-italic">Journal</span>
          </h1>
          <p
            className="text-muted"
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
            }}
          >
            Insights on urban running culture, green race innovation, and athlete preparation from the heart of Bihar.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section-spacing container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="panel-charcoal tilt-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--gold-border-subtle)',
                textDecoration: 'none',
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.3rem 0.75rem',
                    background: 'rgba(8, 10, 11, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold-metallic)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {post.tag}
                </span>
              </div>

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="heading-card" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-ivory)' }}>
                    {post.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-metallic)', fontWeight: 700, fontSize: '0.8125rem', textTransform: 'uppercase' }}>
                  <span>Read Story</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
