import CustomEditor from '@components/Editor'
import styled from '@emotion/styled'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Carousel from 'nuka-carousel'
import { useEffect, useState } from 'react'
import { EditorState } from 'react-draft-wysiwyg'
import { convertFromRaw, convertToRaw } from 'draft-js'
import axios from 'axios'
import { api } from '@apis/api'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

export default function ProductEdit() {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const { id: productId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  )

  useEffect(() => {
    if (productId) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.description) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.description))
              )
            )
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [])

  const handleSave = async () => {
    if (editorState) {
      await api.post(`products/update-product`, {
        id: Number(productId),
        description: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        ),
      })
      alert('수정이 완료되었습니다.')
    }
  }

  return (
    <>
      <Head>
        <meta property="og:url" content="사이트 주소" />
        <meta property="og:type" content="product" />
        {/* <meta property="og:type" content="website" /> */}
        <meta property="og:title" content="3만원 무슨상품" />
        <meta name="description" content="사이트 설명" />
        <meta name="keyword" content="사이트 키워드" />
        <meta property="og:description" content="사이트 설명" />
        <meta property="og:image" content="썸네일주소" />
      </Head>
      <Carousel
        autoplay
        speed={10}
        slideIndex={index}
        wrapAround
        withoutControls
        slidesToShow={3}
        animation="zoom"
      >
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.original}
            alt="image"
            width={1000}
            height={600}
          />
        ))}
      </Carousel>
      <div>
        {images.map((img, idx) => (
          <div key={idx} className="display:flex" onClick={() => setIndex(idx)}>
            <Image src={img.original} alt="image" width={100} height={60} />
          </div>
        ))}
      </div>
      {editorState && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  )
}
