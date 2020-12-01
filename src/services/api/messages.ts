import {RcFile} from "antd/lib/upload/interface"
import {IMessage} from "types"
import {GET, POST, DELETE} from "../network.service"

const messagesApi = {
  async getMessages(currentDialogId: string): Promise<any> {
    try {
      const res: IMessage[] = await GET(`/messages?dialogId=${currentDialogId}`)
      return res
    } catch (error) {
      return error
    }
  },
  sendMessage: (text: string, dialogId: string, attachments: RcFile[]) => {
    console.log(attachments)

    POST("/messages", {text, dialogId, attachments})
  },
  removeMessage: (messageId: string) => DELETE(`/messages/${messageId}`),
}

export default messagesApi
