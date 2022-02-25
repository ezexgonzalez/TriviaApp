import s from "./Game.module.css";
import { useState, useEffect } from "react";
import { getQuestions } from "../ApiConnect/connect";
import Alert from "./Alert/Alert";
import Options from "./Options/Options";
import Loading from "../Loading/Loading";


export default function Game() {

  const [game, setGameState] = useState({
    questions: [],
    num: 0,
    answers: [],
    showReply: true,
    reply: false,
    correct: ""
  });
  const [timer, setTimer] = useState({
    time: 20,
    stop: false
  });

  useEffect(() => {
    if (game.questions.length === 0) {
      getQuestions(setGameState);
    } else {
      let answers = game.questions[game.num].incorrect_answers.concat(game.questions[game.num].correct_answer)
      setGameState(data => {
        return {
          ...data,
          answers: answers.sort(() => { return Math.random() - 0.5 }),
          showReply: true
        }
      })
    }

  }, [game.questions, game.num])

  useEffect(() => {
   
    if (!timer.stop && timer.time > 0) {
      let timerId = setInterval(() => {
        setTimer(data => {
          return { ...data, time: timer.time - 1 }
        })
      }, 1000);
      return () => clearInterval(timerId);
    }

  });



  function nextQuestion() {
    if (game.num < game.questions.length - 1) {
      setGameState(data => {
        return {
          ...data,
          num: game.num + 1,
          answers: game.questions[game.num] ? game.questions[game.num].incorrect_answers.concat(game.questions[game.num].correct_answer) : "",
          reply: false,
          showReply: false
        }
      });
      setTimer(data => {
        return {
          ...data,
          time: 20,
          stop: false
        }
      });
    }
  }
  function answersValidate(e) {

    if (!game.reply && timer.time > 0) {
      if (e.target.value === game.questions[game.num].correct_answer) {
        setGameState(data => {
          return {
            ...data,
            correct: true,
            reply: true
          }
        });
        setTimer(data => {
          return {
            ...data,
            stop: true
          }
        });
      } else {
        setGameState(data => {
          return {
            ...data,
            correct: false,
            reply: true
          }
        });
        setTimer(data => {
          return {
            ...data,
            stop: true
          }
        });
      }
    }
  }

  function playAgain() {
    getQuestions(setGameState);
    setGameState(data => {
      return {
        ...data,
        correct: "",
        reply: false,
        num: 0,
        questions: []
      }
    })
    setTimer(data => {
      return {
        ...data,
        time: 20,
        stop: false
      }
    });
  }


  return (
    <section className={s.mainContainer}>
      <div className={s.card}>
        <div className={s.top}>
          <span className={s.current}>
            {`${game.num + 1}/${game.questions.length}`}
          </span>
          <h1 className={s.title}>Quiz Game</h1>
          <span className={s.category}>{game.questions.length > 0 ? game.questions[game.num].category : ""}</span>
        </div>
        {
         game.questions.length > 0 ? <>
            <div className={s.time}>
              {timer.time}
            </div>
            <span className={s.question} dangerouslySetInnerHTML={{ __html: game.questions.length > 0 ? game.questions[game.num].question : "" }} ></span>
            <div className={s.optionsContainer}>
            {
              game.answers.length > 0 ?
                game.answers.map(q => (
                  <Options key={q} answersValidate={answersValidate} q={q} show={game.showReply} />
                )) : ""
            }
            </div>
            <Alert show={game.reply} correct={game.correct} />
            {
              timer.time === 0 ? <span className={s.timeOut}>Time out</span> : ""
            }
            {
              (game.reply || timer.time === 0) && game.num + 1 !== game.questions.length ?
                <button className={s.next} onClick={nextQuestion} type="button">Next</button> : ""
            }
            {
              game.reply && game.num + 1 === game.questions.length ?
                <button className={s.next} onClick={playAgain} type="button">Play again</button> : ""
            }
            
          </> : <Loading/>
        }

      </div>
    </section>
  )


}