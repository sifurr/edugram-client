import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Banner.css'

function Banner() {
    return (
        <Carousel showArrows={true} showThumbs={false} className="carousel">
            <div className="carousel-item">
                <img src="https://i.ibb.co/qkGx9nD/photo-1504384764586-bb4cdc1707b0-blend-000000-blend-alpha-10-blend-mode-normal-blend-w-1-crop-faces.jpg" alt="..." />
             
               
            </div>
            <div className="carousel-item">                
                <img src="https://i.ibb.co/pJn7rNw/banner2.jpg" alt="..." />
                
            </div>
            <div className="carousel-item">
                
                <img src="https://i.ibb.co/64gKmSb/photo-1573164713988-8665fc963095-blend-000000-blend-alpha-10-blend-mode-normal-blend-w-1-crop-faces.jpg" alt="..." />
               
            </div>
        </Carousel>
    );
}

export default Banner;
