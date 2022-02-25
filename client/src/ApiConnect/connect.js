import axios from "axios";



export async function getQuestions (setState){

    const response = await axios.get("https://opentdb.com/api.php?amount=10")

    if(response){
    setState(data =>{
        return{
            ...data,
            questions: response.data.results
        }
    })
    }

}