declare interface Self {
    "platform": String
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
    "type": MessageType
    "data": TextMessage | MentionMessage | MentionAllMessage | FileMessage | LocationMessage | ReplyMessage
}

declare interface TextMessage extends Message {
    "text": String
}

declare interface MentionMessage extends Message {
    "user_id": String
}

declare interface MentionAllMessage extends Message {
}

declare interface FileMessage extends Message {
    "file_id": String
}

declare interface LocationMessage extends Message {
    "latitude": Number
    "longitude": Number
    "title": String
    "content": String
}

declare interface ReplyMessage extends Message {
    "message_id": String
    "user_id": String
}

declare enum EventType {
    meta,
    message,
    notice,
    request
}

declare interface Event {
    "id": String
    "self": Self
    "time": Number
    "type": EventType,
    "detail_type": String,
    "sub_type": String,
}

declare interface Request {
    "action": String
    "params": Object
    "echo": String
}

declare interface Response {
    "status": String
    "retcode": Number
    "data": Object
    "message": String
    "echo": String
}

declare interface MetaHeartbeatEvent extends Event {
    "interval": Number
}

declare interface MessageEvent extends Event {
    "message_id": String,
    "message": Message[],
    "alt_message": String,
    "user_id": String
}