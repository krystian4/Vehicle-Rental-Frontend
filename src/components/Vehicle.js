import React from 'react';

const Vehicle = ({id, brand, url, removeVehicle}) => {
    return(
        <article className='single-vehicle'>
            <img src={url} alt={brand} className='photo-vehicle' />
            <footer>
                <div className='vehicle-info'>
                    <h4>{brand}</h4>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper ullamcorper odio at eleifend. Nulla lobortis congue pharetra. Donec ornare ut tortor vel tincidunt. Aliquam vel fringilla justo. Aliquam et risus eu metus pharetra tristique a in dolor. Nam at posuere nisl, a sodales diam. Donec quis tempus quam. Praesent condimentum eget metus a consectetur. Vestibulum in ipsum quis urna maximus ultrices id ac felis. Nullam aliquam augue tellus, ac efficitur velit mattis nec.
                    </p>
                </div>
            </footer>
        </article>
    );
};

export default Vehicle;