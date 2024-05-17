import express, { Express, Request, Response } from "express";
import { Model } from "objection";
import { ArticlesModel, Articles } from "./models/article.model";
import knex from "knex";

const app: Express = express();
const port = 3000;

app.use(express.json());

const knexInstance = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "muhlis",
    password: "muhlis43edan",
    database: "orm_knex",
  },
});

Model.knex(knexInstance);

app.get("/", (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/articles", async (_, res: Response) => {
  const articles = await ArticlesModel.query();
  return res.json(articles);
});

app.get(
  "/articles/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const article = await ArticlesModel.query().findById(req.params.id);
    return res.json(article);
  }
);

app.post(
  "/article",
  async (req: Request<{}, {}, Partial<Articles>>, res: Response) => {
    const newArticle = req.body;
    const article = await ArticlesModel.query().insert(newArticle);

    res.json(article);
  }
);

app.patch(
  "/articles/:id",
  async (
    req: Request<{ id: string }, {}, Partial<Articles>>,
    res: Response
  ) => {
    const newArticle = req.body;
    const articles = await ArticlesModel.query()
      .where({ id: req.params.id })
      .update(newArticle);

    return res.json(articles);
  }
);

app.delete(
  "/articles/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const article = await ArticlesModel.query()
      .where({ id: req.params.id })
      .del();
    return res.json(article);
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
