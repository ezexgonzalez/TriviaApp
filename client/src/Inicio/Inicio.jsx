import s from "./Inicio.module.css";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
export default function inicio(){


    return(
        <main className={s.main}>
            <div className={s.card}>
                <h1>Trivia App 👀</h1>
                <img className={s.logo} src={Logo} alt="Logo" />
                <span>¡Welcome!</span>
                <p>¡Fun questions from many categories!</p>
                <Link to="/game">
                    <button className={s.button}>Play Quiz</button>
                </Link>
            </div>

        </main>
    )


}