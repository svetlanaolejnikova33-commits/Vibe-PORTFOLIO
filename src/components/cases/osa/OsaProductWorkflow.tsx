import { OsaProductState } from './OsaProductState'
import { osaAssets } from './osaAssets'

const STATES = [
  {
    step: '02',
    chapter: 'Product state · 01',
    title: 'Designer workspace',
    lead: 'Interior input, prompt history, project memory, and analysis entry — one project environment.',
    src: osaAssets.product.designerWorkspace,
    alt: 'OSA designer workspace with interior upload, prompt history, project memory, Generate and Analyze controls, and project context sidebar',
    caption: 'The render is not the final output. It becomes the input layer.',
    priority: true,
  },
  {
    step: '03',
    chapter: 'Product state · 02',
    title: 'Semantic analysis',
    lead: 'Zones, objects, materials, palette, and style DNA extracted as structured project intelligence.',
    src: osaAssets.product.semanticAnalysis,
    alt: 'OSA semantic analysis screen with detected zones, objects, materials, palette, material classes, and style DNA',
    caption: 'OSA reads the image as structured project intelligence.',
  },
  {
    step: '04',
    chapter: 'Product state · 03',
    title: 'Live registry + supplier graph',
    lead: 'Suppliers, SKUs, categories, availability, and alternatives attached to detected interior objects.',
    src: osaAssets.product.registryGraph,
    alt: 'OSA registry view with interior objects linked to supplier cards, SKUs, categories, availability, and alternatives',
    caption: 'Suppliers enter the project while decisions are still open.',
  },
  {
    step: '05',
    chapter: 'Product state · 04',
    title: 'Procurement + budget logic',
    lead: 'Base, premium, and budget paths with cost estimates, specification readiness, and availability warnings.',
    src: osaAssets.product.procurement,
    alt: 'OSA procurement screen with base, premium, and budget options, estimated costs, specification readiness, and availability warnings',
    caption: 'Procurement becomes part of design, not a separate afterthought.',
  },
  {
    step: '06',
    chapter: 'Product state · 05',
    title: 'Industry output',
    lead: 'Specification table, selected suppliers, SKU list, BIM export status, and project handoff.',
    src: osaAssets.product.industryOutput,
    alt: 'OSA industry output with specification table, suppliers, SKU list, BIM export status, and project handoff',
    caption: 'Design intelligence becomes executable industry data.',
  },
] as const

export function OsaProductWorkflow() {
  return (
    <>
      {STATES.map((state) => (
        <OsaProductState key={state.step} {...state} />
      ))}
    </>
  )
}
