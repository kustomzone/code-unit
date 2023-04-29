import { Graph } from '../../Class/Graph'
import { stringifyGraphSpecData } from '../../spec/stringifySpec'
import { BundleSpec } from '../../types/BundleSpec'
import { G_EE } from '../../types/interface/G'
import { Moment } from '../Moment'

export interface GraphInjectGraphMomentData {
  bundle: BundleSpec
  path: string[]
}

export interface GraphInjectGraphMoment
  extends Moment<GraphInjectGraphMomentData> {}

export function watchGraphInjectEvent(
  event: 'inject_graph',
  graph: Graph,
  callback: (moment: GraphInjectGraphMoment) => void
): () => void {
  const listener = (...[bundle, path]: G_EE['inject_graph']) => {
    const { spec } = bundle

    stringifyGraphSpecData(spec)

    callback({
      type: 'graph',
      event,
      data: {
        bundle,
        path,
      },
    })
  }

  graph.prependListener(event, listener)

  return () => {
    graph.removeListener(event, listener)
  }
}
