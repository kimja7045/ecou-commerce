// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

async function addItem(name: string) {
  try {
    console.log(name);
  } catch (err) {
    console.error(err);
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'name is required.' });
  }

  try {
    await addItem(String(name));
    const message = `상품 ${name}이 추가되었습니다.`;
    res.status(200).json({ message });
    alert(message);
  } catch (err) {
    return res.status(400).json({ message: '상품 추가에 실패하였습니다.' });
  }
}
