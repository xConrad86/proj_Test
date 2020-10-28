import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ProductLink = ({ history, to, product, staticContext, onClick, tag: Tag, ...rest }) => (
    <Tag
        {...rest}
        onClick={(event) => {
            onClick(event);
            console.log("product link:", product)
            history.push(to, {product : product })
        }}
    />
);

ProductLink.propTypes = {
    to: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    onClick: PropTypes.func,
    product: PropTypes.object.isRequired

};
ProductLink.defaultProps = {
    onClick: () => {}
};
export default withRouter(ProductLink);