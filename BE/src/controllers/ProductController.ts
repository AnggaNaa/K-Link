import { Request, Response } from "express";
import ProductServices from "../services/ProductServices";

class ProductsController {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ProductServices.find(req.query, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ini erorr", error);
      return res
        .status(500)
        .json({ error: "Error while getting find product controller" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const loginSession = res.locals.loginSession;

      const response = await ProductServices.findOne(id, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ini erorr baris 27", error);
      return res
        .status(500)
        .json({ error: "Error while getting findOne product controller" });
    }
  }

  create(req: Request, res: Response) {
    ProductServices.create(req, res);
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const loginSession = res.locals.loginSession;

      const response = await ProductServices.delete(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({
        error: "Error delete card",
      });
    }
  }

  // update(req: Request, res: Response) {
  //   ProductServices.update(req, res);
  // }
}

export default new ProductsController();
