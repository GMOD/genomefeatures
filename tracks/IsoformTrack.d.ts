import { SimpleFeatureSerialized } from '../services/types';
import { Region } from '../types';
import { Selection } from 'd3';
export default class IsoformTrack {
    private static readonly MAX_ROWS;
    private static readonly EXON_HEIGHT;
    private static readonly CDS_HEIGHT;
    private static readonly ISOFORM_HEIGHT;
    private static readonly ISOFORM_TITLE_HEIGHT;
    private static readonly UTR_HEIGHT;
    private static readonly TRANSCRIPT_BACKBONE_HEIGHT;
    private static readonly ARROW_HEIGHT;
    private static readonly ARROW_WIDTH;
    private trackData;
    private viewer;
    private width;
    private height;
    private transcriptTypes;
    private htpVariant?;
    private region;
    private genome;
    constructor({ viewer, height, width, transcriptTypes, htpVariant, trackData, region, genome, }: {
        viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>;
        height: number;
        width: number;
        transcriptTypes: string[];
        htpVariant?: string;
        trackData?: SimpleFeatureSerialized[];
        region: Region;
        genome: string;
    });
    DrawTrack(): number;
}
