document.addEventListener('DOMContentLoaded', () => {
    const themeToggleIcon = document.getElementById('mode-toggle');
    const themeToggleText = document.getElementById('mode-toggle-text');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme
    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        updateThemeIcon(currentTheme);
    }

    themeToggleIcon.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        // Save the current theme in localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode ? 'dark' : 'light');
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeToggleIcon.classList.remove('bi-moon');
            themeToggleIcon.classList.add('bi-sun');
            themeToggleText.innerText = "Light Mode";

            // Select all h5 elements within the specific containers
            const h5Elements = document.querySelectorAll('.resume .resume-item h5');
            h5Elements.forEach(element => {
                element.classList.add('dark-mode');
            });
        } else {
            themeToggleIcon.classList.remove('bi-sun');
            themeToggleIcon.classList.add('bi-moon');
            themeToggleText.innerText = "Dark Mode";

            // Select all h5 elements within the specific containers
            const h5Elements = document.querySelectorAll('.resume .resume-item h5');
            h5Elements.forEach(element => {
                element.classList.remove('dark-mode');
            });
        }
    }
});


(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
     * Hero type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 500
        });
    }

    /**
     * Hero type effect
     */
    const typed2 = select('.typed2')
    if (typed2) {
        let typed_strings2 = typed2.getAttribute('data-typed-items')
        let typed_strings_all = typed_strings2.split(',')
        new Typed('.typed2', {
            strings: typed_strings_all,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 500
        });
    }


    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function (direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * Initiate Pure Counter
     */
})()


