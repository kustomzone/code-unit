import { Functional } from '../../../../../Class/Functional'
import { Done } from '../../../../../Class/Functional/Done'
import { System } from '../../../../../system'
import { MS } from '../../../../../types/interface/MS'
import { stopMediaStream } from '../../../../../util/stream/stopMediaStream'
import { wrapMediaStream } from '../../../../../wrap/MediaStream'
import { ID_USER_MEDIA } from '../../../../_ids'

export type I = {
  opt: MediaStreamConstraints
}

export type O = {
  stream: MS
}

export default class UserMedia extends Functional<I, O> {
  private _stream: MediaStream

  constructor(system: System) {
    super(
      {
        i: ['opt'],
        o: ['stream'],
      },
      {
        output: {
          stream: {
            ref: true,
          },
        },
      },
      system,
      ID_USER_MEDIA
    )

    this.addListener('destroy', () => {
      if (this._stream) {
        stopMediaStream(this._stream)

        this._stream = undefined
      }
    })
  }

  async f({ opt }: I, done: Done<O>): Promise<void> {
    const {
      api: {
        media: { getUserMedia },
      },
    } = this.__system

    let stream: MS

    try {
      const _stream = await getUserMedia(opt)

      this._stream = _stream

      stream = wrapMediaStream(_stream, this.__system)
    } catch (err) {
      done(undefined, err.message)

      return
    }

    done({ stream })
  }
}
