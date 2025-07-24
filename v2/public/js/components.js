/**
 * BATTEL - Component Library
 * Reusable interactive components with advanced features
 */

/**
 * Modal Component
 */
class Modal {
    constructor(element) {
        this.element = element;
        this.isOpen = false;
        this.focusableElements = null;
        this.previousActiveElement = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Close on backdrop click
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close button
        const closeBtn = this.element.querySelector('[data-modal-close]');
        closeBtn?.addEventListener('click', () => this.close());
    }

    setupAccessibility() {
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        this.element.setAttribute('aria-hidden', 'true');
        
        // Find focusable elements
        this.focusableElements = this.element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
    }

    open() {
        this.previousActiveElement = document.activeElement;
        this.isOpen = true;
        
        this.element.classList.add('modal-open');
        this.element.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-active');
        
        // Focus first focusable element
        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }

        // Trap focus
        this.trapFocus();
    }

    close() {
        this.isOpen = false;
        
        this.element.classList.remove('modal-open');
        this.element.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-active');
        
        // Return focus
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    }

    trapFocus() {
        if (this.focusableElements.length === 0) return;

        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        this.element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        });
    }
}

/**
 * Tabs Component
 */
class Tabs {
    constructor(element) {
        this.element = element;
        this.tabList = element.querySelector('[role="tablist"]');
        this.tabs = element.querySelectorAll('[role="tab"]');
        this.panels = element.querySelectorAll('[role="tabpanel"]');
        this.activeIndex = 0;

        this.init();
    }

    init() {
        this.setupAccessibility();
        this.setupEventListeners();
        this.activateTab(0);
    }

    setupAccessibility() {
        this.tabs.forEach((tab, index) => {
            tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });

        this.panels.forEach((panel, index) => {
            panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        });
    }

    setupEventListeners() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.activateTab(index));
            tab.addEventListener('keydown', (e) => this.handleKeydown(e, index));
        });
    }

    handleKeydown(event, index) {
        const { key } = event;
        let newIndex = index;

        switch (key) {
            case 'ArrowLeft':
                newIndex = index > 0 ? index - 1 : this.tabs.length - 1;
                break;
            case 'ArrowRight':
                newIndex = index < this.tabs.length - 1 ? index + 1 : 0;
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = this.tabs.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        this.activateTab(newIndex);
        this.tabs[newIndex].focus();
    }

    activateTab(index) {
        // Deactivate current tab
        this.tabs[this.activeIndex].setAttribute('aria-selected', 'false');
        this.tabs[this.activeIndex].setAttribute('tabindex', '-1');
        this.panels[this.activeIndex].setAttribute('aria-hidden', 'true');

        // Activate new tab
        this.activeIndex = index;
        this.tabs[index].setAttribute('aria-selected', 'true');
        this.tabs[index].setAttribute('tabindex', '0');
        this.panels[index].setAttribute('aria-hidden', 'false');

        // Visual updates
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.panels.forEach(panel => panel.classList.remove('active'));
        
        this.tabs[index].classList.add('active');
        this.panels[index].classList.add('active');
    }
}

/**
 * Dropdown Component
 */
class Dropdown {
    constructor(element) {
        this.element = element;
        this.trigger = element.querySelector('[data-dropdown-trigger]');
        this.menu = element.querySelector('[data-dropdown-menu]');
        this.isOpen = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAccessibility();
    }

    setupEventListeners() {
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });

        this.trigger.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && !this.isOpen) {
                e.preventDefault();
                this.open();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target) && this.isOpen) {
                this.close();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    setupAccessibility() {
        this.trigger.setAttribute('aria-haspopup', 'true');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.menu.setAttribute('role', 'menu');
        
        const menuItems = this.menu.querySelectorAll('a, button');
        menuItems.forEach(item => {
            item.setAttribute('role', 'menuitem');
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.element.classList.add('dropdown-open');
        this.trigger.setAttribute('aria-expanded', 'true');
        
        // Focus first menu item
        const firstItem = this.menu.querySelector('[role="menuitem"]');
        if (firstItem) {
            firstItem.focus();
        }
    }

    close() {
        this.isOpen = false;
        this.element.classList.remove('dropdown-open');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.focus();
    }
}

/**
 * Toast Notification System
 */
class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = new Map();
        this.createContainer();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', options = {}) {
        const toast = this.createToast(message, type, options);
        const id = Date.now().toString();
        
        this.toasts.set(id, toast);
        this.container.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('toast-show');
        });

        // Auto dismiss
        const duration = options.duration || 5000;
        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }

        return id;
    }

    createToast(message, type, options) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-md);
            padding: var(--space-md);
            margin-bottom: var(--space-sm);
            box-shadow: var(--shadow-lg);
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            pointer-events: auto;
            max-width: 300px;
        `;

        const content = document.createElement('div');
        content.className = 'toast-content';
        content.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--gray-500);
        `;

        toast.appendChild(content);
        toast.appendChild(closeBtn);

        closeBtn.addEventListener('click', () => {
            const id = Array.from(this.toasts.entries())
                .find(([, element]) => element === toast)?.[0];
            if (id) this.dismiss(id);
        });

        return toast;
    }

    dismiss(id) {
        const toast = this.toasts.get(id);
        if (!toast) return;

        toast.classList.remove('toast-show');
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts.delete(id);
        }, 300);
    }

    dismissAll() {
        this.toasts.forEach((_, id) => this.dismiss(id));
    }
}

