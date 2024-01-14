export type APIResponse<T> = {
    data: T
}

export type PaginatedAPIRespose<T> = APIResponse<T> & {
    meta: {
        total: number;
        page: number;
        limit: number
    }
}

export type Agent = {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
}

export type FactionSymbol = 'COSMIC' | 'VOID' | 'GALACTIC' | 'QUANTUM' | 'DOMINIUM' | 'ASTRO' | 'CORSAIRS' | 'OBSIDIAN' | 'AEGIS' | 'UNITED' | 'SOLITARY' | 'COBALT' | 'OMEGA' | 'ECHO' | 'LORDS' | 'CULT' | 'ANCIENTS' | 'SHADOW' | 'ETHEREAL';

export type Faction = {
    symbol: FactionSymbol
    name: string;
    description: string;
    headquarters: string;
    isRecruiting: boolean;
    traits: string[];
}
