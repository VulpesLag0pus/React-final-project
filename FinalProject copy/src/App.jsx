import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContext, UserProvider } from './components/UserContext'
import Header from './components/Header'
import Question from './components/Question'
import UserForm from './components/UserForm'
import Results from './components/Results'


function App() {
  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite animal?",
      options: ["extremophiles", "Sphyrnidae", "Canis lupus", "Falco"],
    },
    {
      question: "What is you favorite food?",
      options: ["Curry", "fish soup", "salad", "Pigeon clamart"]
    },
  ];
  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "extremophiles": "Fire",
    "Sphyrnidae": "Water",
    "Canis lupus": "Earth",
    "Falco": "Air",
    "Curry": "Fire",
    "fish soup": "Water",
    "salad": "Earth",
    "Pigeon clamart": "Air",
  };
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  let [answers, setAnswers] = useState([])
  let [userName, setUserName] = useState('')
  let [element, setElement] = useState('')
  let [artwork, setArtwork] = useState(null)
  
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };
  async function fetchArtwork (){
    try {
      const response = await fetch(`http://placekitten.com/g/200/300`, {
        mode: 'no-cors'
      })
      console.log(response)
      if(response.ok === false){
        throw new Error("Failed to fetch :(")
      }
      const artwork = await response.json()
      console.log(artwork)
    } catch (error) {
      console.log(error.message)
    }
    return (artwork)
  }


  useEffect(function () {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork();
      console.log('runs');
    }
  }, [currentQuestionIndex, questions.length, answers, determineElement, fetchArtwork]);

  return (<UserProvider>
    <Header></Header>
    <Routes>
      <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
      <Route
        path="/quiz"
        element={
        currentQuestionIndex < questions.length ? (
          <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
        ) : (
        <Results element={element} artwork={artwork} />
        )
      }
      />
  </Routes>
  </UserProvider>)
}
export default App