/**
 * Form Validator
 */
class FormValidator {
    constructor(form, rules = {}) {
        this.form = form;
        this.rules = rules;
        this.errors = new Map();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validate()) {
            // Form is valid, proceed with submission
            this.form.dispatchEvent(new CustomEvent('validSubmit', {
                detail: { formData: new FormData(this.form) }
            }));
        }
    }

    validate() {
        this.errors.clear();
        let isValid = true;

        Object.entries(this.rules).forEach(([fieldName, rules]) => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!field) return;

            const value = field.value.trim();
            
            rules.forEach(rule => {
                if (!this.applyRule(value, rule, field)) {
                    isValid = false;
                }
            });
        });

        this.displayErrors();
        return isValid;
    }

    validateField(field) {
        const fieldName = field.name;
        const rules = this.rules[fieldName];
        if (!rules) return;

        this.errors.delete(fieldName);
        const value = field.value.trim();
        
        rules.forEach(rule => {
            this.applyRule(value, rule, field);
        });

        this.displayFieldError(field);
    }

    applyRule(value, rule, field) {
        const { type, message } = rule;
        let isValid = true;

        switch (type) {
            case 'required':
                isValid = value.length > 0;
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'minLength':
                isValid = value.length >= rule.value;
                break;
            case 'maxLength':
                isValid = value.length <= rule.value;
                break;
            case 'pattern':
                isValid = new RegExp(rule.value).test(value);
                break;
            case 'custom':
                isValid = rule.validator(value, field);
                break;
        }

        if (!isValid) {
            this.errors.set(field.name, message);
        }

        return isValid;
    }

    displayErrors() {
        // Clear existing errors
        this.form.querySelectorAll('.field-error').forEach(error => error.remove());
        
        this.errors.forEach((message, fieldName) => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            this.showFieldError(field, message);
        });
    }

    displayFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();

        const error = this.errors.get(field.name);
        if (error) {
            this.showFieldError(field, error);
        }
    }

    showFieldError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error text-error';
        errorElement.style.cssText = `
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

/**
 * Performance Monitor for BrowserTools
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            timing: {},
            memory: {},
            vitals: {}
        };
        
        this.init();
    }

    init() {
        if (window.BattelApp?.config?.debug) {
            this.startMonitoring();
        }
    }

    startMonitoring() {
        // Monitor Core Web Vitals
        this.measureCLS();
        this.measureFID();
        this.measureLCP();
        
        // Monitor custom metrics
        setInterval(() => {
            this.updateMetrics();
        }, 5000);
    }

    measureCLS() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.vitals.cls = clsValue;
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.vitals.fid = entry.processingStart - entry.startTime;
                }
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.vitals.lcp = lastEntry.startTime;
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    updateMetrics() {
        // Timing metrics
        if (performance.timing) {
            const timing = performance.timing;
            this.metrics.timing = {
                pageLoad: timing.loadEventEnd - timing.navigationStart,
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                firstByte: timing.responseStart - timing.navigationStart
            };
        }

        // Memory metrics
        if (performance.memory) {
            this.metrics.memory = {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
            };
        }

        // Expose to global for BrowserTools
        window.performanceMetrics = this.metrics;
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modals
    document.querySelectorAll('[data-modal]').forEach(modal => {
        new Modal(modal);
    });

    // Initialize tabs
    document.querySelectorAll('[data-tabs]').forEach(tabs => {
        new Tabs(tabs);
    });

    // Initialize dropdowns
    document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
        new Dropdown(dropdown);
    });

    // Initialize toast manager
    window.toastManager = new ToastManager();

    // Initialize performance monitor
    window.performanceMonitor = new PerformanceMonitor();

    // Expose components globally for development
    if (window.BattelApp?.config?.debug) {
        window.components = {
            Modal,
            Tabs,
            Dropdown,
            ToastManager,
            FormValidator,
            PerformanceMonitor
        };
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Modal,
        Tabs,
        Dropdown,
        ToastManager,
        FormValidator,
        PerformanceMonitor
    };
} 