import s from "./Options.module.css";
import { useTransition, animated } from "react-spring";



export default function Options ({answersValidate, q , show}){

    const transition = useTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay: 300,
    })

    return(
        <>
        {
           transition((style,item) =>
            item ? <animated.button style={style} className={s.answer} onClick={answersValidate} dangerouslySetInnerHTML={{ __html: q }} value={q}  /> : ""
           )
        }
        </>
    )
}