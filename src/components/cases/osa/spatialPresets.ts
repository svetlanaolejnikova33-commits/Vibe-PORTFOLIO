import type { CSSProperties } from 'react'

export type SpatialMode = 'input' | 'read' | 'mutate' | 'procure' | 'handoff' | 'execution'

export type SpatialRegion = {
  id: string
  kind:
    | 'ingest'
    | 'zone'
    | 'focus'
    | 'cluster'
    | 'material'
    | 'sku'
    | 'ripple'
    | 'lock'
    | 'link'
    | 'marker'
    | 'scan-frame'
  label?: string
  style: CSSProperties
}

export const SPATIAL_PRESETS: Record<SpatialMode, readonly SpatialRegion[]> = {
  input: [
    {
      id: 'ingest',
      kind: 'ingest',
      label: 'Scene ingest',
      style: { inset: '4%', borderRadius: '2px' },
    },
    {
      id: 'scan-frame',
      kind: 'scan-frame',
      style: { inset: '6%' },
    },
  ],
  read: [
    {
      id: 'dine',
      kind: 'zone',
      label: 'Dining',
      style: { top: '38%', left: '8%', width: '44%', height: '42%' },
    },
    {
      id: 'kitchen',
      kind: 'zone',
      label: 'Kitchen',
      style: { top: '32%', right: '6%', width: '38%', height: '48%' },
    },
    {
      id: 'cluster-chairs',
      kind: 'cluster',
      label: 'Object cluster',
      style: { bottom: '14%', left: '16%', width: '28%', height: '26%' },
    },
    {
      id: 'cluster-table',
      kind: 'cluster',
      label: 'Table group',
      style: { bottom: '28%', left: '32%', width: '22%', height: '18%' },
    },
    {
      id: 'material-floor',
      kind: 'material',
      label: 'Stone · floor',
      style: { bottom: '4%', left: '10%', width: '55%', height: '12%' },
    },
    {
      id: 'material-counter',
      kind: 'material',
      label: 'Marble · counter',
      style: { top: '48%', right: '8%', width: '32%', height: '10%' },
    },
  ],
  mutate: [
    {
      id: 'chair',
      kind: 'focus',
      label: 'Chair · edit',
      style: { bottom: '18%', left: '22%', width: '18%', height: '20%' },
    },
    {
      id: 'ripple-a',
      kind: 'ripple',
      style: { bottom: '12%', left: '16%', width: '32%', height: '32%' },
    },
    {
      id: 'ripple-b',
      kind: 'ripple',
      style: { bottom: '20%', left: '28%', width: '38%', height: '38%' },
    },
    {
      id: 'dep-table',
      kind: 'link',
      label: 'Dependency',
      style: { bottom: '30%', left: '34%', width: '20%', height: '16%' },
    },
  ],
  procure: [
    {
      id: 'sku-chair',
      kind: 'sku',
      label: 'DC-8841',
      style: { bottom: '18%', left: '22%', width: '18%', height: '20%' },
    },
    {
      id: 'sku-table',
      kind: 'sku',
      label: 'TB-1202',
      style: { bottom: '30%', left: '34%', width: '22%', height: '14%' },
    },
    {
      id: 'sku-floor',
      kind: 'sku',
      label: 'FL-2201',
      style: { bottom: '4%', left: '12%', width: '48%', height: '14%' },
    },
    {
      id: 'supplier-zone',
      kind: 'zone',
      label: 'Supplier graph',
      style: { top: '30%', right: '5%', width: '36%', height: '52%' },
    },
  ],
  handoff: [
    {
      id: 'lock',
      kind: 'lock',
      label: 'Execution lock',
      style: { inset: '5%' },
    },
    {
      id: 'spec-ready',
      kind: 'zone',
      label: 'Spec ready',
      style: { inset: '8%' },
    },
  ],
  execution: [
    {
      id: 'marker-chair',
      kind: 'marker',
      label: '01',
      style: { bottom: '20%', left: '24%', width: '14%', height: '16%' },
    },
    {
      id: 'marker-table',
      kind: 'marker',
      label: '02',
      style: { bottom: '32%', left: '36%', width: '18%', height: '12%' },
    },
    {
      id: 'marker-light',
      kind: 'marker',
      label: '03',
      style: { top: '18%', right: '28%', width: '10%', height: '14%' },
    },
    {
      id: 'exec-lock',
      kind: 'lock',
      style: { inset: '4%' },
    },
  ],
}
