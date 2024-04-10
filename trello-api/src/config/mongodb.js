//mNh0PzvwBHanqcGv
import { MongoClient, ServerApiVersion } from 'mongodb'
const MONGO_URI =
  'mongodb+srv://root:mNh0PzvwBHanqcGv@pomodoroappcluster.gvfxm7y.mongodb.net/?retryWrites=true&w=majority&appName=PomodoroAppCluster'
const DATABASE_NAME = 'PomodoroApp'

// Khởi tạo đối tượng instance cho database
let myPomodoroDatabaseInstacne = null

// Khởi tạo một đối tượng instance để kết nối đến mongodb
const mongoClientInstance = new MongoClient(MONGO_URI, {
  // với serverApiVersion từ v5 trở lên thì không cần dùng nó,
  //còn nếu dùng thì sẽ chỉ định một stable API version cuả mongodb
  ServerApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const CONNECT_DB = async () => {
  try {
    // Gọi kết nối đến MongoDB Atlas với URI đã khai báo ở trên
    await mongoClientInstance.connect()
    // Chọn database cụ thể để sử dụng
    myPomodoroDatabaseInstacne = mongoClientInstance.db(DATABASE_NAME)
  } catch (err) {
    console.log(err)
  }
}

// Đóng kết nối đến database
export const ClOSE_DB = async () => {
  try {
    await mongoClientInstance.close()
  } catch (err) {
    console.log(err)
  }
}

// Hàm này sẽ trả về đối tượng instance của database sau khi đã kết nối để sử dụng nhiều nơi khác nhau
// Phải đảm báo chỉ luôn gọi GET_DB sau khi đã kết nối thành công
export const GET_DB = () => {
  if (!myPomodoroDatabaseInstacne) {
    throw new Error('You must connect to the database first before using it')
  }
  return myPomodoroDatabaseInstacne
}
