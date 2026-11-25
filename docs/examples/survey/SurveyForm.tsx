import { useState } from "react"
import {
  ArrayFields,
  FieldsFor,
  FormFor,
  Label,
  Select,
  Submit,
  TextField,
} from "react-rails-form-helpers"

type Question = { key: number; prompt: string; kind: string; choices: number[] }

let nextKey = 100

export default function SurveyBuilder() {
  const [questions, setQuestions] = useState<Question[]>([
    { key: 1, prompt: "Favorite burger?", kind: "single", choices: [1, 2] },
  ])

  const addQuestion = () =>
    setQuestions([
      ...questions,
      { key: nextKey++, prompt: "", kind: "text", choices: [] },
    ])

  const addChoice = (question: Question) =>
    setQuestions(
      questions.map((q) =>
        q === question ? { ...q, choices: [...q.choices, nextKey++] } : q
      )
    )

  return (
    <FormFor url="/surveys" name="survey" csrfToken="token">
      <div className="field">
        <Label htmlFor="title">Title</Label>
        <TextField name="title" defaultValue="Lunch survey" />
      </div>

      <ArrayFields name="questions" nested>
        {questions.map((question, q) => (
          <FieldsFor name={q} key={question.key}>
            <fieldset>
              <legend>Question {q + 1}</legend>
              <div className="row">
                <TextField
                  name="prompt"
                  defaultValue={question.prompt}
                  placeholder="Prompt"
                />
                <Select name="kind" defaultValue={question.kind}>
                  <option value="text">Free text</option>
                  <option value="single">Pick one</option>
                </Select>
              </div>

              <ArrayFields name="choices" nested>
                {question.choices.map((key, c) => (
                  <FieldsFor name={c} key={key}>
                    <div className="row">
                      <TextField
                        name="text"
                        defaultValue={key === 1 ? "Hamburger" : ""}
                        placeholder={`Choice ${c + 1}`}
                      />
                    </div>
                  </FieldsFor>
                ))}
              </ArrayFields>
              <button type="button" onClick={() => addChoice(question)}>
                Add a choice
              </button>
            </fieldset>
          </FieldsFor>
        ))}
      </ArrayFields>

      <div className="row">
        <button type="button" onClick={addQuestion}>
          Add a question
        </button>
        <Submit value="Create survey" />
      </div>
    </FormFor>
  )
}
