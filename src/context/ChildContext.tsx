import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Child } from '../types/child';
import { childService } from '../services/childService';

interface ChildContextValue {
  children: Child[];
  activeChild: Child | null;
  activeChildId: string;
  setActiveChildId: (id: string) => void;
  addChild: (childData: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Child>;
  updateChild: (id: string, updates: Partial<Child>) => Promise<Child>;
  loading: boolean;
  refreshChildren: () => Promise<void>;
}

const ChildContext = createContext<ChildContextValue | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children: reactChildren }) => {
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [activeChildId, setActiveChildIdState] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const kids = await childService.getChildren();
      setChildrenList(kids);

      const activeId = await childService.getActiveChildId();
      if (activeId && kids.some((k) => k.id === activeId)) {
        setActiveChildIdState(activeId);
      } else if (kids.length > 0) {
        setActiveChildIdState(kids[0].id);
        await childService.setActiveChildId(kids[0].id);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setActiveChildId = async (id: string) => {
    setActiveChildIdState(id);
    await childService.setActiveChildId(id);
  };

  const addChild = async (childData: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>): Promise<Child> => {
    const newChild: Child = {
      ...childData,
      id: `child_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const saved = await childService.saveChild(newChild);
    setChildrenList((prev) => [...prev, saved]);
    setActiveChildId(saved.id);
    return saved;
  };

  const updateChild = async (id: string, updates: Partial<Child>): Promise<Child> => {
    const existing = childrenList.find((c) => c.id === id);
    if (!existing) throw new Error(`Child ${id} not found`);
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await childService.saveChild(updated);
    setChildrenList((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0] || null;

  return (
    <ChildContext.Provider
      value={{
        children: childrenList,
        activeChild,
        activeChildId,
        setActiveChildId,
        addChild,
        updateChild,
        loading,
        refreshChildren: loadData,
      }}
    >
      {reactChildren}
    </ChildContext.Provider>
  );
};

export const useChild = (): ChildContextValue => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};
