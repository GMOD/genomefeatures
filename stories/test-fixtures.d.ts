export declare const mockNCListData: {
    features: {
        id: string;
        type: string;
        start: number;
        end: number;
        name: string;
        strand: number;
        children: {
            id: string;
            type: string;
            start: number;
            end: number;
            name: string;
            strand: number;
            children: {
                id: string;
                type: string;
                start: number;
                end: number;
                strand: number;
            }[];
        }[];
    }[];
};
export declare const mockVariantData: {
    start: number;
    end: number;
    type: string;
    id: string;
    name: string;
    consequence: string;
    impact: string;
}[];
