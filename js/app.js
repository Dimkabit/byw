(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const activeLink = document.querySelectorAll(".menu__link");
    const deactive = () => {
        activeLink.forEach((btn => btn.classList.remove("active-link")));
    };
    activeLink.forEach(((btn, i) => {
        btn.addEventListener("click", (() => {
            if (!btn.classList.contains("active-link")) {
                deactive();
                btn.classList.add("active-link");
            }
        }));
    }));
    let script_select = document.querySelector(".select");
    let deploy_btn = document.getElementById("deploy-btn");
    let options_list = document.querySelector(".options-list");
    let value_wrap = document.querySelector(".value-wrap");
    let options = document.querySelectorAll(".option");
    document.getElementById("country");
    for (let option of options) option.onclick = selectOption;
    deploy_btn.onclick = function() {
        if (deploy_btn.getAttribute("data-state") == "rolled") {
            options_list.style.display = "flex";
            options_list.style.opacity = 1;
            deploy_btn.setAttribute("data-state", "deployed");
            deploy_btn.style.rotate = "180deg";
        } else {
            options_list.style.opacity = 0;
            options_list.style.display = "none";
            deploy_btn.setAttribute("data-state", "rolled");
            deploy_btn.style.rotate = "360deg";
        }
    };
    function selectOption() {
        let current = options_list.querySelector(".current");
        current.classList.remove("current");
        this.classList.add("current");
        deploy_btn.setAttribute("data-state", "rolled");
        options_list.style.opacity = 0;
        options_list.style.display = "none";
        deploy_btn.style.rotate = "360deg";
        let country = this.querySelector("span").innerHTML;
        let flag = this.querySelector("img").src;
        let event = new CustomEvent("optionSelected", {
            detail: {
                country,
                flag
            }
        });
        script_select.dispatchEvent(event);
    }
    script_select.addEventListener("optionSelected", setNewCurentOpton);
    function setNewCurentOpton(event) {
        value_wrap.querySelector("img").src = event.detail.flag;
        value_wrap.querySelector("span").innerHTML = event.detail.country;
        country.value = event.detail.country;
    }
    new Swiper(".image-block-slider-block__slider", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 20,
        autoHeight: true,
        speed: 800,
        loop: true,
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1268: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        on: {}
    });
    window["FLS"] = true;
    isWebp();
    menuInit();
})();