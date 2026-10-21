import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Moment, MomentCategory } from '../types/moment';
import { momentService, MomentFilter } from '../services/momentService';
import { useChild } from './ChildContext';

interface MomentContextValue {
  moments: Moment[];
  loading: boolean;
  filter: MomentFilter;
  setFilter: (updates: Partial<MomentFilter>) => void;
  addMoment: (
    moment: Omit<Moment, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Moment>;
  updateMoment: (id: string, updates: Partial<Moment>) => Promise<Moment>;
  deleteMoment: (id: string) => Promise<void>;

  isQuickLogOpen: boolean;
  openQuickLog: (preselectCategory?: MomentCategory) => void;
  closeQuickLog: () => void;
  preselectedCategory?: MomentCategory;

  feedbackMessage: string | null;
  showFeedback: (msg: string) => void;

  resetDemoData: () => Promise<void>;
  refreshMoments: () => Promise<void>;
}

const MomentContext = createContext<MomentContextValue | undefined>(undefined);

export const MomentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { activeChildId } = useChild();

  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilterState] = useState<MomentFilter>({
    category: 'all',
    searchQuery: '',
  });

  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] =
    useState<MomentCategory | undefined>(undefined);

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedbackMessage(msg);

    setTimeout(() => {
      setFeedbackMessage((current) =>
        current === msg ? null : current
      );
    }, 3200);
  }, []);

  const loadMoments = useCallback(async () => {
    try {
      setLoading(true);

      const data = await momentService.getMoments({
        childId: activeChildId || undefined,
        category: filter.category,
        searchQuery: filter.searchQuery,
        tag: filter.tag,
      });

      setMoments(data);
    } finally {
      setLoading(false);
    }
  }, [activeChildId, filter]);

  useEffect(() => {
    loadMoments();
  }, [loadMoments]);

  const setFilter = (updates: Partial<MomentFilter>) => {
    setFilterState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const addMoment = async (
    momentData: Omit<Moment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Moment> => {
    const created = await momentService.createMoment({
      ...momentData,
      childId: momentData.childId || activeChildId,
    });

    setMoments((prev) => [created, ...prev]);

    showFeedback(`Saved moment: "${created.title}"`);

    return created;
  };

  const updateMoment = async (
    id: string,
    updates: Partial<Moment>
  ): Promise<Moment> => {
    const updated = await momentService.updateMoment(id, updates);

    setMoments((prev) =>
      prev.map((moment) =>
        moment.id === id ? updated : moment
      )
    );

    showFeedback(`Updated moment: "${updated.title}"`);

    return updated;
  };

  const deleteMoment = async (id: string): Promise<void> => {
    await momentService.deleteMoment(id);

    setMoments((prev) =>
      prev.filter((moment) => moment.id !== id)
    );

    showFeedback('Moment removed');
  };

  const openQuickLog = (category?: MomentCategory) => {
    setPreselectedCategory(category);
    setIsQuickLogOpen(true);
  };

  const closeQuickLog = () => {
    setIsQuickLogOpen(false);
    setPreselectedCategory(undefined);
  };

  const resetDemoData = async () => {
    await momentService.resetToSeedData();
    await loadMoments();
    showFeedback('Reset to sample journal entries');
  };

  return (
    <MomentContext.Provider
      value={{
        moments,
        loading,
        filter,
        setFilter,
        addMoment,
        updateMoment,
        deleteMoment,
        isQuickLogOpen,
        openQuickLog,
        closeQuickLog,
        preselectedCategory,
        feedbackMessage,
        showFeedback,
        resetDemoData,
        refreshMoments: loadMoments,
      }}
    >
      {children}
    </MomentContext.Provider>
  );
};

export const useMoments = (): MomentContextValue => {
  const context = useContext(MomentContext);

  if (!context) {
    throw new Error(
      'useMoments must be used within a MomentProvider'
    );
  }

  return context;
};
