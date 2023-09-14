import React, { createContext, useContext, useState } from "react";

const PinnedChartsContext = createContext();

export const PinnedChartsProvider = ({ children }) => {
    const [pinnedChart, setPinnedChart] = useState({
        previewData: "pending",
    });

    return (
        <PinnedChartsContext.Provider value={{ pinnedChart, setPinnedChart }}>
            {children}
        </PinnedChartsContext.Provider>
    );
};

export const usePinnedChartsContext = () => {
    return useContext(PinnedChartsContext);
};
