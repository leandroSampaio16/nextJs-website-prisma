import React, { useState } from 'react';

const VideoModal = ({ onClose }: { onClose: any }) => {
    const [isVisible, setIsVisible] = useState(true);

    const closeVideoModal = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isVisible ? 'visible' : 'invisible'
                } video-modal-overlay`}
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={(e) => {
                if ((e.target as Element).classList.contains('video-modal-overlay')) {
                    closeVideoModal();
                }
            }}
        >
            <div className="relative w-3/4 h-3/4">
                <button
                    className="absolute top-4 right-4 text-white cursor-pointer"
                    onClick={closeVideoModal}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/WUWteJU0C_4?si=BZCXWfLrEhjC94XB"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoModal;
