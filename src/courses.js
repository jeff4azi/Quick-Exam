import { edu101Questions } from "./courses/edu-101questions";
import { gns113Questions } from "./courses/gns-113questions";
import { gst111Questions } from "./courses/gst-111questions";
import { csc111Questions } from "./courses/csc-111questions";
import { vos116Questions } from "./courses/vos-116questions";
import { vos117Questions } from "./courses/vos-117questions";
import { cos101Questions } from "./courses/cos-101questions";
import { math101Questions } from "./courses/math-101questions";
import { bed112Questions } from "./courses/bed-112questions";
import { soc105Questions } from "./courses/soc-105questions";
import { csc115Questions } from "./courses/csc-115questions";
import { bed114Questions } from "./courses/bed-114questions";
import { edu101revisionQuestions } from "./courses/edu101revisionQuestions";

const courses = [
  {
    id: "EDU101",
    name: "EDU 101",
    title: "INTRODUCTION TO TEACHING AND FOUNDATION OF EDUCATION",
    group: "general", // general | departmental | vocational
    colleges: "all",
    questions: [...edu101Questions, ...edu101revisionQuestions],
  },
  {
    id: "GST111",
    name: "GST 111",
    title: "COMMUNICATION IN ENGLISH",
    group: "general",
    colleges: "all",
    questions: gst111Questions,
  },
  {
    id: "GNS113",
    name: "GNS 113",
    title: "USE OF LIBRARY AND STUDY SKILLS",
    group: "general",
    colleges: "all",
    questions: gns113Questions,
  },
  {
    id: "CSC111",
    name: "CSC 111",
    title: "Introduction to database application",
    group: "departmental",
    colleges: ["COSIT"], // scalable
    questions: csc111Questions,
  },
  {
    id: "COS101",
    name: "COS 101",
    title: "Introduction to computing science",
    group: "departmental",
    colleges: ["COSIT"], // scalable
    questions: cos101Questions,
  },
  {
    id: "MTH101",
    name: "MTH 101",
    title: "Elementary Mathematics 1",
    group: "departmental",
    colleges: ["COSIT"], // scalable
    questions: math101Questions,
  },
  {
    id: "BED112",
    name: "BED 112",
    title: "Computer Fundamental",
    group: "departmental",
    colleges: ["COVTED"], // scalable
    questions: bed112Questions,
  },
  {
    id: "SOC105",
    name: "SOC 105",
    title: "Element of scientific thought",
    group: "departmental",
    colleges: ["COVTED"], // scalable
    questions: soc105Questions,
  },
  {
    id: "CSC115",
    name: "CSC 115",
    title: "COMPUTER HARDWARE AND MAINTENANCE",
    group: "departmental",
    colleges: ["COSIT"], // scalable
    questions: csc115Questions,
  },
  {
    id: "BED114",
    name: "BED 114",
    title: "introduction to accounting",
    group: "departmental",
    colleges: ["COSIT"], // scalable
    questions: bed114Questions,
  },
  {
    id: "VOS116",
    name: "VOS 116",
    title: "Fruit Juice and Non Alcoholic Beverage",
    group: "vocational",
    colleges: "all",
    questions: vos116Questions,
  },
  {
    id: "VOS117",
    name: "VOS 117",
    title: "Fish Farming",
    group: "vocational",
    colleges: "all",
    questions: vos117Questions,
  },
];

export default courses;
