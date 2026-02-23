/**
 * Shared Components for TREISA Website
 * This script injects the Header and Footer across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
});

function injectHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="container navbar">
            <a href="index.html" class="logo">TREISA™</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#products">Products</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="distributor-enquiry.html">Distributor Enquiry</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </nav>
        </div>
    `;
    document.body.prepend(header);
}

function injectFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>TREISA™</h3>
                    <p>A brand of Shrivandan Industries</p>
                    <p>Household Cleaning & Personal Hygiene Products</p>
                    <p style="margin-top: 1rem;"><i class="fas fa-map-marker-alt"></i> Agra, Uttar Pradesh, India</p>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="distributor-enquiry.html">Distributor Enquiry</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Legal & Policies</h3>
                    <ul class="footer-links">
                        <li><a href="legal/legal-privacy.html">Privacy Policy</a></li>
                        <li><a href="legal/legal-terms.html">Terms & Conditions</a></li>
                        <li><a href="legal/legal-refund.html">Refund & Return Policy</a></li>
                        <li><a href="legal/legal-shipping.html">Shipping & Distributor Supply Policy</a></li>
                        <li><a href="legal/legal-disclaimer.html">Disclaimer</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Connect With Us</h3>
                    <ul class="footer-links" style="display: flex; gap: 15px; font-size: 1.5rem;">
                        <li><a href="https://www.facebook.com/share/1SgNF8k2ht/" target="_blank"><i class="fab fa-facebook"></i></a></li>
                        <li><a href="https://www.instagram.com/treisadailycare?igsh=cHFpYWowdnkzdW96" target="_blank"><i class="fab fa-instagram"></i></a></li>
                        <li><a href="https://wa.me/message/X4RRHKY5ARLSH1" target="_blank"><i class="fab fa-whatsapp"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2025–Present TREISA™. All rights reserved.</p>
                <p>TREISA™ is a brand of Shrivandan Industries (Proprietorship).</p>
            </div>
        </div>
    `;
    document.body.appendChild(footer);

    // Add FontAwesome for icons
    if (!document.getElementById('font-awesome')) {
        const link = document.createElement('link');
        link.id = 'font-awesome';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(link);
    }
}
