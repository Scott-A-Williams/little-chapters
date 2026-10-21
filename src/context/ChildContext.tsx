import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Child } from '../types/child';
import { childService } from '../services/childService';

interface ChildContextValue {
  children: Child[];
  activeChild: Child | null;
  activeChildId: string;
  setActiveChildId: (id: string) => void;
  addChild: (
    childData: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Child>;
  updateChild: (id: string, updates: Partial<Child>) => Promise<Child>;
  loading: boolean;
  refreshChildren: () => Promise<void>;
}

const ChildContext = createContext<ChildContextValue | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({
  children: reactChildren,
}) => {
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [activeChildId, setActiveChildIdState] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const kids = await childService.getChildren();
      setChildrenList(kids);

      const activeId = await childService.getActiveChildId();

      if (activeId && kids.some((child) => child.id === activeId)) {
        setActiveChildIdState(activeId);
      } else if (kids.length > 0) {
        const firstChildId = kids[0].id;
        setActiveChildIdState(firstChildId);
        await childService.setActiveChildId(firstChildId);
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

  const addChild = async (
    childData: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Child> => {
    const now = new Date().toISOString();

    const newChild: Child = {
      ...childData,
      id: `child_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: now,
      updatedAt: now,
    };

    const saved = await childService.saveChild(newChild);

    setChildrenList((prev) => [...prev, saved]);
    await setActiveChildId(saved.id);

    return saved;
  };

  const updateChild = async (
    id: string,
    updates: Partial<Child>
  ): Promise<Child> => {
    const existing = childrenList.find((child) => child.id === id);

    if (!existing) {
      throw new Error(`Child ${id} not found`);
    }

    const updated: Child = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await childService.saveChild(updated);

    setChildrenList((prev) =>
      prev.map((child) => (child.id === id ? updated : child))
    );

    return updated;
  };

  const activeChild =
    childrenList.find((child) => child.id === activeChildId) ||
    childrenList[0] ||
    null;

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
