// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { random } from "@mikemcbride/dad-jokes";

export const getJoke = () => {
  return { text: random() };
};

export default (req, res) => {
  res.status(200).json(getJoke());
};
