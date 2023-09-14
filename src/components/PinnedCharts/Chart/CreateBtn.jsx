import React from "react";

function CreateBtn({ toggleChartControl }) {
    return (
        <div className="create-chart">
            <button
                className="create-chart__btn"
                onClick={toggleChartControl(true)}>
                Click to create new insight
            </button>
            <i className="create-chart__icon"></i>
        </div>
    );
}

export default CreateBtn;
