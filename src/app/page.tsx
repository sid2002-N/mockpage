'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FiMenu, FiSearch, FiUser, FiHeart, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import QualityBadge from './components/QualityBadge';

type Theme = 'light' | 'dark';
type ProductImage = '/mushroom-leather-main.png' | '/mushroom-leather-detail.png';

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [theme, setTheme] = useState<Theme>('light');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = prefersDark ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 49));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const productImages: ProductImage[] = [
    '/mushroom-leather-main.png',
    '/mushroom-leather-detail.png',
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Mom's Pure Grind" className={styles.logoImage} />
        </div>

        <div className={styles.ctaGroup}>
          <button className={styles.categoryButton}>
            <FiMenu size={20} />
            All Products
          </button>

          <button
            className={styles.mobileNavToggle}
            type="button"
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobileNav}
          >
            {isMobileNavOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for products..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FiSearch size={20} />
          </button>
        </div>

        <nav className={`${styles.nav} ${isMobileNavOpen ? styles.navOpen : ''}`}>
          <a href="#" className={styles.navLink} onClick={closeMobileNav}>Home</a>
          <a href="#" className={styles.navLink} onClick={closeMobileNav}>Products</a>
          <a href="#" className={styles.navLink} onClick={closeMobileNav}>Shops</a>
          <a href="#" className={styles.navLink} onClick={closeMobileNav}>Offers</a>
        </nav>

        <div className={styles.userSection}>
          <div className={styles.userIcon}>
            <FiUser size={20} />
          </div>
          <span>Hello, Sid</span>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle color theme"
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </header>

      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className={styles.mobileNavBackdrop}
          onClick={closeMobileNav}
        />
      )}

      {/* Product Section */}
      <main className={styles.productSection}>
        <div className={styles.productGrid}>
          {/* Image Gallery */}
          <div className={styles.imageGallery}>
            <div className={styles.thumbnailContainer}>
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${activeImage === index ? styles.active : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Product view ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className={styles.mainImage}>
              <img src={productImages[activeImage]} alt="Mushroom Leather" />
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.productDetails}>
            <button className={styles.wishlistButton}>
              <FiHeart />
            </button>

            <h1 className={styles.productTitle}>Mushroom Leather</h1>

            {/* Interactive Quality Badge */}
            <QualityBadge />

            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className={styles.star} />
              ))}
            </div>

            <p className={styles.brand}>
              <span className={styles.brandLabel}>Brand:</span> MycoTex
            </p>

            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>₹2,999</span>
              <span className={styles.originalPrice}>₹4,500</span>
              <span className={styles.discount}>-33%</span>
            </div>

            <div className={styles.quantitySection}>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className={styles.quantityDisplay}>{quantity}</div>
                <button
                  className={styles.quantityButton}
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className={styles.stockStatus}>
                <span className={styles.inStock}>In Stock</span>
                <span className={styles.stockCount}>(Stock 49)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className={styles.productDescription}>
          <h2 className={styles.descriptionTitle}>Sustainable Mushroom Leather</h2>
          <p className={styles.descriptionText}>
            Experience the future of sustainable fashion with our premium Mushroom Leather. Crafted from mycelium, this eco-friendly alternative offers the luxurious feel of traditional leather without the environmental impact. Durable, water-resistant, and completely biodegradable, it represents the perfect harmony of nature and innovation.
          </p>
        </div>
      </main>
    </div>
  );
}
