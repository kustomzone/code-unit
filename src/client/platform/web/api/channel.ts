import { NOOP } from '../../../../NOOP'
import { API } from '../../../../system'
import { Callback } from '../../../../types/Callback'
import { IChannel, IChannelOpt } from '../../../../types/global/IChannel'
import { Unlisten } from '../../../../types/Unlisten'

export function webChannel(window: Window, prefix: string): API['channel'] {
  const LocalChannel = (opt: IChannelOpt): IChannel => {
    return {
      close(): void {},
      postMessage(message: any): void {},
      addListener(event: string, callback: Callback): Unlisten {
        return NOOP
      },
    }
  }

  const channel = {
    tab: LocalChannel,
    session: LocalChannel,
    local: LocalChannel,
  }

  return channel
}
