import { Express } from 'express';
import { IRouter } from '../models';
import { UrlController } from '../controllers/url-controller';

export class UrlRouter implements IRouter {
    constructor(private urlController: UrlController) {
    }

    configureRoutes(app: Express): void {
        app.post('/api/url/shorten', async (req, res) => {
            try {
                const resp = await this.urlController.postUrl(req.body.url);
                res.json(resp);
            }
            catch (error) {
                res.status(500).send(`Error encountered. Please try again later.`);
            }
        });

        app.get("/api/url/:id", async (req, res) => {
            const id = req.params.id;
            try {
                const url = await this.urlController.getLongUrl(id);
                if (url) {
                    res.json(url);
                } else {
                    res.status(404).send(`original url not found`);
                }
            }
            catch (error) {
                res.status(500).send(`Error encountered. Please try again later.`)
            }
        });
    }
}
