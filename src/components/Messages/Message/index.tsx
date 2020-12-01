import React from "react"
import classNames from "classnames"
import {messagesApi} from "services/api"

import {Time, IconCkecked, MessageAudio, Button} from "components"
import {Popover, Modal} from "antd"
import {EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons"

import {isAudio} from "utils/helpers"

import {IAttachment, IMessage} from "types"

import "./Message.scss"

const renderAttachment = (item: IAttachment) => {
  if (item.ext !== "webm") {
    return (
      <div key={item._id} className="message__attachments-item">
        <img src={item.url} alt={item.fileName} />
      </div>
    )
  } else {
    return <MessageAudio key={item._id} audioSrc={item.url} />
  }
}

const showConfirm = (_id: string) => {
  Modal.confirm({
    title: "Are you sure you want to delete this message?",
    icon: <ExclamationCircleOutlined />,
    maskClosable: true,
    zIndex: 1031,
    onOk() {
      messagesApi.removeMessage(_id)
    },
  })
}
// interface MessageProps extends IMessage {

// }

const Message = ({
  user,
  _id,
  text,
  createdAt,
  isChecked,
  attachments,
  isMe,
}: IMessage) => {
  return (
    <div
      className={classNames(
        "message",
        {"message--is-me": isMe},
        // {"message--is-typing": isTyping},
        {
          "message--image":
            attachments &&
            !isAudio(attachments) &&
            attachments.length === 1 &&
            !text,
        },
        {"message--audio": attachments && isAudio(attachments)}
      )}
    >
      {/* <div className="message__avatar">
        <Avatar user={user} />
      </div> */}
      <div className="message__content">
        {/* {(text || "isTyping") && ( */}
        {text && (
          <div className="message__bubble">
            {text && (
              <div className="message__text">
                {/* {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                  <Emoji key={i} emoji={match} set="apple" size={16} />
                ))} */}
                {text}
              </div>
            )}
            {/* {isTyping && ( */}
            {false && (
              <div className="message__typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        )}
        {attachments && (
          <div className="message__attachments">
            {attachments.map(item => renderAttachment(item))}
          </div>
        )}
        {isMe && (
          <>
            <div className="message__status">
              <IconCkecked isChecked={isChecked} />
            </div>
            <Popover
              placement="left"
              content={
                <Button type="text" onClick={() => showConfirm(_id)}>
                  Remove message
                </Button>
              }
              trigger="click"
            >
              <div className="message__icon-actions">
                <Button type="text" icon={<EllipsisOutlined />} />
              </div>
            </Popover>
          </>
        )}
      </div>
      {createdAt && (
        <div className="message__date">
          <Time date={createdAt} />
        </div>
      )}
    </div>
  )
}

export default Message
