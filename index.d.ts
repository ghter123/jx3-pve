declare interface Event {
    "time": number
    "self_id": number
    "post_type": 'message' | 'notice' | 'request' | 'meta_event'
}

declare interface MessageEvent extends Event {
    "message_id": String,
    "message": Message[],
    "alt_message": String,
    "user_id": String
}

declare enum MessageType {
    text,
    mention,
    mentionAll,
    image,
    voice, // 语音
    audio, // 音频
    video,
    file,
    location,
    reply
}

declare interface Message {
    "post_type": MessageType
    "message_type": 'group' | 'private'
    "data": TextMessage | MentionMessage | MentionAllMessage | FileMessage | LocationMessage | ReplyMessage
}