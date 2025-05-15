'use strict';

// Animation configuration
const ANIMATION_CONFIG = {
    duration: {
        bounce: 500,
        return: 250
    },
    delay: {
        linkedin: 250,
        github: 500,
        itch: 750
    },
    offset: {
        linkedin: { top: 10, left: -10 },
        github: { top: 10, left: -6 },
        itch: { top: 10, left: -3 }
    }
};

// Utility functions
const getPosition = (selector) => $(selector).position();
const animateIcon = (icon, startPos, offset, duration) => {
    $(icon).animate({
        top: startPos.top + offset.top,
        left: startPos.left + offset.left
    }, duration);
};

const returnIcon = (icon, startPos, duration) => {
    $(icon).animate({
        top: startPos.top,
        left: startPos.left
    }, duration);
};

// Initialize icons
const initializeIcons = () => {
    $('i').hide();
    
    $(window).on('load', () => {
        const positions = {
            github: getPosition('#github'),
            linkedin: getPosition('#linkedin'),
            itch: getPosition('#itch'),
            img: getPosition('.me')
        };

        // Position all icons initially
        $('i').css({
            position: 'absolute',
            zIndex: '1',
            top: positions.img.top + 100,
            left: '47%'
        });

        // Animate LinkedIn
        setTimeout(() => {
            animateIcon('#linkedin', positions.linkedin, ANIMATION_CONFIG.offset.linkedin, ANIMATION_CONFIG.duration.bounce);
        }, ANIMATION_CONFIG.delay.linkedin);

        // Animate LinkedIn return and GitHub
        setTimeout(() => {
            returnIcon('#linkedin', positions.linkedin, ANIMATION_CONFIG.duration.return);
            animateIcon('#github', positions.github, ANIMATION_CONFIG.offset.github, ANIMATION_CONFIG.duration.bounce);
        }, ANIMATION_CONFIG.delay.github);

        // Animate GitHub return and Itch
        setTimeout(() => {
            returnIcon('#github', positions.github, ANIMATION_CONFIG.duration.return);
            animateIcon('#itch', positions.itch, ANIMATION_CONFIG.offset.itch, ANIMATION_CONFIG.duration.bounce);
        }, ANIMATION_CONFIG.delay.itch);

        // Animate Itch return
        setTimeout(() => {
            returnIcon('#itch', positions.itch, ANIMATION_CONFIG.duration.return);
        }, ANIMATION_CONFIG.delay.itch + ANIMATION_CONFIG.delay.linkedin);

        $('i').show();
    });
};

// Initialize when document is ready
$(document).ready(initializeIcons);
