export type Question ={  
    questionText: string;
    description?: string;
    type: "picker" | "yesno" | "gender" | "radio"| null;
    options: { label: string; value: number }[];
  }