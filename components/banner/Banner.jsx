import React from 'react'
import PropTypes from 'prop-types';

export default function Banner({title}) {
    return (
        <div className="hsbc-banner">
            {title}
        </div>
    )
}

Banner.propTypes = {
    title: PropTypes.string
}