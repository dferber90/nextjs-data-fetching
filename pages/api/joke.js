// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { random } from "@mikemcbride/dad-jokes";

export default (req, res) => {
  res.status(200).json({ text: random() });
};
