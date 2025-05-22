import React, { createContext, useContext, useEffect, useState } from 'react';

const TipsContext = createContext();

export const useTips = () => useContext(TipsContext);

export const TipsProvider = ({ children }) => {
  const [tips, setTips] = useState([]);

  const fetchTips = async () => {
    const res = await fetch('http://localhost:5000/tips');
    const data = await res.json();
    setTips(data);
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const likeTip = async (id) => {
    await fetch(`http://localhost:5000/tips/${id}/like`, {
      method: 'PATCH',
    });
    setTips((prev) =>
      prev.map((tip) =>
        tip._id === id ? { ...tip, totalLiked: tip.totalLiked + 1 } : tip
      )
    );
  };

  return (
    <TipsContext.Provider value={{ tips, likeTip }}>
      {children}
    </TipsContext.Provider>
  );
};
