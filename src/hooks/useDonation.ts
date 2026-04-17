import { useState, useCallback } from 'react';
import { useProjectStore } from '../store/projectStore';
import { useUserStore } from '../store/userStore';
import type { Backer } from '../types/project';

interface DonationState {
  amount: number;
  name: string;
  message: string;
  isAnonymous: boolean;
  isSubmitting: boolean;
  isComplete: boolean;
}

export function useDonation(projectId: string) {
  const addBacker = useProjectStore((s) => s.addBacker);
  const addDonation = useUserStore((s) => s.addDonation);
  const user = useUserStore((s) => s.user);

  const [state, setState] = useState<DonationState>({
    amount: 5,
    name: user.displayName,
    message: '',
    isAnonymous: false,
    isSubmitting: false,
    isComplete: false,
  });

  const setAmount = useCallback((amount: number) => {
    setState((s) => ({ ...s, amount: Math.max(1, amount) }));
  }, []);

  const setName = useCallback((name: string) => {
    setState((s) => ({ ...s, name }));
  }, []);

  const setMessage = useCallback((message: string) => {
    setState((s) => ({ ...s, message }));
  }, []);

  const setAnonymous = useCallback((isAnonymous: boolean) => {
    setState((s) => ({ ...s, isAnonymous }));
  }, []);

  const submitDonation = useCallback(async () => {
    setState((s) => ({ ...s, isSubmitting: true }));

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const backer: Backer = {
      id: `bk-${Date.now()}`,
      name: state.isAnonymous ? 'A Neighbor' : state.name,
      amount: state.amount,
      message: state.message,
      date: new Date().toISOString().split('T')[0],
      isAnonymous: state.isAnonymous,
    };

    addBacker(projectId, backer);
    addDonation(projectId, state.amount);

    setState((s) => ({ ...s, isSubmitting: false, isComplete: true }));

    // Reset after 3 seconds
    setTimeout(() => {
      setState({
        amount: 5,
        name: user.displayName,
        message: '',
        isAnonymous: false,
        isSubmitting: false,
        isComplete: false,
      });
    }, 3000);
  }, [state, projectId, addBacker, addDonation, user.displayName]);

  return {
    ...state,
    setAmount,
    setName,
    setMessage,
    setAnonymous,
    submitDonation,
  };
}
