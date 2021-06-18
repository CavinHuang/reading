import mongoose from '../utils/mongose'
import { IArticle } from 'src/types/article'
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: String,
  number: Number,
  url: String,
  body: String
})

const ArticleModel = mongoose.model('article', articleSchema)

class Article {
  save (article: IArticle): Promise<mongoose.Document<string, unknown>> {
    const model = new ArticleModel(article)

    return new Promise((resolve, reject) => {
      model.save((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res)
      })
    })
  }

  findByTitle (title: string): Promise<IArticle> {
    return new Promise((resolve, reject) => {
      ArticleModel.find({
        title: {
          $regex: title
        }
      }, (error, doc: IArticle) => {
        if (error) {
          reject(error)
        }
        resolve(doc)
      })
    })
  }

  findByTitleOrBody (title: string, body: string): Promise<IArticle> {
    return new Promise((resolve, reject) => {
      ArticleModel.findOne({
        $or: [
          {
            title: {
              $regex: title
            }
          },
          {
            body: {
              $regex: body
            }
          }
        ]
      }, (error, doc: IArticle) => {
        if (error) {
          reject(error)
        }
        resolve(doc)
      })
    })
  }
}

export default new Article