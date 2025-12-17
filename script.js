// Close mobile menu when a link is clicked
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-toggle').checked = false;
    });
});

// Handle contact form submission via AJAX
const form = document.querySelector('.contact-form');
const status = form.querySelector('.form-status');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    status.textContent = '';
    status.className = 'form-status';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.textContent = 'Thanks for your message! I\'ll get back to you soon.';
            status.classList.add('success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        status.textContent = 'Oops! There was a problem sending your message. Please try again.';
        status.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});
