"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import { DormBuilding } from "../../lib/DormBuilding";
import { TranslateResponse } from "../../dorms/TranslateResponse";
import { DormRoomTypes } from "../../lib/DormRoomTypes";

export default function Home() {

  //scrollable list of questions, multiple choice (select ONE) for 1-4, number field with minimum value requirement for 5
  //submit button at bottom

  //question 1: What year will you be entering
    //Freshman, Sophomore, Junior/Senior/Co-op
  //question 2: How do you feel about sharing a bedroom with other people?
    //I would like to share a bedroom with as few people as possible
    //I don't mind sharing a bedroom/would like to share a bedroom with friends
  //question 3: How do you feel about sharing a bathroom with other people?
    //I would like to share a bathroom with as few people as possible
    //I don't mind sharing a bathroom
  //question 4: Do you require/would you prefer gender inclusive housing?
    //Yes, no
  //Question 5: What is you maximum budget for housing for the full year ahead in dollars?
    //number field with minimum bound

  //all fields must have an answer selected to submit with submit button
  //clicking submit button collects all answers provided,
  //queries db for all dorms, filters based on answers, 
  //takes user to another page that displays filtered dorm list

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        RPI Dorm View - Quiz
      </h1>
    </main>
  )
}