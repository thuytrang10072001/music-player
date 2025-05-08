import React from 'react';
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';

import "./style.css";

const Loading = () => {
    const isLoading = useSelector((state) => state.loading.isLoading);

    return isLoading ? (
        <div className="loading-overlay">
            <ThreeCircles
                height="100"
                width="100"
                color="#3498db"
                ariaLabel="three-circles-rotating"
                visible={true}
            />
        </div>
    ) : null;
};

export default Loading;
