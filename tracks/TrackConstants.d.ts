export declare const FEATURE_TYPES: {
    readonly UTR: readonly ["UTR", "five_prime_UTR", "three_prime_UTR"];
    readonly CDS: readonly ["CDS"];
    readonly EXON: readonly ["exon"];
};
export declare const FEATURE_SORT_WEIGHTS: Record<string, number>;
export declare function createSortWeightMap(utrFeats: string[], cdsFeats: string[], exonFeats: string[]): Record<string, number>;
export declare function generateArrowPoints(height: number, width: number): string;
export declare function sortIsoformData<T extends {
    selected?: boolean;
    name: string;
}>(data: T[]): T[];
export declare function getLabelWidth(label: {
    node: () => {
        getBBox: () => {
            width: number;
        };
    } | null;
}, fallbackWidth?: number): number;
export declare function adjustLabelPosition(labelOffset: number, labelWidth: number, viewerWidth: number): number;
