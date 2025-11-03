/**
 * Mock data fixtures for snapshot tests.
 * Provides realistic data structures to enable actual D3 rendering in tests.
 */

export const mockNCListData = {
  features: [
    {
      id: 'gene1',
      type: 'gene',
      start: 100,
      end: 5000,
      name: 'TEST-GENE-1',
      strand: 1,
      children: [
        {
          id: 'transcript1',
          type: 'mRNA',
          start: 100,
          end: 5000,
          name: 'TEST-GENE-1-RA',
          strand: 1,
          children: [
            {
              id: 'exon1',
              type: 'exon',
              start: 100,
              end: 500,
              strand: 1,
            },
            {
              id: 'exon2',
              type: 'exon',
              start: 1000,
              end: 1500,
              strand: 1,
            },
            {
              id: 'exon3',
              type: 'exon',
              start: 4000,
              end: 5000,
              strand: 1,
            },
          ],
        },
        {
          id: 'transcript2',
          type: 'mRNA',
          start: 100,
          end: 4500,
          name: 'TEST-GENE-1-RB',
          strand: 1,
          children: [
            {
              id: 'exon4',
              type: 'exon',
              start: 100,
              end: 500,
              strand: 1,
            },
            {
              id: 'exon5',
              type: 'exon',
              start: 1000,
              end: 1500,
              strand: 1,
            },
            {
              id: 'exon6',
              type: 'exon',
              start: 4000,
              end: 4500,
              strand: 1,
            },
          ],
        },
      ],
    },
  ],
}

export const mockVariantData = [
  {
    start: 1200,
    end: 1200,
    type: 'SNV',
    id: 'variant1',
    name: 'TEST-VARIANT-1',
    consequence: 'missense_variant',
    impact: 'MODERATE',
  },
  {
    start: 4200,
    end: 4200,
    type: 'SNV',
    id: 'variant2',
    name: 'TEST-VARIANT-2',
    consequence: 'synonymous_variant',
    impact: 'LOW',
  },
]
