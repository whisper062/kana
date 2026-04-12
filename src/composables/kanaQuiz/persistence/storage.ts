import {
    STATS_STORAGE_KEY,
    THEME_STORAGE_KEY,
} from '../core/constants';
import type { PersistedStats, ThemeMode } from '../core/types';
import { createDefaultStats } from '../shared/utils';

export function loadStoredTheme(): ThemeMode | null {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
}

export function saveStoredTheme(theme: ThemeMode) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function loadStoredStats(): PersistedStats {
    const rawStats = localStorage.getItem(STATS_STORAGE_KEY);

    if (!rawStats) {
        return createDefaultStats();
    }

    try {
        const parsed = JSON.parse(rawStats) as PersistedStats;

        return {
            hits: parsed.hits || 0,
            miss: parsed.miss || 0,
            perKana: parsed.perKana || {},
        };
    } catch {
        return createDefaultStats();
    }
}

export function saveStoredStats(stats: PersistedStats) {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
}
