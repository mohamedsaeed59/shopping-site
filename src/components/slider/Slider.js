import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {sliderData} from "./slider-data";
import { useEffect, useState } from "react";
import "./Slider.scss";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sideLength = sliderData.length;
    // setinterval
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        if(currentSlide == sideLength - 1){
            setCurrentSlide(0);
        }else{
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if(currentSlide == 0){
            setCurrentSlide(sideLength - 1);
        }else{
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        if(autoScroll){
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime);
            };
            auto();
        };
        return () => clearInterval(slideInterval);
    },[currentSlide, slideInterval, autoScroll]);

  return (
    <div className='slider'>
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
        {sliderData.map((item, index) => {
            const {image, heading, desc} = item;
            return(
             <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                {index === currentSlide && (
                  <>
                    <img src={image} alt="image" />
                    <div className="content">
                        <h2>{heading}</h2>
                        <p>{desc}</p>
                        <hr />
                        <a href="#product" className="--btn --btn-primary">Shop Now</a>
                    </div>
                  </>
                )}
             </div>
            )
        })}
    </div>
  )
}

export default Slider;