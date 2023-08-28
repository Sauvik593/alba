import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNews } from "../../store/news"
import { Article } from "./components/Article"
import { Wrapper } from "./styled"

export const News: React.FC = () => {
  const dispatch = useDispatch()
  const articles = []

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      dispatch(getNews(e.currentTarget.value))
    }
  }

  return (
    <>
      <input placeholder="Search news Criteria" onKeyPress={handleKeyPress} />
      <Wrapper>
        {articles.map((article) => (
          <Article key={article.url} article={article} />
        ))}
      </Wrapper>
    </>
  )
}
