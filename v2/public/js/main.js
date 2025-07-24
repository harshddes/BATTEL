/**
 * BATTEL - Main JavaScript Module
 * Advanced web functionality with performance optimizations
 */

class BattelApp {
    constructor() {
        this.config = {
            debug: location.hostname === 'localhost' || location.hostname === '127.0.0.1',
            version: '2.0.0',
            apiEndpoint: '/api'
        };
        
        this.state = {
            isLoading: false,
            currentSection: 'home',
            mobileMenuOpen: false,
            theme: this.getPreferredTheme()
        };
        
        this.elements = {};
        this.observers = new Map();
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            this.log('🚀 Initializing BATTEL App v' + this.config.version);
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                await this.setup();
            }
        } catch (error) {
            this.error('Failed to initialize app:', error);
        }
    }

    /**
     * Setup all app functionality
     */
    async setup() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupPerformanceMonitoring();
        this.setupBrowserToolsIntegration();
        this.initializeTheme();
        
        // Mark app as ready
        document.documentElement.setAttribute('data-app-ready', 'true');
        this.log('✅ App initialized successfully');
        
        // Trigger ready event for external integrations
        this.dispatch('app:ready', { version: this.config.version });
    }

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements = {
            nav: document.querySelector('.nav'),
            navToggle: document.querySelector('.nav-toggle'),
            navMenu: document.querySelector('.nav-menu'),
            navLinks: document.querySelectorAll('.nav-link'),
            heroActions: document.querySelectorAll('.hero-actions .btn'),
            contactForm: document.querySelector('.contact-form'),
            sections: document.querySelectorAll('section[id]')
        };
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Navigation
        this.elements.navToggle?.addEventListener('click', (e) => this.toggleMobileMenu(e));
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Hero actions
        this.elements.heroActions.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleHeroAction(e));
        });

        // Contact form
        this.elements.contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));

        // Window events
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        
        // Theme preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => this.handleThemeChange());

        // Performance monitoring
        window.addEventListener('load', () => this.measurePerformance());
        
        // Error handling
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handleError(e));
    }

    /**
     * Setup intersection observer for scroll animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);

        this.elements.sections.forEach(section => {
            observer.observe(section);
        });

        this.observers.set('sections', observer);
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        if (!this.config.debug) return;

        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            this.measureCoreWebVitals();
        }

        // Monitor memory usage
        if (performance.memory) {
            setInterval(() => {
                if (this.monitorMemory) {
                    this.monitorMemory();
                }
            }, 30000);
        }
    }

    /**
     * Setup BrowserTools integration for development
     */
    setupBrowserToolsIntegration() {
        if (!this.config.debug) return;

        // Enhanced logging for BrowserTools
        this.log('🔧 BrowserTools integration active');
        
        // Expose app instance for debugging
        window.BattelApp = this;
        
        // Add development helpers
        window.debugApp = {
            state: () => this.state,
            config: () => this.config,
            elements: () => this.elements,
            performance: () => this.getPerformanceMetrics(),
            screenshot: () => this.takeScreenshot(),
            simulate: {
                error: () => { throw new Error('Simulated error for testing'); },
                slowNetwork: () => this.simulateSlowNetwork(),
                mobileView: () => this.simulateMobileView()
            }
        };

        // Add visual debugging indicators
        if (this.config.debug) {
            this.addDebugIndicators();
        }
    }

    /**
     * Initialize theme system
     */
    initializeTheme() {
        const theme = this.state.theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.log(`🎨 Theme initialized: ${theme}`);
    }

    /**
     * Handle mobile menu toggle
     */
    toggleMobileMenu(event) {
        event.preventDefault();
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        
        this.elements.navMenu?.classList.toggle('mobile-open', this.state.mobileMenuOpen);
        this.elements.navToggle?.classList.toggle('active', this.state.mobileMenuOpen);
        
        // Update ARIA attributes
        this.elements.navToggle?.setAttribute('aria-expanded', this.state.mobileMenuOpen);
        
        this.log(`📱 Mobile menu ${this.state.mobileMenuOpen ? 'opened' : 'closed'}`);
    }

    /**
     * Handle navigation link clicks
     */
    handleNavClick(event) {
        const href = event.target.getAttribute('href');
        
        if (href?.startsWith('#')) {
            event.preventDefault();
            const targetId = href.substring(1);
            this.scrollToSection(targetId);
            
            // Close mobile menu if open
            if (this.state.mobileMenuOpen) {
                this.toggleMobileMenu(event);
            }
        }
    }

    /**
     * Handle hero action buttons
     */
    handleHeroAction(event) {
        const action = event.target.textContent.toLowerCase();
        
        this.log(`🎯 Hero action: ${action}`);
        
        if (action.includes('get started')) {
            this.scrollToSection('contact');
        } else if (action.includes('learn more')) {
            this.scrollToSection('about');
        }
        
        // Add button feedback
        this.addButtonFeedback(event.target);
    }

    /**
     * Handle contact form submission
     */
    async handleContactSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        this.log('📧 Contact form submitted:', data);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.delay(2000);
            
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            
        } catch (error) {
            this.error('Failed to send message:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update header background opacity
        if (this.elements.nav) {
            const opacity = Math.min(scrollY / 100, 1);
            this.elements.nav.style.setProperty('--bg-opacity', opacity);
        }
        
        // Update current section in state
        this.updateCurrentSection();
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && this.state.mobileMenuOpen) {
            this.state.mobileMenuOpen = false;
            this.elements.navMenu?.classList.remove('mobile-open');
            this.elements.navToggle?.classList.remove('active');
        }
        
        this.log(`📐 Window resized: ${window.innerWidth}x${window.innerHeight}`);
    }

    /**
     * Handle theme preference changes
     */
    handleThemeChange() {
        const newTheme = this.getPreferredTheme();
        if (newTheme !== this.state.theme) {
            this.state.theme = newTheme;
            this.initializeTheme();
        }
    }

    /**
     * Handle errors
     */
    handleError(event) {
        const error = event.error || event.reason;
        this.error('Runtime error:', error);
        
        // Report to monitoring service in production
        if (!this.config.debug) {
            this.reportError(error);
        }
    }

    /**
     * Scroll to a specific section
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const headerHeight = this.elements.nav?.offsetHeight || 70;
        const targetY = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
        
        this.log(`🎯 Scrolled to section: ${sectionId}`);
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink(activeSectionId) {
        this.elements.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${activeSectionId}`;
            link.classList.toggle('active', isActive);
        });
    }

    /**
     * Update current section in state
     */
    updateCurrentSection() {
        const scrollY = window.scrollY + 100;
        
        for (const section of this.elements.sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                if (this.state.currentSection !== section.id) {
                    this.state.currentSection = section.id;
                    this.dispatch('section:change', { section: section.id });
                }
                break;
            }
        }
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Add button feedback animation
     */
    addButtonFeedback(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    /**
     * Get user's preferred theme
     */
    getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * Measure performance metrics
     */
    measurePerformance() {
        if (!performance.timing) return;
        
        const timing = performance.timing;
        const metrics = {
            pageLoad: timing.loadEventEnd - timing.navigationStart,
            domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
            firstByte: timing.responseStart - timing.navigationStart
        };
        
        this.log('📊 Performance metrics:', metrics);
        return metrics;
    }

    /**
     * Get current performance metrics
     */
    getPerformanceMetrics() {
        const metrics = {
            timing: this.measurePerformance(),
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
            } : null,
            navigation: performance.navigation?.type || 'unknown'
        };
        
        return metrics;
    }

    /**
     * Monitor memory usage for performance tracking
     */
    monitorMemory() {
        if (!performance.memory) return;
        
        const memoryInfo = {
            used: Math.round(performance.memory.usedJSHeapSize / 1048576),
            total: Math.round(performance.memory.totalJSHeapSize / 1048576),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        };
        
        // Log memory usage if it's getting high
        if (memoryInfo.used > memoryInfo.limit * 0.8) {
            this.log('⚠️ High memory usage:', memoryInfo);
        }
        
        // Store for performance metrics
        if (!window.performanceMetrics) {
            window.performanceMetrics = {};
        }
        window.performanceMetrics.memory = memoryInfo;
    }

    /**
     * Add visual debugging indicators
     */
    addDebugIndicators() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 255, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            font-family: monospace;
        `;
        indicator.textContent = `DEBUG v${this.config.version}`;
        document.body.appendChild(indicator);
    }

    /**
     * Utility: Throttle function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Utility: Debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility: Delay execution
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Utility: Dispatch custom event
     */
    dispatch(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    /**
     * Utility: Enhanced logging
     */
    log(...args) {
        if (this.config.debug) {
            console.log(`[BATTEL ${new Date().toISOString()}]`, ...args);
        }
    }

    /**
     * Utility: Error logging
     */
    error(...args) {
        console.error(`[BATTEL ERROR ${new Date().toISOString()}]`, ...args);
    }

    /**
     * Development helper: Take screenshot (if BrowserTools available)
     */
    takeScreenshot() {
        if (typeof window.browserTools !== 'undefined') {
            return window.browserTools.takeScreenshot();
        }
        this.log('📷 Screenshot requested - BrowserTools not available');
    }

    /**
     * Development helper: Report error to monitoring
     */
    reportError(error) {
        // Implement error reporting service integration
        this.log('📊 Error reported to monitoring service:', error);
    }
}

// Initialize app when script loads
const app = new BattelApp();

// Export for global access
window.BattelApp = BattelApp; 