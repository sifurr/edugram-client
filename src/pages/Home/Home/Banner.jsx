import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Banner.css'

function Banner() {
    return (
        <Carousel showArrows={true} showThumbs={false} className="carousel">
            <div className="carousel-item">
                <img src="https://i.ibb.co/NZzWc1Z/banner3.jpg" alt="..." />
               
            </div>
            <div className="carousel-item">
                <img src="https://i.ibb.co/pJn7rNw/banner2.jpg" alt="..." />
                
            </div>
            <div className="carousel-item">
                <img src="https://i.ibb.co/gJqcq40/banner1.jpg" alt="..." />
               
            </div>
        </Carousel>
    );
}

export default Banner;
