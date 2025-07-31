import { VariantFeature } from '../services/VariantService';
import { SimpleFeatureSerialized } from '../services/types';
import { Selection } from 'd3';
export default class IsoformAndVariantTrack {
    private trackData;
    private variantData;
    private viewer;
    private width;
    private variantFilter;
    private isoformFilter;
    private initialHighlight?;
    private height;
    private transcriptTypes;
    private variantTypes;
    private binRatio;
    private showVariantLabel;
    constructor({ viewer, height, width, transcriptTypes, variantTypes, showVariantLabel, variantFilter, binRatio, isoformFilter, initialHighlight, trackData, variantData, }: {
        viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>;
        height: number;
        width: number;
        transcriptTypes: string[];
        variantTypes: string[];
        showVariantLabel?: boolean;
        variantFilter: string[];
        binRatio: number;
        isoformFilter: string[];
        initialHighlight?: string[];
        trackData?: SimpleFeatureSerialized[];
        variantData?: VariantFeature[];
    });
    DrawTrack(): number;
    filterVariantData(variantData: VariantFeature[], variantFilter: string[]): VariantFeature[];
    renderTooltipDescription(tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, undefined>, descriptionHtml: string, closeFunction: () => void): void;
    setInitialHighlight(selectedAlleles: string[], svgTarget: Selection<SVGGElement, unknown, null, undefined>): void;
}
