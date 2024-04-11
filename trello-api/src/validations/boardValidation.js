import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định không cần custom message ở phía BE vì FE sẽ tự validate và hiển thị message
   * BE cần đảm bảo validate dữ liệu chuẩn xác, và trả về message mặc định từ giao diện là được
   * Important: Bắt buộc phải validate dữ liệu ở phía BE vì đây là điểm cuối để lưu dữ liệu vào cơ sở dữ liệu
   * Trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả phía FE và BE
   */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title must not be empty',
      'string.min': 'Title must have at least 3 characters',
      'string.max': 'Title must have at most 50 characters',
      'string.trim': 'Title must not have whitespace at the beginning and end',
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });
  try {
    console.log(req.body);

    // Chỉ định abortEarly: false để trả về trường hợp có nhiều lỗi validation (les52)
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // next();
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'API to create a new board' });
  } catch (error) {
    console.log(new Error(error));
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
