import React from 'react';
import {Carousel} from "react-bootstrap";
import {PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts";


const CarouselBlock = () => {
    const h=500
    return (
        <Carousel>
            <Carousel.Item>
                <a href={PRODUCT_ROUTE+'/15'}>
                    <img
                    height={h}
                    className="d-block w-100"

                    src={process.env.REACT_APP_API_URL + 'scale_1200.webp'}
                   // src="https://ulibky.ru/wp-content/uploads/2020/01/kadry_iz_multfilma_tachki_24_17153423.jpg"
                    alt="First slide"
                    />
                </a>

            </Carousel.Item>
            <Carousel.Item>

                <a href={PRODUCT_ROUTE+'/17'}>
                    <img
                        height={h}
                        className="d-block w-100"
                        src={process.env.REACT_APP_API_URL + 'banner_15991136025f5089828b81b.jpg'}
                        //src="https://i.playground.ru/p/nYvS-WazViQmTz4i0vEiuA.jpeg"
                        //src="https://c.tenor.com/1UvPEeQ9WaMAAAAC/sweaty-speedrunner-epic-gamer.gif"
                        alt="Second slide"
                    />
                </a>
                <Carousel.Caption>
                    <h3>GeForce RTX™ 3090 GAMING X TRIO 24G</h3>
                    <p>Искусство играть бесшумно</p>
                </Carousel.Caption>

            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselBlock;