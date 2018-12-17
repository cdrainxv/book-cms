import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import {
  categories,
  CREATEBOOK,
  MYBOOKS,
  Button,
  FullWidthForm,
  H3,
  Input,
  LargeButton,
  LabelContainer,
  LargeLabel,
  LargeInputWrapper,
  NumberInput,
  SmallInputWrapper,
  SmallLabel,
  Select
} from '../constants'

const BooksForm = () => {
  const [bookTitle, setTitle] = useState('')
  const [bookAuthor, setAuthor] = useState('')
  const [bookCategory, setCategory] = useState('Novel')
  const [bookPages, setPages] = useState(1)
  const [bookCurrentPage, setCurrentPage] = useState(1)
  const [bookChapters, setChapters] = useState(1)
  const [bookCurrentChapter, setCurrentChapter] = useState(1)

  const handleTitle = e => {
    setTitle(e.target.value)
  }

  const handleAuthor = e => {
    setAuthor(e.target.value)
  }

  const handleCategory = e => {
    setCategory(e.target.value)
  }

  const handlePages = e => {
    setPages(e.target.value)
  }

  const handleCurrentPage = e => {
    setCurrentPage(e.target.value)
  }

  const handleChapters = e => {
    setChapters(e.target.value)
  }

  const handleCurrentChapter = e => {
    setCurrentChapter(e.target.value)
  }

  const updateCache = (cache, { data: { createBook } }) => {
    const {
      myBooks: { edges, pageInfo }
    } = cache.readQuery({
      query: MYBOOKS,
      variables: { input: { limit: 5 } }
    })

    cache.writeQuery({
      query: MYBOOKS,
      variables: { input: { limit: 5 } },
      data: {
        myBooks: {
          __typename: 'BookConnection',
          edges: [Object.assign(createBook, { __typename: 'Book' }), ...edges],
          pageInfo
        }
      }
    })
  }

  return (
    <div>
      <H3>ADD NEW BOOK</H3>
      <Mutation mutation={CREATEBOOK} update={updateCache}>
        {(createBook, { data }) => (
          <FullWidthForm
            onSubmit={async e => {
              e.preventDefault()
              await createBook({
                variables: {
                  input: {
                    title: bookTitle,
                    author: bookAuthor,
                    category: bookCategory,
                    currentPage: parseInt(bookCurrentPage, 10),
                    pages: parseInt(bookPages, 10),
                    currentChapter: parseInt(bookCurrentChapter, 10),
                    chapters: parseInt(bookChapters, 10)
                  }
                }
              })

              setTitle('')
              setAuthor('')
              setCategory('Novel')
              setCurrentPage(1)
              setPages(1)
              setCurrentChapter(1)
              setChapters(1)
            }}
          >
            <LargeInputWrapper>
              <LabelContainer>
                <SmallLabel>Title</SmallLabel>
                <Input
                  value={bookTitle}
                  onChange={handleTitle}
                  placeholder="title"
                />
              </LabelContainer>

              <LabelContainer>
                <SmallLabel>Author</SmallLabel>
                <Input
                  value={bookAuthor}
                  onChange={handleAuthor}
                  placeholder="author"
                />
              </LabelContainer>

              <LabelContainer>
                <SmallLabel>Category</SmallLabel>
                <Select
                  name="category"
                  onChange={handleCategory}
                  value={bookCategory}
                >
                  {categories.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </Select>
              </LabelContainer>
            </LargeInputWrapper>

            <SmallInputWrapper>
              <LabelContainer>
                <LargeLabel>Current Page</LargeLabel>
                <NumberInput
                  min="1"
                  type="number"
                  value={bookCurrentPage}
                  onChange={handleCurrentPage}
                />
              </LabelContainer>

              <LabelContainer>
                <LargeLabel>Num of Pages</LargeLabel>
                <NumberInput
                  min="1"
                  type="number"
                  value={bookPages}
                  onChange={handlePages}
                />
              </LabelContainer>

              <LabelContainer>
                <LargeLabel>Current Chapter</LargeLabel>
                <NumberInput
                  min="1"
                  type="number"
                  value={bookCurrentChapter}
                  onChange={handleCurrentChapter}
                />
              </LabelContainer>

              <LabelContainer>
                <LargeLabel>Num of Chapters</LargeLabel>
                <NumberInput
                  min="1"
                  type="number"
                  value={bookChapters}
                  onChange={handleChapters}
                />
              </LabelContainer>
              <LargeButton type="submit">Submit</LargeButton>
            </SmallInputWrapper>
          </FullWidthForm>
        )}
      </Mutation>
    </div>
  )
}

export default BooksForm
