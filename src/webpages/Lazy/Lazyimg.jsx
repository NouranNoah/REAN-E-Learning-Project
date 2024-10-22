import PropTypes from "prop-types";

const LazyImage = ({ src, alt }) => {
    return (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    );
};
LazyImage.propTypes = {
    src: PropTypes.string.isRequired, 
    alt: PropTypes.string.isRequired, 
};


export default LazyImage;
