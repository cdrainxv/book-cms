import gql from 'graphql-tag'

const ADDTOFILTERABLECATEGORIES = gql`
  mutation AddToFilterables($cats: [String!]!) {
    addToFilterables(cats: $cats) @client
  }
`

const CREATEBOOK = gql`
  mutation CreateBook($input: createBookInput!) {
    createBook(input: $input) {
      id
      title
      author
      category
      currentPage
      pages
      currentChapter
      chapters
    }
  }
`

const GETCATEGORYFILTER = gql`
  query {
    filter @client {
      category
    }
  }
`

const GETFILTERABLECATEGORIES = gql`
  query {
    filterable @client {
      categories
    }
  }
`

const MYBOOKS = gql`
  query GetMyBooks($input: booksInput!) {
    myBooks(input: $input) {
      edges {
        __typename
        id
        title
        author
        category
        currentPage
        pages
        currentChapter
        chapters
      }

      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const SETCATEGORYFILTER = gql`
  mutation SetCategoryFilter($category: String!) {
    setCategoryFilter(category: $category) @client {
      filter {
        category
      }
    }
  }
`

const SIGNIN = gql`
  mutation SignIn($input: signInInput!) {
    signIn(input: $input) {
      token
    }
  }
`

const SIGNUP = gql`
  mutation SignUp($input: signUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`

export {
  ADDTOFILTERABLECATEGORIES,
  CREATEBOOK,
  GETCATEGORYFILTER,
  GETFILTERABLECATEGORIES,
  MYBOOKS,
  SETCATEGORYFILTER,
  SIGNIN,
  SIGNUP
}
