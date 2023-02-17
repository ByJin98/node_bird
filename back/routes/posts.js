const express = require('express');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10, // 1 ~ 10
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
