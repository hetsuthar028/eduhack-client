import React, {useState, useEffect} from 'react';
import imageSlider from './imageSlider';
import Slidercontent from './SliderContent';
import './carousel.css';
import Arrows from './Arrows';
import Dots from './Dots';

let len;

const Carousel = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const {defaultSliders, sliders} = props;

    if(defaultSliders){
        len = imageSlider.length - 1;
    } else {
        len = sliders.length - 1;
        // console.log("Len", sliders.length)
    }

    useEffect(() => {    
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => prevIndex === len ? 0 : prevIndex + 1)
            // console.log("Active Index", activeIndex)
        }, 5000);
        return () => {
            clearInterval(interval)
        }
    }, [activeIndex]);

    return (
        <div className="slider-container">
            {
                defaultSliders && (
                    <>
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
                    </>
                )
            }
            {
                !defaultSliders && (
                    <>
                        <Slidercontent activeIndex={activeIndex} imageSlider={sliders} />
                        <Arrows
                            prevSlide={() => setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)} 
                            nextSlide={() => setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)} 
                        />
                        <Dots 
                            activeIndex={activeIndex} 
                            imageSlider={sliders} 
                            onclick={activeIndex => setActiveIndex(activeIndex)} 
                        />
                    </>
                )
            }
            
        </div>
    );
}

export default Carousel;
