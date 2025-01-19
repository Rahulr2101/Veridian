import React, { createContext, useContext, useState } from 'react';

const initialData = {
    used: '',
    reason: '',
    when: '',
    why: '',
};

const DataContext = createContext({
    formData: initialData,
    setFormData: (data: any) => {},
});

export const DataProvider = ({ children }) => {
    const [formData, setFormData] = useState(initialData);

    return (
        <DataContext.Provider value={{ formData, setFormData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
