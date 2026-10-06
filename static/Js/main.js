/* =========================================================
   MANSORA GLOBAL ANIMATION ENGINE
   ========================================================= */

   document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       01 — GLOBAL NAVBAR SCROLL ANIMATION
       ========================================================= */

    const header = document.querySelector("header");

    function updateNavbar() {
        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("navbar-scrolled");
        } else {
            header.classList.remove("navbar-scrolled");
        }
    }

    if (header) {
        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );

        updateNavbar();
    }


    /* =========================================================
       02 — GENERAL SCROLL REVEALS
       ========================================================= */

    const revealSections =
        document.querySelectorAll(".reveal-section");

    if (
        revealSections.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const revealObserver =
            new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.25
                }
            );

        revealSections.forEach(function (section) {
            revealObserver.observe(section);
        });
    }


    /* =========================================================
       03 — WHY MANSORA PRINCIPLES
       ========================================================= */

    const whyPrinciples =
        document.querySelectorAll(".why-principle");

    if (
        whyPrinciples.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const whyObserver =
            new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "why-visible"
                            );

                            whyObserver.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.35
                }
            );

        whyPrinciples.forEach(function (section) {
            whyObserver.observe(section);
        });
    }


    /* =========================================================
       04 — WHY MANSORA GENERAL REVEALS
       ========================================================= */

    const whyRevealElements =
        document.querySelectorAll(".reveal-why");

    if (
        whyRevealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const revealWhyObserver =
            new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "why-active"
                            );

                            revealWhyObserver.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.2
                }
            );

        whyRevealElements.forEach(function (element) {
            revealWhyObserver.observe(element);
        });
    }


    /* =========================================================
       05 — WHY MANSORA SCROLL PROGRESS
       ========================================================= */

    const whyProgressLine =
        document.querySelector(".why-progress-line");

    const whyProgressDot =
        document.querySelector(".why-progress-dot");

    function updateWhyProgress() {
        if (
            !whyProgressLine ||
            !whyProgressDot
        ) {
            return;
        }

        const pageTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (pageHeight <= 0) {
            return;
        }

        const progress =
            Math.min(
                Math.max(
                    pageTop / pageHeight,
                    0
                ),
                1
            );

        whyProgressLine.style.height =
            (progress * 100) + "%";

        const progressContainer =
            whyProgressLine.parentElement;

        if (progressContainer) {
            const containerHeight =
                progressContainer.offsetHeight;

            whyProgressDot.style.top =
                (progress * containerHeight) + "px";
        }
    }

    if (
        whyProgressLine &&
        whyProgressDot
    ) {
        window.addEventListener(
            "scroll",
            updateWhyProgress,
            { passive: true }
        );

        updateWhyProgress();
    }


    /* =========================================================
       06 — WHO WE SERVE
       CINEMATIC PREMIUM ANIMATION ENGINE
       ========================================================= */

    const whoPage =
        document.querySelector(".who-page");

    if (whoPage) {

        /* =====================================================
           06.1 — HERO INTRO
           ===================================================== */

        const whoHero =
            whoPage.querySelector(".who-hero");

        const heroImage =
            whoPage.querySelector(".who-hero-image");

        const heroContent =
            whoPage.querySelector(".who-hero-content");

        if (whoHero) {
            requestAnimationFrame(function () {
                whoHero.classList.add(
                    "who-hero-ready"
                );
            });
        }


        /* =====================================================
           06.2 — WHO WE SERVE PARALLAX
           ===================================================== */

        let whoTicking = false;

        function updateWhoParallax() {

            if (window.innerWidth <= 768) {
                whoTicking = false;
                return;
            }

            /* HERO IMAGE */

            if (
                heroImage &&
                whoHero
            ) {
                const heroRect =
                    whoHero.getBoundingClientRect();

                const movement =
                    Math.max(
                        Math.min(
                            -heroRect.top * 0.08,
                            70
                        ),
                        -70
                    );

                heroImage.style.transform =
                    `scale(1.06) translate3d(0, ${movement}px, 0)`;
            }


            /* HERO CONTENT */

            if (
                heroContent &&
                whoHero
            ) {
                const heroRect =
                    whoHero.getBoundingClientRect();

                const movement =
                    Math.max(
                        Math.min(
                            heroRect.top * 0.08,
                            40
                        ),
                        -40
                    );

                heroContent.style.transform =
                    `translate3d(0, ${movement}px, 0)`;
            }


            /* DIFFERENCE IMAGE */

            const differenceImage =
                whoPage.querySelector(
                    ".who-difference-image"
                );

            const difference =
                whoPage.querySelector(
                    ".who-difference"
                );

            if (
                differenceImage &&
                difference
            ) {
                const rect =
                    difference.getBoundingClientRect();

                const viewport =
                    window.innerHeight;

                const progress =
                    (viewport - rect.top) /
                    (viewport + rect.height);

                const clamped =
                    Math.max(
                        Math.min(progress, 1),
                        0
                    );

                const movement =
                    (clamped - 0.5) * 70;

                differenceImage.style.transform =
                    `scale(1.06) translate3d(0, ${movement}px, 0)`;
            }

            whoTicking = false;
        }

        window.addEventListener(
            "scroll",
            function () {
                if (!whoTicking) {
                    window.requestAnimationFrame(
                        updateWhoParallax
                    );

                    whoTicking = true;
                }
            },
            { passive: true }
        );

        updateWhoParallax();


        /* =====================================================
           06.3 — PREMIUM SCROLL REVEALS
           ===================================================== */

        const revealElements =
            whoPage.querySelectorAll(
                ".reveal-who, " +
                ".who-intro, " +
                ".who-value, " +
                ".who-promise-content, " +
                ".who-final-content"
            );

        if (
            revealElements.length > 0 &&
            "IntersectionObserver" in window
        ) {
            const whoRevealObserver =
                new IntersectionObserver(
                    function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "who-reveal-active"
                                );

                                whoRevealObserver.unobserve(
                                    entry.target
                                );
                            }
                        });
                    },
                    {
                        threshold: 0.12,
                        rootMargin:
                            "0px 0px -8% 0px"
                    }
                );

            revealElements.forEach(function (element) {

                element.classList.add(
                    "who-reveal-ready"
                );

                whoRevealObserver.observe(element);
            });

        } else {

            revealElements.forEach(function (element) {
                element.classList.add(
                    "who-reveal-active"
                );
            });
        }


        /* =====================================================
           06.4 — CLIENT JOURNEY
           ===================================================== */

        const clients =
            Array.from(
                whoPage.querySelectorAll(
                    ".who-client"
                )
            );

        const progressLine =
            whoPage.querySelector(
                ".who-client-progress"
            );

        const progressDot =
            whoPage.querySelector(
                ".who-client-dot"
            );

        function updateClientJourney() {

            if (!clients.length) {
                return;
            }

            const viewportCenter =
                window.innerHeight * 0.48;

            let activeIndex = 0;


            clients.forEach(function (client, index) {

                const rect =
                    client.getBoundingClientRect();

                const clientCenter =
                    rect.top +
                    rect.height / 2;

                const distance =
                    Math.abs(
                        viewportCenter -
                        clientCenter
                    );

                const activeRect =
                    clients[activeIndex]
                        .getBoundingClientRect();

                const activeCenter =
                    activeRect.top +
                    activeRect.height / 2;

                const activeDistance =
                    Math.abs(
                        viewportCenter -
                        activeCenter
                    );

                if (
                    index === 0 ||
                    distance < activeDistance
                ) {
                    activeIndex = index;
                }
            });


            /* ACTIVATE PREVIOUS CLIENTS */

            clients.forEach(function (client, index) {

                if (index <= activeIndex) {

                    client.classList.add(
                        "who-active"
                    );
                }
            });


            /* PROGRESS LINE */

            if (progressLine) {

                const first =
                    clients[0]
                        .getBoundingClientRect();

                const last =
                    clients[
                        clients.length - 1
                    ].getBoundingClientRect();

                const journeyStart =
                    first.top +
                    window.scrollY;

                const journeyEnd =
                    last.bottom +
                    window.scrollY;

                const journeyLength =
                    journeyEnd -
                    journeyStart;

                if (journeyLength > 0) {

                    const current =
                        window.scrollY +
                        window.innerHeight * 0.48;

                    const progress =
                        (current - journeyStart) /
                        journeyLength;

                    const clamped =
                        Math.max(
                            0,
                            Math.min(
                                progress,
                                1
                            )
                        );

                    progressLine.style.height =
                        `${clamped * 100}%`;

                    if (progressDot) {
                        progressDot.style.top =
                            `${clamped * 100}%`;
                    }
                }
            }
        }

        window.addEventListener(
            "scroll",
            updateClientJourney,
            { passive: true }
        );

        updateClientJourney();


        /* =====================================================
           06.5 — VALUE CARDS
           PREMIUM 3D MOUSE DEPTH
           ===================================================== */

        const valueCards =
            whoPage.querySelectorAll(
                ".who-value"
            );

        valueCards.forEach(function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.innerWidth <= 768
                    ) {
                        return;
                    }

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) * -4;

                    const rotateY =
                        ((x - centerX) /
                            centerX) * 4;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;
                }
            );

            card.addEventListener(
                "mouseleave",
                function () {
                    card.style.transform = "";
                }
            );
        });


        /* =====================================================
           06.6 — GOLD LIGHT FOLLOWS CURSOR
           ===================================================== */

        const valuesSection =
            whoPage.querySelector(
                ".who-values"
            );

        if (
            valuesSection &&
            window.innerWidth > 768
        ) {

            valuesSection.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        valuesSection.getBoundingClientRect();

                    const x =
                        (
                            (event.clientX -
                                rect.left) /
                            rect.width
                        ) * 100;

                    const y =
                        (
                            (event.clientY -
                                rect.top) /
                            rect.height
                        ) * 100;

                    valuesSection.style.setProperty(
                        "--mouse-x",
                        `${x}%`
                    );

                    valuesSection.style.setProperty(
                        "--mouse-y",
                        `${y}%`
                    );
                }
            );
        }


        /* =====================================================
           06.7 — MAGNETIC CTA
           ===================================================== */

        const cta =
            whoPage.querySelector(
                ".who-cta"
            );

        if (
            cta &&
            window.innerWidth > 768
        ) {

            cta.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        cta.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    const strength = 0.18;

                    cta.style.transform =
                        `translate3d(
                            ${x * strength}px,
                            ${y * strength}px,
                            0
                        )`;
                }
            );

            cta.addEventListener(
                "mouseleave",
                function () {
                    cta.style.transform = "";
                }
            );
        }


        /* =====================================================
           06.8 — FINAL GLOW REACTION
           ===================================================== */

        const finalSection =
            whoPage.querySelector(
                ".who-final"
            );

        const finalGlow =
            whoPage.querySelector(
                ".who-final-glow"
            );

        if (
            finalSection &&
            finalGlow &&
            window.innerWidth > 768
        ) {

            finalSection.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        finalSection.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    finalGlow.style.transform =
                        `translate3d(
                            ${x * 0.025}px,
                            ${y * 0.025}px,
                            0
                        ) scale(1.05)`;
                }
            );

            finalSection.addEventListener(
                "mouseleave",
                function () {
                    finalGlow.style.transform = "";
                }
            );
        }


        /* =====================================================
           06.9 — REDUCED MOTION
           ===================================================== */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        if (reducedMotion.matches) {
            whoPage.classList.add(
                "who-reduced-motion"
            );
        }


        /* =====================================================
           06.10 — FINAL INITIAL REFRESH
           ===================================================== */

        setTimeout(function () {
            updateWhoParallax();
            updateClientJourney();
        }, 150);
    }


    /* =========================================================
       07 — MANSORA CONTACT PAGE
       PREMIUM / CINEMATIC INTERACTION ENGINE
       ========================================================= */

    const contactPage =
        document.querySelector(".contact-page");

    if (contactPage) {

        /* =====================================================
           07.1 — CONTACT NAVBAR
           ===================================================== */

        const contactHeader =
            document.querySelector("header");

        function updateContactNavbar() {

            if (!contactHeader) return;

            if (window.scrollY > 40) {
                contactHeader.classList.add(
                    "contact-nav-scrolled"
                );
            } else {
                contactHeader.classList.remove(
                    "contact-nav-scrolled"
                );
            }
        }

        window.addEventListener(
            "scroll",
            updateContactNavbar,
            { passive: true }
        );

        updateContactNavbar();


        /* =====================================================
           07.2 — HERO ENTRANCE
           ===================================================== */

        const contactHero =
            contactPage.querySelector(
                ".contact-hero"
            );

        if (contactHero) {

            requestAnimationFrame(function () {

                setTimeout(function () {

                    contactHero.classList.add(
                        "contact-hero-active"
                    );

                }, 120);
            });
        }


        /* =====================================================
           07.3 — HERO PARALLAX
           ===================================================== */

        const contactHeroContent =
            contactPage.querySelector(
                ".contact-hero-inner"
            );

        const heroOrbs =
            contactPage.querySelectorAll(
                ".contact-hero-orb"
            );

        const floatingCards =
            contactPage.querySelectorAll(
                ".hero-floating-card"
            );

        let heroTicking = false;

        function updateContactHeroParallax() {

            if (!contactHero) return;

            if (window.innerWidth <= 768) {
                heroTicking = false;
                return;
            }

            const rect =
                contactHero.getBoundingClientRect();

            const progress =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        -rect.top /
                        window.innerHeight
                    )
                );


            /* HERO CONTENT */

            if (contactHeroContent) {

                const movement =
                    progress * 40;

                contactHeroContent.style.transform =
                    `translate3d(0, ${movement}px, 0)`;
            }


            /* BACKGROUND ORBS */

            heroOrbs.forEach(function (orb, index) {

                const speed =
                    (index + 1) * 22;

                const movement =
                    progress * speed;

                orb.style.transform =
                    `translate3d(0, ${movement}px, 0)`;
            });


            /* FLOATING CARDS */

            floatingCards.forEach(function (card, index) {

                const speed =
                    (index + 1) * 8;

                const movement =
                    progress * speed;

                card.style.transform =
                    `translate3d(0, ${movement}px, 0)`;
            });

            heroTicking = false;
        }

        window.addEventListener(
            "scroll",
            function () {

                if (!heroTicking) {

                    window.requestAnimationFrame(
                        updateContactHeroParallax
                    );

                    heroTicking = true;
                }
            },
            { passive: true }
        );

        updateContactHeroParallax();


        /* =====================================================
           07.4 — HERO MOUSE LIGHT
           ===================================================== */

        if (
            contactHero &&
            window.innerWidth > 768
        ) {

            contactHero.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        contactHero.getBoundingClientRect();

                    const x =
                        (
                            (event.clientX -
                                rect.left) /
                            rect.width
                        ) * 100;

                    const y =
                        (
                            (event.clientY -
                                rect.top) /
                            rect.height
                        ) * 100;

                    contactHero.style.setProperty(
                        "--mouse-x",
                        `${x}%`
                    );

                    contactHero.style.setProperty(
                        "--mouse-y",
                        `${y}%`
                    );
                }
            );

            contactHero.addEventListener(
                "mouseleave",
                function () {

                    contactHero.style.setProperty(
                        "--mouse-x",
                        "50%"
                    );

                    contactHero.style.setProperty(
                        "--mouse-y",
                        "50%"
                    );
                }
            );
        }


        /* =====================================================
           07.5 — HERO FLOATING CARD 3D
           ===================================================== */

        floatingCards.forEach(function (card) {

            if (window.innerWidth <= 768) {
                return;
            }

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) * -6;

                    const rotateY =
                        ((x - centerX) /
                            centerX) * 6;

                    card.style.transform =
                        `perspective(700px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;
                }
            );

            card.addEventListener(
                "mouseleave",
                function () {
                    card.style.transform = "";
                }
            );
        });


        /* =====================================================
           07.6 — START A CONVERSATION BUTTON
           ===================================================== */

        const startButton =
            contactPage.querySelector(
                ".contact-scroll-btn"
            );

        if (startButton) {

            startButton.addEventListener(
                "click",
                function () {

                    const target =
                        document.querySelector(
                            "#conversation"
                        );

                    if (!target) return;

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            );
        }


        /* =====================================================
           07.7 — PREMIUM SCROLL REVEALS
           ===================================================== */

        const contactRevealElements =
            contactPage.querySelectorAll(
                ".contact-intro, " +
                ".contact-form-section, " +
                ".booking-section, " +
                ".newsletter-section, " +
                ".form-field"
            );

        if (
            contactRevealElements.length > 0 &&
            "IntersectionObserver" in window
        ) {

            const contactObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "contact-visible"
                                    );

                                    contactObserver.unobserve(
                                        entry.target
                                    );
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.12,
                        rootMargin:
                            "0px 0px -8% 0px"
                    }
                );

            contactRevealElements.forEach(
                function (element) {

                    element.classList.add(
                        "contact-reveal-ready"
                    );

                    contactObserver.observe(
                        element
                    );
                }
            );

        } else {

            contactRevealElements.forEach(
                function (element) {

                    element.classList.add(
                        "contact-visible"
                    );
                }
            );
        }


        /* =====================================================
           07.8 — FORM FIELD INTERACTION
           ===================================================== */

        const formFields =
            contactPage.querySelectorAll(
                ".form-field"
            );

        formFields.forEach(function (field) {

            const input =
                field.querySelector(
                    "input, textarea, select"
                );

            if (!input) return;


            input.addEventListener(
                "focus",
                function () {

                    field.classList.add(
                        "field-active"
                    );
                }
            );


            input.addEventListener(
                "blur",
                function () {

                    field.classList.remove(
                        "field-active"
                    );

                    if (
                        input.value.trim() !== ""
                    ) {

                        field.classList.add(
                            "field-filled"
                        );

                    } else {

                        field.classList.remove(
                            "field-filled"
                        );
                    }
                }
            );


            input.addEventListener(
                "input",
                function () {

                    if (
                        input.value.trim() !== ""
                    ) {

                        field.classList.add(
                            "field-filled"
                        );

                    } else {

                        field.classList.remove(
                            "field-filled"
                        );
                    }
                }
            );
        });


        /* =====================================================
           07.9 — FORM MOUSE LIGHT
           ===================================================== */

        const formWrapper =
            contactPage.querySelector(
                ".form-wrapper"
            );

        if (
            formWrapper &&
            window.innerWidth > 768
        ) {

            formWrapper.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        formWrapper.getBoundingClientRect();

                    const x =
                        (
                            (event.clientX -
                                rect.left) /
                            rect.width
                        ) * 100;

                    const y =
                        (
                            (event.clientY -
                                rect.top) /
                            rect.height
                        ) * 100;

                    formWrapper.style.setProperty(
                        "--form-mouse-x",
                        `${x}%`
                    );

                    formWrapper.style.setProperty(
                        "--form-mouse-y",
                        `${y}%`
                    );
                }
            );
        }


        /* =====================================================
           07.10 — MAGNETIC SEND BUTTON
           ===================================================== */

        const submitButton =
            contactPage.querySelector(
                ".mansora-submit"
            );

        if (
            submitButton &&
            window.innerWidth > 768
        ) {

            submitButton.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        submitButton.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    submitButton.style.transform =
                        `translate3d(
                            ${x * 0.08}px,
                            ${y * 0.08}px,
                            0
                        )`;
                }
            );

            submitButton.addEventListener(
                "mouseleave",
                function () {
                    submitButton.style.transform = "";
                }
            );
        }


        /* =====================================================
           07.11 — SUBMIT BUTTON RIPPLE
           ===================================================== */

        if (submitButton) {

            submitButton.addEventListener(
                "click",
                function () {

                    submitButton.classList.add(
                        "button-clicked"
                    );

                    setTimeout(
                        function () {

                            submitButton.classList.remove(
                                "button-clicked"
                            );

                        },
                        500
                    );
                }
            );
        }


        /* =====================================================
           07.12 — CONTACT FORM EXPERIENCE
           ===================================================== */

        const contactForm =
            contactPage.querySelector(
                "#contactForm"
            );

        const formSuccess =
            contactPage.querySelector(
                "#formSuccess"
            );

        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    /* Prevent double submissions */

                    if (
                        contactForm.classList.contains(
                            "form-sending"
                        )
                    ) {
                        return;
                    }


                    const button =
                        contactForm.querySelector(
                            ".mansora-submit"
                        );

                    const buttonText =
                        button
                            ? button.querySelector(
                                "span:first-child"
                            )
                            : null;


                    contactForm.classList.add(
                        "form-sending"
                    );


                    if (buttonText) {
                        buttonText.textContent =
                            "SENDING...";
                    }


                    try {

                        const formData =
                            new FormData(
                                contactForm
                            );


                        /*
                         * Flask endpoint.
                         *
                         * This route will connect
                         * to the real email system.
                         */

                        const response =
                            await fetch(
                                "/contact",
                                {
                                    method: "POST",
                                    body: formData,
                                    headers: {
                                        "X-Requested-With":
                                            "XMLHttpRequest"
                                    }
                                }
                            );


                        if (!response.ok) {
                            throw new Error(
                                "Message failed"
                            );
                        }


                        /* SUCCESS */

                        contactForm.classList.remove(
                            "form-sending"
                        );

                        contactForm.classList.add(
                            "form-sent"
                        );


                        if (buttonText) {
                            buttonText.textContent =
                                "MESSAGE SENT";
                        }


                        if (formSuccess) {
                            formSuccess.classList.add(
                                "success-visible"
                            );
                        }


                        contactForm.reset();


                        setTimeout(
                            function () {

                                contactForm.classList.remove(
                                    "form-sent"
                                );

                                if (buttonText) {
                                    buttonText.textContent =
                                        "SEND MESSAGE";
                                }

                            },
                            3500
                        );


                    } catch (error) {

                        console.error(
                            "Contact form error:",
                            error
                        );


                        contactForm.classList.remove(
                            "form-sending"
                        );

                        contactForm.classList.add(
                            "form-error"
                        );


                        if (buttonText) {
                            buttonText.textContent =
                                "TRY AGAIN";
                        }


                        setTimeout(
                            function () {

                                contactForm.classList.remove(
                                    "form-error"
                                );

                                if (buttonText) {
                                    buttonText.textContent =
                                        "SEND MESSAGE";
                                }

                            },
                            3000
                        );
                    }
                }
            );
        }


        /* =====================================================
           07.13 — BOOKING BUTTON
           ===================================================== */

        const bookingButton =
            contactPage.querySelector(
                ".booking-button"
            );

        if (bookingButton) {

            bookingButton.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.innerWidth <= 768
                    ) {
                        return;
                    }

                    const rect =
                        bookingButton.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    bookingButton.style.transform =
                        `translate3d(
                            ${x * 0.06}px,
                            ${y * 0.06}px,
                            0
                        )`;
                }
            );


            bookingButton.addEventListener(
                "mouseleave",
                function () {
                    bookingButton.style.transform = "";
                }
            );
        }


        /* =====================================================
           07.14 — NEWSLETTER
           ===================================================== */

        const newsletterForm =
            contactPage.querySelector(
                "#newsletterForm"
            );

        const newsletterEmail =
            contactPage.querySelector(
                "#newsletterEmail"
            );

        const newsletterMessage =
            contactPage.querySelector(
                "#newsletterMessage"
            );

        if (newsletterForm) {

            newsletterForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    if (
                        newsletterForm.classList.contains(
                            "newsletter-sending"
                        )
                    ) {
                        return;
                    }


                    const button =
                        newsletterForm.querySelector(
                            "button"
                        );


                    newsletterForm.classList.add(
                        "newsletter-sending"
                    );


                    if (button) {

                        button.disabled = true;

                        button.innerHTML =
                            `SUBSCRIBING <span>...</span>`;
                    }


                    try {

                        const formData =
                            new FormData();

                        formData.append(
                            "email",
                            newsletterEmail.value
                        );


                        /*
                         * Flask newsletter endpoint.
                         */

                        const response =
                            await fetch(
                                "/subscribe",
                                {
                                    method: "POST",
                                    body: formData,
                                    headers: {
                                        "X-Requested-With":
                                            "XMLHttpRequest"
                                    }
                                }
                            );


                        if (!response.ok) {
                            throw new Error(
                                "Subscription failed"
                            );
                        }


                        newsletterForm.classList.remove(
                            "newsletter-sending"
                        );

                        newsletterForm.classList.add(
                            "newsletter-success"
                        );


                        if (newsletterMessage) {

                            newsletterMessage.textContent =
                                "You're subscribed. Welcome to MANSORA.";

                            newsletterMessage.classList.add(
                                "newsletter-message-success"
                            );
                        }


                        if (button) {

                            button.disabled = false;

                            button.innerHTML =
                                `SUBSCRIBED ✓`;
                        }


                        if (newsletterEmail) {
                            newsletterEmail.value = "";
                        }


                    } catch (error) {

                        console.error(
                            "Newsletter error:",
                            error
                        );


                        newsletterForm.classList.remove(
                            "newsletter-sending"
                        );


                        if (newsletterMessage) {

                            newsletterMessage.textContent =
                                "Something went wrong. Please try again.";

                            newsletterMessage.classList.add(
                                "newsletter-message-error"
                            );
                        }


                        if (button) {

                            button.disabled = false;

                            button.innerHTML =
                                `SUBSCRIBE <span>→</span>`;
                        }
                    }
                }
            );
        }


        /* =====================================================
           07.15 — NEWSLETTER INPUT GLOW
           ===================================================== */

        if (newsletterEmail) {

            newsletterEmail.addEventListener(
                "focus",
                function () {

                    if (newsletterEmail.parentElement) {

                        newsletterEmail.parentElement.classList.add(
                            "newsletter-focused"
                        );
                    }
                }
            );


            newsletterEmail.addEventListener(
                "blur",
                function () {

                    if (newsletterEmail.parentElement) {

                        newsletterEmail.parentElement.classList.remove(
                            "newsletter-focused"
                        );
                    }
                }
            );
        }


        /* =====================================================
           07.16 — CONTACT HERO FLOATING MOTION
           ===================================================== */

        if (
            contactHero &&
            window.innerWidth > 768
        ) {

            contactHero.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        contactHero.getBoundingClientRect();

                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        0.5;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        0.5;


                    floatingCards.forEach(
                        function (card, index) {

                            const strength =
                                (index + 1) * 5;

                            card.style.marginLeft =
                                `${x * strength}px`;

                            card.style.marginTop =
                                `${y * strength}px`;
                        }
                    );
                }
            );


            contactHero.addEventListener(
                "mouseleave",
                function () {

                    floatingCards.forEach(
                        function (card) {

                            card.style.marginLeft = "";
                            card.style.marginTop = "";
                        }
                    );
                }
            );
        }


        /* =====================================================
           07.17 — SCROLL PROGRESS
           ===================================================== */

        let scrollTicking = false;

        function updateContactProgress() {

            const pageHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if (pageHeight <= 0) {
                scrollTicking = false;
                return;
            }


            const progress =
                Math.min(
                    Math.max(
                        window.scrollY /
                        pageHeight,
                        0
                    ),
                    1
                );


            contactPage.style.setProperty(
                "--contact-scroll-progress",
                `${progress * 100}%`
            );


            scrollTicking = false;
        }


        window.addEventListener(
            "scroll",
            function () {

                if (!scrollTicking) {

                    window.requestAnimationFrame(
                        updateContactProgress
                    );

                    scrollTicking = true;
                }
            },
            { passive: true }
        );


        updateContactProgress();


        /* =====================================================
           07.18 — REDUCED MOTION
           ===================================================== */

        const contactReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        if (contactReducedMotion.matches) {

            contactPage.classList.add(
                "contact-reduced-motion"
            );
        }


        /* =====================================================
           07.19 — INITIAL REFRESH
           ===================================================== */

        setTimeout(
            function () {

                updateContactNavbar();
                updateContactHeroParallax();
                updateContactProgress();

            },
            150
        );
    }


    /* =========================================================
       08 — GENERAL VALUE CARDS
       ========================================================= */

    const generalValueCards =
        document.querySelectorAll(
            ".values-section .value-card, " +
            ".intro-section .value-card"
        );

    generalValueCards.forEach(function (card) {

        if (
            card.closest(".who-page") ||
            window.innerWidth <= 768
        ) {
            return;
        }


        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) * -2.5;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 2.5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;
            }
        );


        card.addEventListener(
            "mouseleave",
            function () {
                card.style.transform = "";
            }
        );
    });


    /* =========================================================
       09 — SMOOTH INTERNAL ANCHOR NAVIGATION
       ========================================================= */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                let target = null;

                try {
                    target =
                        document.querySelector(href);
                } catch (error) {
                    return;
                }


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


    /* =========================================================
       10 — REDUCED MOTION GLOBAL SUPPORT
       ========================================================= */

    const globalReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (
        globalReducedMotion.matches
    ) {

        document.body.classList.add(
            "reduced-motion"
        );
    }


    /* =========================================================
       11 — MANSORA FLOATING CONNECT WIDGET
       ========================================================= */

    const connectWidget =
        document.querySelector(
            ".mansora-connect-widget"
        );

    const connectToggle =
        document.getElementById(
            "mansoraConnectToggle"
        );

    const connectMenu =
        document.getElementById(
            "mansoraConnectMenu"
        );

    if (
        connectWidget &&
        connectToggle &&
        connectMenu
    ) {

        /* TOGGLE CONNECT MENU */

        connectToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    connectWidget.classList.toggle(
                        "open"
                    );

                connectToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );
            }
        );


        /* CLOSE WHEN CLICKING OUTSIDE */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !connectWidget.contains(
                        event.target
                    )
                ) {

                    connectWidget.classList.remove(
                        "open"
                    );

                    connectToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        );


        /* KEEP MENU OPEN WHEN CLICKING INSIDE */

        connectMenu.addEventListener(
            "click",
            function (event) {
                event.stopPropagation();
            }
        );
    }


    /* =========================================================
       12 — NAVBAR LANGUAGE SELECTOR
       ========================================================= */

    const languageDropdown =
        document.querySelector(
            ".language-dropdown"
        );

    const languageToggle =
        document.getElementById(
            "languageToggle"
        );

    const languageMenu =
        document.getElementById(
            "languageMenu"
        );

    if (
        languageDropdown &&
        languageToggle &&
        languageMenu
    ) {

        /* TOGGLE LANGUAGE MENU */

        languageToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    languageDropdown.classList.toggle(
                        "active"
                    );

                languageToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );
            }
        );


        /* KEEP MENU OPEN WHEN CLICKING INSIDE */

        languageMenu.addEventListener(
            "click",
            function (event) {
                event.stopPropagation();
            }
        );


        /* CLOSE WHEN CLICKING OUTSIDE */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !languageDropdown.contains(
                        event.target
                    )
                ) {

                    languageDropdown.classList.remove(
                        "active"
                    );

                    languageToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        );
    }


    /* =========================================================
   13 — MANSORA LANGUAGE TRANSLATOR
   AUTOMATIC FULL-PAGE TRANSLATION
   ========================================================= */

const languageCodeMap = {
    en: "en",
    fr: "fr",
    es: "es",
    de: "de",
    pt: "pt",
    it: "it",
    ar: "ar",
    zh: "zh-CN",
    ja: "ja",
    ko: "ko"
};




/* =========================================================
   TRANSLATE PAGE
   ========================================================= */

function translatePage(language) {

    const targetLanguage =
        languageCodeMap[language];

    if (!targetLanguage) {
        return;
    }


    const select =
        document.querySelector(
            ".goog-te-combo"
        );


    /* GOOGLE TRANSLATE NOT READY */

    if (!select) {

        console.warn(
            "MANSORA: Google Translate is still loading."
        );

        return;
    }


    /* =====================================================
       ENGLISH — RESTORE ORIGINAL PAGE
       ===================================================== */

    if (targetLanguage === "en") {

        select.value = "en";

        select.dispatchEvent(
            new Event("change")
        );

        return;
    }


    /* =====================================================
       CHANGE LANGUAGE
       ===================================================== */

    select.value =
        targetLanguage;

    select.dispatchEvent(
        new Event("change")
    );
}


/* =========================================================
   LANGUAGE LINKS
   ========================================================= */

const languageLinks =
    document.querySelectorAll(
        ".language-menu a[data-language]"
    );


languageLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            const language =
                link.getAttribute(
                    "data-language"
                );


            translatePage(language);


            /* CLOSE LANGUAGE MENU */

            if (languageDropdown) {

                languageDropdown.classList.remove(
                    "active"
                );
            }


            if (languageToggle) {

                languageToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }


            /* UPDATE LANGUAGE BUTTON */

            const languageText =
                languageToggle
                    ? languageToggle.querySelector(
                        "span"
                    )
                    : null;


            if (languageText) {

                languageText.textContent =
                    language.toUpperCase();
            }

        }
    );

});


    /* =========================================================
       14 — PAGE READY
       ========================================================= */

    requestAnimationFrame(function () {

        document.body.classList.add(
            "page-ready"
        );
    });

});
// =========================================================
// GOOGLE TRANSLATE — KEEP TOP BAR HIDDEN
// =========================================================

function hideGoogleTranslateBar() {

    const banner =
        document.querySelector(
            ".goog-te-banner-frame"
        );

    if (banner) {
        banner.style.display = "none";
    }

    document.documentElement.style.top =
        "0px";

    document.body.style.top =
        "0px";
}


/* RUN AFTER PAGE LOAD */

window.addEventListener(
    "load",
    function () {

        hideGoogleTranslateBar();

        setTimeout(
            hideGoogleTranslateBar,
            500
        );

        setTimeout(
            hideGoogleTranslateBar,
            1500
        );

    }
);


/* WATCH FOR GOOGLE TRANSLATE INJECTION */

const googleTranslateObserver =
    new MutationObserver(
        function () {

            hideGoogleTranslateBar();

        }
    );


if (document.body) {

    googleTranslateObserver.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );
}