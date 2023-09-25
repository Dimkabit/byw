//scroll reveal animation
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 400,
   //reset: true //Animation repeat
})
sr.reveal(`.text-block__title, .home__social, .contact-block, .footer-container`);
sr.reveal(`.text-block__text, .image-block-slider, .four-block-big, .footer`, {origin: 'bottom'});
sr.reveal(`.four-block-smoll`, {origin: 'bottom', delay: 600 });
sr.reveal(`.services__card, .projects__card`, {interval: 100});
sr.reveal(`.image-block__image, .image-block-content-section, .spikes-footer`, {opacity: 0});
