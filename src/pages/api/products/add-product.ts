// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process?.env?.NEXT_PUBLIC_NOTION_SECRET,
})

const databaseId = process.env.NEXT_PUBLIC_NOTION_PRODUCT

async function addItem(name: string) {
  try {
    if (typeof databaseId === 'string') {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
      })
      // console.log(response)
    }
  } catch (err) {
    console.log(JSON.stringify(err))
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'name is required.' })
  }

  try {
    await addItem(String(name))
    const message = `상품 ${name}이 추가되었습니다.`
    res.status(200).json({ message })
    alert(message)
  } catch (err) {
    return res.status(400).json({ message: '상품 추가에 실패하였습니다.' })
  }
}
