import { edu101Questions } from "./courses/edu-101questions";
import { edu101revisionQuestions } from "./courses/edu101revisionQuestions";
import { gns113Questions } from "./courses/gns-113questions";
import { gst111Questions } from "./courses/gst-111questions";
import { csc111Questions } from "./courses/csc-111questions";
import { cos101Questions } from "./courses/cos-101questions";
import { math101Questions } from "./courses/math-101questions";
import { bed112Questions } from "./courses/bed-112questions";
import { soc105Questions } from "./courses/soc-105questions";
import { csc115Questions } from "./courses/csc-115questions";
import { bed114Questions } from "./courses/bed-114questions";
import { vos116Questions } from "./courses/vos-116questions";
import { vos117Questions } from "./courses/vos-117questions";
import { gcp113Questions } from "./courses/gcp-113questions";
import { csm111Questions } from "./courses/csm-111questions";
import { phy101AndPhy107Questions } from "./courses/phy-101andphy-107questions";

const courses = [
  {
    id: "EDU101",
    name: "EDU 101",
    title: "INTRODUCTION TO TEACHING AND FOUNDATION OF EDUCATION",
    group: "general",
    colleges: ["ALL"],
    questions: [
      ...edu101Questions,
      ...edu101revisionQuestions,
    ],
  },
  {
    id: "GST111",
    name: "GST 111",
    title: "COMMUNICATION IN ENGLISH",
    group: "general",
    colleges: ["ALL"],
    questions: gst111Questions,
  },
  {
    id: "GNS113",
    name: "GNS 113",
    title: "USE OF LIBRARY AND STUDY SKILLS",
    group: "general",
    colleges: ["ALL"],
    questions: gns113Questions,
  },
  {
    id: "CSC111",
    name: "CSC 111",
    title: "INTRODUCTION TO DATABASE APPLICATION",
    group: "departmental",
    colleges: ["COSIT"],
    questions: csc111Questions,
  },
  {
    id: "COS101",
    name: "COS 101",
    title: "INTRODUCTION TO COMPUTING SCIENCE",
    group: "departmental",
    colleges: ["COSIT"],
    questions: cos101Questions,
  },
  {
    id: "MTH101",
    name: "MTH 101",
    title: "ELEMENTARY MATHEMATICS I",
    group: "departmental",
    colleges: ["COSIT"],
    questions: math101Questions,
  },
  {
    id: "BED112",
    name: "BED 112",
    title: "COMPUTER FUNDAMENTALS",
    group: "departmental",
    colleges: ["COVTED"],
    questions: bed112Questions,
  },
  {
    id: "SOC105",
    name: "SOC 105",
    title: "ELEMENTS OF SCIENTIFIC THOUGHT",
    group: "departmental",
    colleges: ["COSMAS"],
    questions: soc105Questions,
  },
  {
    id: "CSC115",
    name: "CSC 115",
    title: "COMPUTER HARDWARE AND MAINTENANCE",
    group: "departmental",
    colleges: ["COSIT"],
    questions: csc115Questions,
  },
  {
    id: "BED114",
    name: "BED 114",
    title: "INTRODUCTION TO ACCOUNTING",
    group: "departmental",
    colleges: ["COVTED"],
    questions: bed114Questions,
  },
  {
    id: "GCP113",
    name: "GCP 113",
    title: "BIOLOGICAL PSYCHOLOGY",
    group: "departmental",
    colleges: ["COSPED"],
    questions: gcp113Questions,
  },
  {
    id: "CSM11",
    name: "CSM 111",
    title: "INTRODUCTION TO STATISTICS",
    group: "departmental",
    colleges: ["COSMAS", "COSIT"],
    questions: csm111Questions,
  },
  {
    id: "PHY101/PHY107",
    name: "PHY 101/PHY 107",
    title: "GENERAL PHYSICS 1",
    group: "departmental",
    colleges: ["COSIT"],
    questions: phy101AndPhy107Questions,
  },
  {
    id: "VOS116",
    name: "VOS 116",
    title: "FRUIT JUICE AND NON-ALCOHOLIC BEVERAGE",
    group: "vocational",
    colleges: ["ALL"],
    questions: vos116Questions,
  },
  {
    id: "VOS117",
    name: "VOS 117",
    title: "FISH FARMING",
    group: "vocational",
    colleges: ["ALL"],
    questions: vos117Questions,
  },
];

export default courses;