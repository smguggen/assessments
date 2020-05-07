declare namespace Types {
  
  type Options = string[];
  
  interface QuestionProps {
      index:ReactText,
      type: string,
      options:Options,
      displayText:string,
      value?:string | number | null,
  }
  
  export interface Question extends QuestionProps {
      incorrect_answers?: Options,
      correct_answer: string,
      question:string,
  }

  export interface Results {
      correct:number
      incorrect:number,
      answered:number,
      score:number,
  }

  export interface InputProps { 
      type:string,
      name:string,
      questionText:string,
      placeholder?:string,
      options:Options,
      onChange: (event:any) => void
  }

  export interface QuestionState extends QuestionProps {
      correct_answer:'',
      counter: number,
      isFinished:boolean,
      correct:number
      incorrect:number,
      answered:number,
      score: number,
      quizLength:number
  }
}
