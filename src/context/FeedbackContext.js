import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading ] = useState(true)
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch('http://localhost:5100/feedback?_sort=id&order=desc')
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()

    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    setFeedback(feedback.filter(item => item.id !== id))
  }

  const updateFeedback = (id, updItem) => {
    console.log(id, updItem)
    setFeedback(feedback.map(item => (item.id === id ?
      { ...item, ...updItem } :
      item))
    )
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    isLoading,
    addFeedback,
    deleteFeedback,
    editFeedback,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext