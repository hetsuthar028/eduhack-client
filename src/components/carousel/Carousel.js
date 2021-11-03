import React, {useState, useEffect} from 'react';
import imageSlider from './imageSlider';
import Slidercontent from './SliderContent';
import './carousel.css';
import Arrows from './Arrows';
import Dots from './Dots';

const len = imageSlider.length - 1;

const Carousel = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
        }, 5000);
        return () => {
            clearInterval(interval)
        }
    }, [activeIndex]);

    return (
        <div className="slider-container">
            <Slidercontent activeIndex={activeIndex} imageSlider={imageSlider} />
            <Arrows
                prevSlide={() => setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)} 
                nextSlide={() => setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)} 
            />
            <Dots 
                activeIndex={activeIndex} 
                imageSlider={imageSlider} 
                onclick={activeIndex => setActiveIndex(activeIndex)} 
            />
        </div>
    );
}

export default Carousel;
