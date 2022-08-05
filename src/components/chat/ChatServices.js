import {
  ref,
  set,
  get,
  getDatabase,
  query,
  onValue,
  off,
  limitToLast,
  orderByChild,
} from "firebase/database";
import app from "../firebase";

const database = getDatabase(app);

// Lấy tổng số tin nhắn trong numOfMessages
const getCountMessages = async () => {
  const myQuery = query(ref(database, "numOfMessages"));
  const value = await get(myQuery);
  return value.val();
};
// tăng số tin nhắn trong 1 phòng chat lên 1
const increaseTotalMess = async (room_id) => {
  const myQuery = ref(database, `rooms/${room_id}/totalMess`);
  const value = await get(myQuery);
  await set(myQuery, value.val() + 1);
};

// lưu tin nhắn xuống bảng messages/room_id
const chat = async (sender, room_id, message) => {
  let count = await getCountMessages();
  const path = `messages/room${room_id}/message${count}`.trim();
  const refToSend = ref(database, path);
  try {
    await set(query(refToSend), {
      message_id: count,
      room_id: room_id,
      sender: sender,
      message: message,
      sent_datetime: new Date().getTime(),
    });
    await set(ref(database, "numOfMessages"), ++count);
    increaseTotalMess(room_id);
    return true;
  } catch {
    return false;
  }
};

// Lấy tất cả tin nhắn của 1 phòng chat
const getMessages = async (room_id) => {
  const path = `messages/room${room_id}`.trim();
  const myQuery = query(ref(database, path), orderByChild("sent_datetime"));
  // lấy giá trị từ database
  const messages = [];
  return await get(myQuery).then((data) => {
    data.forEach((message) => {
      messages.push({ ...message.val() });
    });
    return messages;
  });
};

// Lấy tin nhắn cuối cùng dc gửi tới phòng chat
const getLastMessages = async (room_id) => {
  const path = `messages/room${room_id}`.trim();
  const myQuery = query(
    ref(database, path),
    orderByChild("sent_datetime"),
    limitToLast(1)
  );
  return await get(myQuery).then((message) => {
    if (message.val() !== null) {
      return message.val()[Object.keys(message.val())[0]];
    }
    return null;
  });
};

// lắng nghe số lượng tin nhắn trong phòng chat thay đổi
const onMessagesChange = (room_id, callback) => {
  const path = `rooms/${room_id}/totalMess`.trim();
  const refToRoom = ref(database, path);
  onValue(refToRoom, () => {
    callback();
  });
};

// gở lắng nghe
const offMessagesChange = (room_id) => {
  const path = `messages/room${room_id}`.trim();
  const myQuery = query(ref(database, path));
  off(myQuery, "child_added");
};



export {
  getCountMessages,
  getMessages,
  chat,
  onMessagesChange,
  offMessagesChange,
  getLastMessages,
};
