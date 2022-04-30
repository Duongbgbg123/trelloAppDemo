// import Joi from 'joi';

// const boardCollectionName = 'boards';
// const boardCollectionSchema = Joi.object({
//   title: Joi.string().required.min(3).max(20),
//   columnOrder: Joi.array().items(Joi.string()).default([]),
//   createAt: Joi.date().timestamp().default(Date.now()),
//   updateAt: Joi.date().timestamp().default(null),
//   _destroy: Joi.boolean().default(false),
// });

// const validateSchema = async (data) => {
//   return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
// };
