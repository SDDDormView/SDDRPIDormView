"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import { DormBuilding } from "../../lib/DormBuilding";
import { TranslateResponse } from "../dorms/TranslateResponse";
import { DormRoomTypes } from "../../lib/DormRoomTypes";
import { createClient } from "../utils/supabase/client";
import { Quiz, Question, MultChoiceQuestion, BudgetQuestion } from "../../lib/Quiz";

export default function Home() {

  //scrollable list of questions, multiple choice (select ONE) for 1-4, number field with minimum value requirement for 5
  //submit button at bottom

  //question 1: What year will you be entering
    //Freshman, Sophomore, Junior/Senior/Co-op
  const q1 = new MultChoiceQuestion("What year will you be entering?", ["Freshman", "Sophomore", "Junior/Senior/Co-op"], 'years');
  //question 2: How do you feel about sharing a bedroom with other people?
    //I would like to share a bedroom with as few people as possible
    //I don't mind sharing a bedroom/would like to share a bedroom with friends
  const q2 = new MultChoiceQuestion("How do you feel about sharing a bedroom with other people?", ["I would like to share a bedroom with as few people as possible", "I don't mind sharing a bedroom/would like to share a bedroom with friends"], "room types");
  //question 3: How do you feel about sharing a bathroom with other people?
    //I would like to share a bathroom with as few people as possible
    //I don't mind sharing a bathroom
  const q3 = new MultChoiceQuestion("How do you feel about sharing a bathroom with other people?", ["I would like to share a bathroom with as few people as possible", "I don't mind sharing a bathroom"], "building_styles");
  //question 4: Do you require/would you prefer gender inclusive housing?
    //Yes, no
  const q4 = new MultChoiceQuestion("Do you require/would you prefer gender inclusive housing?", ["Yes", "No"], "gender_inclusive");
  //Question 5: What is you maximum budget for housing for the full year ahead in dollars?
    //number field with minimum bound
  const q5 = new BudgetQuestion("What is you maximum budget for housing for the full year ahead in dollars?", 8520);

  //all fields must have a valid answer selected to submit with submit button
  //clicking submit button collects all answers provided,
  //queries db for all dorms, filters based on answers, 
  //takes user to another page that displays filtered dorm list

  const questions = [q1, q2, q3, q4, q5];

  // 2. State to track answers
  const [answers, setAnswers] = useState({
    q0: "", q1: "", q2: "", q3: "", q4: ""
  });

  // 3. Update state handler
  const handleUpdate = (index: number, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [`q${index}`]: value }));
  };

  // 4. Validation: Check if all questions are answered
  // q4 (Budget) must be >= 8520
  const isFormValid = 
    questions.slice(0, 4).every((_, i) => answers[`q${i}`] !== "") && 
    Number(answers.q4) >= 8520;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Quiz Results Submitted:", answers);
      alert("Survey submitted! Check the console for data.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-8 border-b pb-4">
          RPI Dorm View - Quiz
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-12 custom-scrollbar">
            {questions.map((q, index) => {
              const info = q.get_UI_info();

              return (
                <div key={index} className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {index + 1}. {info.text}
                  </h2>

                  {/* Render Multiple Choice */}
                  {info.options ? (
                    <div className="flex flex-col gap-2">
                      {info.options.map((option) => (
                        <label 
                          key={option} 
                          className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                            answers[`q${index}`] === option ? "bg-red-50 border-red-500" : "hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={answers[`q${index}`] === option}
                            onChange={() => handleUpdate(index, option)}
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    /* Render Budget/Number Field */
                    <div className="flex flex-col gap-2">
                      <input
                        type="number"
                        min={q.min_value || 8520}
                        placeholder={`Min: $${q.min_value || 8520}`}
                        value={answers[`q${index}`]}
                        onChange={(e) => handleUpdate(index, e.target.value)}
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <p className="text-sm text-gray-500">
                        Minimum requirement: ${q.min_value || 8520}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
              isFormValid 
                ? "bg-red-600 hover:bg-red-700 shadow-lg" 
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Submit Preferences
          </button>
        </form>
      </div>
    </main>
  );
}