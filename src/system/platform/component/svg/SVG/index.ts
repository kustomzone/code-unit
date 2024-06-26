import { Element_ } from '../../../../../Class/Element'
import { System } from '../../../../../system'
import { Dict } from '../../../../../types/Dict'
import { ID_SVG } from '../../../../_ids'

export interface I {
  style: object
  attr: Dict<string>
  viewBox: string
}

export interface O {}

export default class SVGSVG extends Element_<I, O> {
  constructor(system: System) {
    super(
      {
        i: ['style', 'attr', 'viewBox'],
        o: [],
      },
      {},
      system,
      ID_SVG
    )

    this._defaultState = {}
  }
}
