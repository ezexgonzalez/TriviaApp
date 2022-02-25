import { useTransition, animated } from "react-spring";
import s from "./Alert.module.css";

export default function Alert({show, correct}){


    const transition = useTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay: 50,
      })

    return (
        <>
            {
            correct ? 
            transition((style, item) =>
              item ? <animated.span style={style} className={s.correct}>Correct answer!</animated.span> : ""
            ) : 
            transition((style, item) =>
              item ? <animated.span style={style} className={s.wrong}>Wrong answer!</animated.span> : ""
            )

            }
        </>
    )


}