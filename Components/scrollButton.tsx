import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the button when scrolling down, otherwise hide it
            if (window.innerWidth >= 800) {
                setIsVisible(window.scrollY > 100);
            } else {
                // For mobile devices, always set isVisible to false
                setIsVisible(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Remove the listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 bg-blue-500/70 text-white py-2 px-4 rounded-full transition-all ${
                isVisible ? 'opacity-60' : 'opacity-0'
            }`}
            style={{background: "#5BBBEC", width: "auto", height: "auto"}}
        >

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>

        </button>
);
};

export default ScrollToTopButton;
