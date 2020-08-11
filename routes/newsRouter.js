const router = require("express").Router();
const newsController = require("../controllers/newsController");

router.route("/")
    .get(newsController.everything)
    .post(newsController.addNews);

router.route('/:id')
    .delete(newsController.deleteNews)
    .put(newsController.updateNews)
    .get(newsController.getSpecificNews)

module.exports = router;