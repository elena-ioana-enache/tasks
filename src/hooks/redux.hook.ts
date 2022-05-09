import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../state/store';
import { AppDispatch } from '../state/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
